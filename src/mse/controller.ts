import { MP4Parse } from '../mp4/mp4Parse';
import { MP4Probe } from '../mp4/mp4Probe';
import { abortPolyfill } from './polyfill';
import { ftyp } from '../fmp4/boxes/ftyp';
import { FMP4Generator as FMP4 } from '../fmp4/fmp4Generator';
import { HttpFragmentFetch } from './http-fragment-fetch';
import { FragmentFetch } from '../../../framework/src/services/fragment-fetch';
import { isSafari } from '../util/ua';

const MAGIC_NUMBER = 20000;

const VIDEO_MIME_TYPES = 'video/mp4; codecs="avc1.42E01E"';
const AUDIO_MIME_TYPES = 'audio/mp4; codecs="mp4a.40.2"';



export class MSE {
  video;
  src;
  qualityChangeFlag;
  videoQueue;
  audioQueue;

  audioSourceBuffer;
  videoSourceBuffer;

  mediaSource: MediaSource;
  needUpdateTime;

  mp4Probe: MP4Probe;
  private mp4BoxTreeObject: any;

  constructor(private fragmentFetch: FragmentFetch, video, src) {
    this.video = video;
    this.src = src;
    this.qualityChangeFlag = false;
    this.videoQueue = [];
    this.audioQueue = [];

    this.installSrc();
  }

