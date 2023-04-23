import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function mp4a({
  dataReferenceIndex = 0x0001,
  channelCount = 0x00,
  sampleSize = 0x0010,
  sampleRate
}, esdsBuffer: Buffer) {

  const stream = new StreamOutputBuffer();
  stream.fill(0, 6);
  stream.writeUInt16BE(dataReferenceIndex);
  stream.fill(0, 8);
  stream.writeUInt16BE(channelCount);
  stream.writeUInt16BE(sampleSize);
  stream.fill(0, 4);
  stream.writeUInt32BE((sampleRate << 16) >>> 0);
  stream.write(esdsBuffer);

  return generateBox('mp4a', stream.getBuffer());
}
