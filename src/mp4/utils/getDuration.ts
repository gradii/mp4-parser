export function getDuration(sttsBox, totalCount) {
  let count = 0;
  let duration = 0;
  for (let i = 0; i < sttsBox.samples.length; i++) {
    const {sample_count, sample_delta} = sttsBox.samples[i];
    for (let j = 0; j < sample_count; j++) {
      if (count < totalCount && totalCount !== 0) {
        duration += sample_delta;
        count++;
      } else {
        return duration;
      }
    }
  }
  return duration;
}