  installSrc() {
    this.mediaSource = new MediaSource();
    this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen.bind(this));
    this.video.src = URL.createObjectURL(this.mediaSource);
  }

  handleSourceOpen() {
    this.videoSourceBuffer = this.mediaSource.addSourceBuffer(VIDEO_MIME_TYPES);
    this.audioSourceBuffer = this.mediaSource.addSourceBuffer(AUDIO_MIME_TYPES);

    this.videoSourceBuffer.addEventListener('updateend', () => {
      const buffer = this.videoQueue.shift();

      if (buffer && this.mediaSource.readyState === 'open') {
        this.handleAppendBuffer(buffer, 'video');
      }
      if (this.needUpdateTime) {
        this.needUpdateTime = false;
        this.handleTimeUpdate();
      }
    });

    this.audioSourceBuffer.addEventListener('updateend', () => {
      const buffer = this.audioQueue.shift();

      if (buffer && this.mediaSource.readyState === 'open') {
        this.handleAppendBuffer(buffer, 'audio');
      }
    });
  }

  handleAppendBuffer(buffer, type) {
    if (this.mediaSource.readyState === 'open') {
      try {
        if (type === 'video') {
          this.videoSourceBuffer.appendBuffer(buffer);
        } else if (type === 'audio') {
          this.audioSourceBuffer.appendBuffer(buffer);
        }
      } catch (error) {
        // see https://developers.google.com/web/updates/2017/10/quotaexceedederror
        if (error.code === 22 || error.name === 'QuotaExceededError') {
          this.handleQuotaExceededError(buffer, type);
        } else {
          throw error;
        }
      }
    } else {
      this[`${type}Queue`].push(buffer);
    }
  }

  init() {
    // 获取 mdat 外的数据
    return this.loadData()
      .then(res => {
        return new MP4Parse(Buffer.from(res)).mp4BoxTreeObject;
      })
      .then(mp4BoxTreeObject => {
        // 有可能 moov 在最后一个 box，导致我们第一次请求 0~MAGIC_NUMBER 没有请求到 moov。
        const {moov, ftyp} = mp4BoxTreeObject;
        if (!moov) {
          let moovStart = 0;
          for (const box in mp4BoxTreeObject) {
            moovStart += mp4BoxTreeObject[box].size;
          }
          return this.loadData(moovStart, '').then(res => {
            const {moov} = new MP4Parse(Buffer.from(res)).mp4BoxTreeObject;
            if (moov) {
              mp4BoxTreeObject.moov = moov;
              return mp4BoxTreeObject;
            }
          });
        } else {
          // 有可能视频较大，第一次请求没有请求到完整的 moov box
          const ftypAndMoovSize = moov.size + ftyp.size;
          if (ftypAndMoovSize > MAGIC_NUMBER) {
            return this.loadData(ftyp.size, ftypAndMoovSize).then(res => {
              const {moov} = new MP4Parse(Buffer.from(res)).mp4BoxTreeObject;
              if (moov) {
                mp4BoxTreeObject.moov = moov;
                return mp4BoxTreeObject;
              }
            });
          }
        }

        return mp4BoxTreeObject;
      })
      .then(mp4BoxTreeObject => {
        this.mp4Probe = new MP4Probe(mp4BoxTreeObject);
        this.mp4BoxTreeObject = mp4BoxTreeObject;

        const videoRawData = Buffer.concat([
          FMP4.ftyp(),
          FMP4.moov(this.mp4Probe.mp4Data, 'video')
        ]);

        const audioRawData = Buffer.concat([
          ftyp(),
          FMP4.moov(this.mp4Probe.mp4Data, 'audio')
        ]);

        // 如果是切换清晰度，mediaSource 的 readyState 已经 open 了，可以直接 append 数据。
        // mediaSource is already open when we switch video quality.
        if (this.qualityChangeFlag) {
          this.handleAppendBuffer(videoRawData, 'video');
          this.handleAppendBuffer(audioRawData, 'audio');
        } else {
          this.mediaSource.addEventListener('sourceopen', () => {
            this.handleAppendBuffer(videoRawData, 'video');
            this.handleAppendBuffer(audioRawData, 'audio');
          });
        }
      });
  }

  hasBufferedCache(isSeek) {
    const {
            timeRange: [start, end]
          } = this.mp4Probe;

    // handle seek case and normal case
    const time = isSeek ? this.video.currentTime : Math.floor((start + end) / 2);
    const buffered = this.video.buffered;

    if (buffered && buffered.length > 0) {
      for (let i = 0; i < buffered.length; i++) {
        if (time >= buffered.start(i) && time <= buffered.end(i)) {
          return true;
        }
      }
    }

    return false;
  }

  seek(time?) {
    HttpFragmentFetch.clear();

    const [start, end] = this.mp4Probe.getFragmentPosition(time);
    // 对于已经请求的数据不再重复请求
    // No need to repeat request video data
    if (this.hasBufferedCache(time) && !this.qualityChangeFlag) {
      return;
    }

    this.handleReplayCase();

    this.loadData(start, end).then(mdatBuffer => {
      if (!mdatBuffer) {
        return;
      }
      const {videoTrackInfo, audioTrackInfo} = this.mp4Probe.getTrackInfo(
        mdatBuffer
      );
      const {videoInterval, audioInterval} = this.mp4Probe;
      const videoBaseMediaDecodeTime = videoInterval.timeInterVal[0];
      const audioBaseMediaDecodeTime = audioInterval.timeInterVal[0];
      const videoRawData = Buffer.concat([
        FMP4.moof(videoTrackInfo, videoBaseMediaDecodeTime),
        FMP4.mdat(videoTrackInfo)
      ]);

      // maybe the last GOP dont have audio track
      // 最后一个 GOP 序列可能没有音频轨
      if (audioTrackInfo.samples.length !== 0) {
        const audioRawData = Buffer.concat([
          FMP4.moof(audioTrackInfo, audioBaseMediaDecodeTime),
          FMP4.mdat(audioTrackInfo)
        ]);
        this.handleAppendBuffer(audioRawData, 'audio');
      }

      this.handleAppendBuffer(videoRawData, 'video');

      if (time) {
        this.needUpdateTime = true;
      }

      this.qualityChangeFlag = false;
    });
  }

  changeQuality(newSrc) {
    this.src = newSrc;
    this.qualityChangeFlag = true;

    this.removeSourceBuffer(this.videoSourceBuffer);
    this.removeSourceBuffer(this.audioSourceBuffer);

    this.init().then(() => {
      this.video.currentTime = this.video.currentTime;
    });
  }

  removeSourceBuffer(sourceBuffer, start = 0, end = -1) {
    const length = sourceBuffer.buffered.length;
    if (length > 0) {
      if (end < 0) {
        end += end % length;
      }
      this.removeBuffer(
        sourceBuffer,
        sourceBuffer.buffered.start(start),
        sourceBuffer.buffered.end(end)
      );
    }

  }


  removeBuffer(sourceBuffer, start, end) {
    let track = sourceBuffer;
    if (track.updating) {

      if (isSafari) {
        // Safari 9/10/11/12 does not correctly implement abort() on SourceBuffer.
        // Calling abort() before appending a segment causes that segment to be
        // incomplete in buffer.
        // Bug filed: https://bugs.webkit.org/show_bug.cgi?id=165342
        abortPolyfill();
      }
      track.abort();
    }
    track.remove(start, end);
  }

  loadData(start = 0, end: number | '' = MAGIC_NUMBER): Promise<any> {
    return new Promise(resolve => {
      new HttpFragmentFetch(this.src, start, end, resolve);
    }).catch(() => {
      // catch cancel error
    });
  }

  handleTimeUpdate() {
    if (!this.mp4Probe) {
      return;
    }
    const {
            videoInterval: {offsetInterVal = []} = [],
            mp4Data      : {videoSamplesLength},
            timeRange                            = []
          } = this.mp4Probe;
    if (this.mediaSource.readyState !== 'closed') {
      if (
        offsetInterVal[1] === videoSamplesLength &&
        this.video.currentTime > timeRange[0]
      ) {
        this.destroy();
      } else if (this.shouldFetchNextSegment()) {
        this.seek();
      }
    }
  }

  handleReplayCase() {
    if (this.mediaSource.readyState === 'ended') {
      // If MediaSource.readyState value is ended,
      // setting SourceBuffer.timestampOffset will cause this value to transition to open.
      this.videoSourceBuffer.timestampOffset = 0;
    }
  }

  shouldFetchNextSegment() {
    this.handleReplayCase();
    if (this.mp4Probe.isDraining(this.video.currentTime)) {
      return true;
    }
    return false;
  }

  destroy() {
    this.mediaSource.removeEventListener('sourceopen', this.handleSourceOpen.bind(this));
    URL.revokeObjectURL(this.video.src);
    if (
      this.mediaSource.readyState === 'open' &&
      !this.videoSourceBuffer.updating &&
      !this.audioSourceBuffer.updating
    ) {
      this.mediaSource.endOfStream();
    }
  }

  handleQuotaExceededError(buffer, type) {
    this.removeSourceBuffer(this.audioSourceBuffer, 10, this.video.currentTime - 10);
    this.removeSourceBuffer(this.videoSourceBuffer, 10, this.video.currentTime - 10);

    // re-append(maybe should lower the playback resolution)
    this.handleAppendBuffer(buffer, type);
  }
}
