import { ftyp } from './boxes/ftyp';
import { moov } from './boxes/moov';
import { moof } from './boxes/moof';
import { mdat } from './boxes/mdat';
import { mfhd } from './boxes/mfhd';
import { traf } from './boxes/traf';
import { tfhd } from './boxes/tfhd';
import { tfdt } from './boxes/tfdt';
import { sdtp } from './boxes/sdtp';
import { trun } from './boxes/trun';
import { StreamOutputBuffer } from '@gradii/stream-buffer';
import { mvhd } from './boxes/mvhd';
import { trak } from './boxes/trak';
import { tkhd } from './boxes/tkhd';
import { mdia } from './boxes/mdia';
import { mdhd } from './boxes/mdhd';
import { hdlr } from './boxes/hdlr';
import { minf } from './boxes/minf';
import { smhd } from './boxes/smhd';
import { dinf } from './boxes/dinf';
import { dref } from './boxes/dref';
import { url } from './boxes/url';
import { stbl } from './boxes/stbl';
import { stsd } from './boxes/stsd';
import { mp4a } from './boxes/mp4a';
import { stts } from './boxes/stts';
import { stsc } from './boxes/stsc';
import { stsz } from './boxes/stsz';
import { stco } from './boxes/stco';
import { mvex } from './boxes/mvex';
import { esds } from './boxes/esds';
import { vmhd } from './boxes/vmhd';
import { avc1 } from './boxes/avc1';
import { avcC } from './boxes/avcC';


export class FMP4Generator {
  static sequenceNumber = 1;

  static ftyp() {
    return ftyp();
  }

  static moov(data, type: 'video' | 'audio') {
    let handler = '';
    let name = '';
    switch (type) {
      case 'video':
        handler = 'vide';
        name = 'VideoHandler';
        break;
      case 'audio':
        handler = 'soun';
        name = 'SoundHandler';
    }


    return moov(
      mvhd({
        version    : 1,
        flags      : 0,
        timescale  : data.timescale,
        duration   : data.duration,
        // nextTrackId: data.trackId,
        nextTrackId: 0xffffffff,
      }),
      trak([
        tkhd({
          version          : 1,
          flags            : 7,
          creation_time    : 0,
          modification_time: 0,
          trackId          : type == 'video' ? 1 : 2,
          layer            : 0,
          alternate_group  : 0,
          volume           : 1, //todo check it
          duration         : data.duration,
          width            : data.width,
          height           : data.height
        }),
        mdia(
          mdhd({
            version  : 1,
            flags    : 0,
            timescale: type === 'video' ? data.videoTimescale : data.audioTimescale,
            duration : type === 'video' ? data.videoDuration : data.audioDuration,
          }),
          hdlr({
            type: handler,
            name: name
          }),
          minf([
            type === 'audio' ? smhd({}) : vmhd(),
            dinf(dref({
              entries: [url()]
            })),
            stbl([
              stsd({
                entries: [
                  type === 'video' ?
                    avc1({
                      dataReferenceIndex: 1,
                      width             : data.width,
                      height            : data.height,
                      horizresolution   : 0x48,
                      vertresolution    : 0x48,
                      frameCount        : 1,
                      depth             : 0x0018,
                    }, [
                      avcC({
                        configurationVersion : 1,
                        AVCProfileIndication : data.AVCProfileIndication,
                        profileCompatibility : data.profileCompatibility,
                        AVCLevelIndication   : data.AVCLevelIndication,
                        lengthSizeMinusOne   : 0xfc | 3,
                        sequenceParameterSets: data.SPS,
                        pictureParameterSets : data.PPS
                      })
                    ]) :
                    mp4a({
                        channelCount: data.channelCount,
                        sampleRate  : data.sampleRate
                      },
                      esds({
                        decoderSpecificInfo  : 0x03,
                        audioConfig          : data.audioConfig,
                        es_id                : 0x0001,
                        stream_priority      : 0x00,
                        decoderConfigDescrTag: 0x04,
                        codec                : 0x40,
                        stream_type          : 0x15,
                        maxBitrate           : 0,
                        avgBitrate           : 0,
                        config               : data.audioConfig,
                        GASpecificConfig     : 0x060102
                      }))
                ]
              }),
              stts({samples: []}),
              stsc({samples: []}),
              stsz({sampleSize: 0, sampleSizes: []}),
              stco({samples: []})
            ])
          ])
        )
      ]),
      mvex({
        duration: data.duration
      })
    );
  }

  static moof(trackInfo, baseMediaDecodeTime?) {
    return moof(
      mfhd({
        sequenceNumber: FMP4Generator.sequenceNumber++,
      }),
      traf(
        tfhd({trackId: trackInfo.trackId}),
        tfdt({version: 1, flags: 0, decodeTime: baseMediaDecodeTime || 0}),
        sdtp({
          samples: trackInfo.samples.map(it => {
            return {
              is_leading           : 0,
              sample_depends_on    : 1,
              sample_is_depended_on: 0,
              sample_has_redundancy: 0
            };
          })
        }),
        FMP4Generator.trun(trackInfo)
      )
    );
  }

  static trun(trackInfo) {
    const {samples, trackId} = trackInfo;
    const ceil = trackId === 1 ? 16 : 12;
    const length = samples.length;

    const offset = 108 + ceil * length + samples.length;

    return trun({
      version   : 0,
      flags     : (trackInfo.trackId === 1 ? 0x0f : 0x07) * 256 + 1,
      samples   : trackInfo.samples,
      dataOffset: offset,
      trackId   : trackInfo.trackId
    });
  }

  static mdat(trackInfo) {
    const stream = new StreamOutputBuffer();

    const samples = trackInfo.samples.forEach(
      sample => {
        stream.write(sample.buffer);
      }
    );

    return mdat(stream.getBuffer());
  }
}
