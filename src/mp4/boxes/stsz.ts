import { StreamInputBuffer } from '@gradii/stream-buffer';

export function stsz(data: Buffer) {
  const stream = new StreamInputBuffer(data);

  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  const sampleSize = stream.readUInt32BE();
  const sampleCount = stream.readUInt32BE();

  const sampleSizes = [];
  if (sampleSize === 0) {
    for (let i = 0; i < sampleCount; i++) {
      sampleSizes.push(stream.readUInt32BE());
    }
  }


  return {
    version,
    flags,
    sampleSize,
    sampleSizes
  };
}
