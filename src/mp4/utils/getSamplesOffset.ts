export function getSamplesOffset(stszBox, stscBoxSamplesPerChunkArray) {
  const samplesOffset = [];
  for (let i = 0, j = 0; i < stscBoxSamplesPerChunkArray.length; i++) {
    if (i + j >= stszBox.sampleSizes.length) {
      break;
    }

    samplesOffset.push(stszBox.sampleSizes[i + j]);
    if (stscBoxSamplesPerChunkArray[i] !== 1) {
      for (let flag = 1; flag < stscBoxSamplesPerChunkArray[i]; flag++) {
        const offset =
                stszBox.sampleSizes[i + flag + j] +
                samplesOffset[i + flag - 1 + j];
        samplesOffset.push(offset);
      }
      j = j + stscBoxSamplesPerChunkArray[i] - 1;
    }
  }

  return samplesOffset;
}
