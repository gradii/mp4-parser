import { findBox } from './findBox';
import { blowupSampleToChunk } from './getPerChunkArray';

export function getBufferStart(
  mp4BoxTree,
  videoOffsetStart = 0,
  audioOffsetStart = 0
) {
  return Math.min(
    getChunkSize(mp4BoxTree, videoOffsetStart, 'video'),
    getChunkSize(mp4BoxTree, audioOffsetStart, 'audio')
  );
}

function getChunkSize(mp4BoxTree, offsetStart, type) {
  const stscBox = findBox(mp4BoxTree, type === 'video' ? 'videoStsc' : 'audioStsc');
  let newOffsetStart = 0;
  const stscBoxSamplesPerChunkArray = blowupSampleToChunk(stscBox.samples, offsetStart);
  let chunkIndex = 0;
  for (
    let i = 0;
    offsetStart > 0 && i <= stscBoxSamplesPerChunkArray.length;
    i++
  ) {
    newOffsetStart += stscBoxSamplesPerChunkArray[i];
    if (newOffsetStart === offsetStart) {
      chunkIndex = i + 1;
      break;
    } else if (newOffsetStart > offsetStart) {
      newOffsetStart -= stscBoxSamplesPerChunkArray[i];
      chunkIndex = i;
      break;
    }
  }
  const sampleInterval = [newOffsetStart, offsetStart];

  const stszBox = findBox(
    mp4BoxTree,
    type === 'video' ? 'videoStsz' : 'audioStsz'
  );
  let sampleSize = 0;
  // 考虑到 stsc 不为 1 的情况
  const samples = stszBox.sampleSizes.slice(sampleInterval[0], sampleInterval[1]);
  for (let i = 0; i < samples.length; i++) {
    sampleSize += samples[i];
  }

  const stcoBox = findBox(
    mp4BoxTree,
    type === 'video' ? 'videoStco' : 'audioStco'
  );

  // 如果最后一个 GOP 没有音频轨，BufferStart 需要按照视频轨来计算。
  // If the last GOP dont have audio track, we should ignore the audio chunk size.
  if (chunkIndex >= stcoBox.samples.length) {
    return Number.MAX_SAFE_INTEGER;
  }

  return stcoBox.samples[chunkIndex] + sampleSize;
}
