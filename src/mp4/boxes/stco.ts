import { StreamInputBuffer } from '@gradii/stream-buffer';

export function stco(buffer) {
  const stream = new StreamInputBuffer(buffer);

  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  const entryCount = stream.readUInt32BE();
  const samples = [];

  for (let i = 0; i < entryCount; i++) {
    samples.push(stream.readUInt32BE());
  }

  const stcoBox = {
    version,
    flags,
    samples
  };

  return stcoBox;
}
