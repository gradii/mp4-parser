import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export type StszParam = {
  version?: number,
  flags?: number,
  sampleSize: number,
  sampleSizes?: number[]
}

export function stsz({
  version = 0x00,
  flags = 0x000000,
  sampleSize,
  sampleSizes = []
}: StszParam) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt32BE(sampleSize);
  if (sampleSize === 0) {
    stream.writeUInt32BE(sampleSizes.length);
    sampleSizes.forEach(it => {
      stream.writeInt32BE(it);
    });
  } else {
    stream.writeInt32BE(sampleSizes.length);
  }

  return generateBox('stsz', stream.getBuffer());
}
