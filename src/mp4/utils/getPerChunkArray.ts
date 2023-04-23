/**
 * @deprecated
 * @param stscBox
 * @param end
 */
export function getPerChunkArray(stscBox, end) {
  const stscBoxSamplesPerChunkArray = [];
  const stscSamplesLength = stscBox.samples.length;

  let samples = [];

  // stsc box
  // firstChunk         1  3  6  7
  // samplesPerChunk    1  2  1  2
  // ↓
  // [1,1,2,2,2,1,2,2]
  for (let i = 0; i < end; i++) {
    if (
      i !== 0 &&
      i < stscSamplesLength &&
      stscBox.samples[i].firstChunk - 1 !== stscBox.samples[i - 1].firstChunk
    ) {
      i--;
      stscBox.samples[i].firstChunk++;
    }

    // 处理最后一位不是 end 时的情况
    if (i >= stscSamplesLength) {
      if (stscBox.samples[stscSamplesLength - 1] !== 1) {
        i = i + stscBox.samples[stscSamplesLength - 1].samplesPerChunk - 1;
      }
      stscBoxSamplesPerChunkArray.push(
        stscBox.samples[stscSamplesLength - 1].samplesPerChunk
      );
    } else {
      stscBoxSamplesPerChunkArray.push(stscBox.samples[i].samplesPerChunk);
    }
  }

  return stscBoxSamplesPerChunkArray;
}

/**
 * org.mp4parser.boxes.iso14496.part12
 * SampleToChunkBox
 * @param samples
 * @param chunkCount
 */
export function blowupSampleToChunk(samples: {
  first_chunk,
  samples_per_chunk,
  sample_desc_index?
}[], chunkCount: number) {
  if (chunkCount > 0) {

    let numberOfSamples = new Array(chunkCount);
    let currentIndex = samples.length - 1;
    while (samples[currentIndex].first_chunk > chunkCount && currentIndex > 1) {
      --currentIndex;
    }
    let currentEntry = samples[currentIndex];

    for (let j = chunkCount; j > 1; j--) {
      numberOfSamples[j - 1] = currentEntry.samples_per_chunk;
      if (j === currentEntry.first_chunk) {
        currentEntry = samples[--currentIndex];
      }
    }

    numberOfSamples[0] = currentEntry.samples_per_chunk;
    return numberOfSamples;
  } else {
    return [];
  }
}
