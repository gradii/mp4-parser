import { StreamInputBuffer } from '@gradii/stream-buffer';

export function stss(data: Buffer) {
  const stream = new StreamInputBuffer(data);

  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  const entryCount = stream.readUInt32BE();
  const sampleNumbers = [];

  for (let i = 0; i < entryCount; i++) {
    sampleNumbers.push(stream.readUInt32BE());
  }

  const stssBox = {
    version,
    flags,
    sampleNumbers
  };

  return stssBox;
}
