import { StreamInputBuffer } from '@gradii/stream-buffer';

export function stts(data: Buffer) {
  const stream = new StreamInputBuffer(data);

  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  const entryCount = stream.readUInt32BE();
  const samples = [];

  for (let i = 0; i < entryCount; i++) {
    const sample_count = stream.readUInt32BE();
    const sample_delta = stream.readUInt32BE();
    samples.push({
      sample_count,
      sample_delta
    });
  }

  const sttsBox = {
    version,
    flags,
    samples
  };

  return sttsBox;
}
