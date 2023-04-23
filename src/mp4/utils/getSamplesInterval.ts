import { findBox } from './findBox';
import { getDuration } from './getDuration';

export function getVideoSamplesInterval(mp4BoxTree, time = 0) {
  const stssBox = findBox(mp4BoxTree, 'videoStss');
  const sttsBox = findBox(mp4BoxTree, 'videoStts');
  const stszBox = findBox(mp4BoxTree, 'videoStsz');
  const duration = getDuration(sttsBox, stszBox.sampleSizes.length);

  const intervalArray = getIntervalArray(stssBox, stszBox);
  const timeInterval = intervalArray.map(interval =>
    getDuration(sttsBox, interval)
  );

  const interval = {
    offsetInterVal: [],
    timeInterVal  : [],
  };
  for (let i = 0; i < timeInterval.length; i++) {
    const start = timeInterval[i];
    const end = timeInterval[i + 1] ? timeInterval[i + 1] : duration;

    if (start <= time && time < end) {
      const offsetStart = intervalArray[i];
      const offsetEnd =
              intervalArray[i + 1] !== undefined
                ? intervalArray[i + 1]
                : stszBox.sampleSizes.length;
      interval.offsetInterVal.push(offsetStart, offsetEnd);
      interval.timeInterVal.push(start, end);
      break;
    }
  }

  return interval;
}

export function getAudioSamplesInterval(mp4BoxTree, videoInterval) {
  const {
          timeInterVal: [startTime, endTime],
          offsetInterVal,
        } = videoInterval;
  const sttsBox = findBox(mp4BoxTree, 'audioStts');
  const {timescale: audioTimescale} = findBox(mp4BoxTree, 'audioMdhd');
  const {timescale: videoTimescale} = findBox(mp4BoxTree, 'videoMdhd');
  const videoStszBox = findBox(mp4BoxTree, 'videoStsz');
  const audioStszBox = findBox(mp4BoxTree, 'audioStsz');
  const audioElstBox = findBox(mp4BoxTree, 'audioElst');

  const audioStartTime = (startTime / videoTimescale) * audioTimescale;
  const audioEndTime = (endTime / videoTimescale) * audioTimescale;

  let start = 0;
  let end = 0;

  const {mediaTime, segmentDuration} = audioElstBox.entries[0];
  let startDuration = mediaTime !== -1 ? mediaTime : segmentDuration;
  let endDuration = 0;
  for (let i = 0; i < sttsBox.samples.length; i++) {
    const {sample_count, sample_delta} = sttsBox.samples[i];
    for (let j = 0; j < sample_count; j++) {
      if (startDuration <= audioStartTime && audioStartTime !== 0) {
        startDuration += sample_delta;
        start++;
      }

      if (endDuration <= audioEndTime) {
        endDuration += sample_delta;
        end++;
      }
    }
  }

  // 如果是 video 的最后一个片段，也就是 audio 的最有一个片段
  // 使用 stsz 的长度来判断
  let audioEnd;
  if (offsetInterVal[1] === videoStszBox.sampleSizes.length) {
    audioEnd = audioStszBox.sampleSizes.length;
  }
  const interval = {
    offsetInterVal: [start, audioEnd ? audioEnd : end],
    timeInterVal  : [startDuration, endDuration],
  };

  return interval;
}

export function getNextVideoSamplesInterval(mp4BoxTree, sample) {
  const stssBox = findBox(mp4BoxTree, 'videoStss');
  const sttsBox = findBox(mp4BoxTree, 'videoStts');
  const stszBox = findBox(mp4BoxTree, 'videoStsz');
  const sampleCount = stszBox.sampleSizes.length;
  const duration = getDuration(sttsBox, sampleCount);

  const intervalArray = getIntervalArray(stssBox, stszBox);

  const timeInterval = intervalArray.map(interval =>
    getDuration(sttsBox, interval)
  );
  let result;
  if (sample + 1 > intervalArray[intervalArray.length - 1]) {
    result = {
      offsetInterVal: [intervalArray[intervalArray.length - 1], sampleCount],
      timeInterVal  : [timeInterval[intervalArray.length - 1], duration],
    };
  }
  for (let i = 0; i < intervalArray.length; i++) {
    if (intervalArray[i] < sample + 1 && intervalArray[i + 1] >= sample + 1) {
      result = {
        offsetInterVal: [intervalArray[i], intervalArray[i + 1]],
        timeInterVal  : [timeInterval[i], timeInterval[i + 1]],
      };
      break;
    }
  }
  return result;
}

export function getIntervalArray(stssBox, stszBox?) {
  let intervalArray = [];
  if (stssBox) {
    intervalArray = stssBox.sampleNumbers.map(_sampleNumber => _sampleNumber - 1);
  } else {
    // make a fake GOP when video dont have B/P frame
    for (let i = 0; i <= Math.floor(stszBox.sampleSizes.length / 5); i++) {
      intervalArray.push(i * 5);
    }
  }

  return intervalArray;
}
