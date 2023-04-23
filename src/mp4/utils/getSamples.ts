import { findBox } from './findBox';
import { blowupSampleToChunk } from './getPerChunkArray';
import { getSamplesOffset } from './getSamplesOffset';

/**
 * @param mp4BoxTree
 * @param bufferStart
 * @param offsetInterVal
 */
export function getVideoSamples(mp4BoxTree, bufferStart, offsetInterVal) {
  const cttsBox = findBox(mp4BoxTree, 'videoCtts');

  // const compositionTimeOffset = [];

  // if (cttsBox) {
  //   for (let i = 0; i < cttsBox.samples.length; i++) {
  //     compositionTimeOffset.push(cttsBox.samples[i].sample_offset);
  //     if (cttsBox.samples[i].sample_count !== 1) {
  //       cttsBox.samples[i].sample_count--;
  //       i--;
  //     }
  //   }
  // }
  const compositionTimeOffset = blowupCompositionTimes(cttsBox.samples);


  return getSamples(
    mp4BoxTree,
    bufferStart,
    offsetInterVal,
    compositionTimeOffset
  );
}

export function blowupCompositionTimes(samples) {
  let decodingTime: number[] = [];
  for (let i = 0; i < samples.length; i++) {
    let entry = samples[i];
    for (let i: number = 0; i < entry.sample_count; i++) {
      decodingTime.push(entry.sample_offset);
    }
  }
  return decodingTime;
}

export function getAudioSamples(mp4BoxTree, bufferStart, offsetInterVal) {
  return getSamples(mp4BoxTree, bufferStart, offsetInterVal);
}

function getSamples(
  mp4BoxTree,
  bufferStart,
  [offsetStart, offsetEnd],
  compositionTimeOffset?
) {
  const samples = [];
  const sttsBox = findBox(
    mp4BoxTree,
    compositionTimeOffset ? 'videoStts' : 'audioStts'
  );
  const stszBox = findBox(
    mp4BoxTree,
    compositionTimeOffset ? 'videoStsz' : 'audioStsz'
  );
  const stcoBox = findBox(
    mp4BoxTree,
    compositionTimeOffset ? 'videoStco' : 'audioStco'
  );
  const stscBox = findBox(mp4BoxTree, compositionTimeOffset ? 'videoStsc' : 'audioStsc');

  const stscBoxSamplesPerChunkArray = blowupSampleToChunk(stscBox.samples, offsetEnd);

  const samplesOffset = getSamplesOffset(stszBox, stscBoxSamplesPerChunkArray);

  const sttsFormatBox = [];
  for (let i = 0; i < sttsBox.samples.length; i++) {
    const {sample_count, sample_delta} = sttsBox.samples[i];
    sttsFormatBox.push({
      sampleCount:
        sample_count +
        (sttsFormatBox[i - 1] ? sttsFormatBox[i - 1].sampleCount : 0),
      sampleDelta: sample_delta,
    });
  }

  // 算法不太好，可以和下面 for 循环结合，用双指针来做
  // FIXME
  const chunkOffsetArray = [];
  for (let i = 0; i < stscBoxSamplesPerChunkArray.length; i++) {
    for (let j = 0; j < stscBoxSamplesPerChunkArray[i]; j++) {
      const sampleChunkOffset = stcoBox.samples[i];
      chunkOffsetArray.push(
        sampleChunkOffset
          ? sampleChunkOffset
          : stcoBox.samples[stcoBox.samples.length - 1]
      );
    }
  }

  for (let i = offsetStart; i < offsetEnd; i++) {
    const size = stszBox.sampleSizes[i];

    const end = chunkOffsetArray[i] - bufferStart + samplesOffset[i];
    const start = end - size;

    const duration = sttsFormatBox.find((sample, idx) => {
      if (sttsFormatBox[idx - 1]) {
        return (
          i + 1 <= sample.sampleCount &&
          i + 1 > sttsFormatBox[idx - 1].sampleCount
        );
      } else {
        return i + 1 <= sample.sampleCount;
      }
    }).sampleDelta;

    samples.push({
      // 只有 video 有此字段，没有 B 帧的视频，compositionTimeOffset 为 0
      ...(compositionTimeOffset && {
        compositionTimeOffset: compositionTimeOffset.length ? compositionTimeOffset[i] : 0,
      }),
      duration,
      size,
      start,
      end,
      bufferStart,
    });
  }
  return samples;
}
