import { StreamInputBuffer } from '@gradii/stream-buffer';

export function ctts(data: Buffer) {
  let stream = new StreamInputBuffer(data);
  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  const entryCount = stream.readUInt32BE();
  let samples = [];
  for (let i = 0, count = entryCount; i < count; i++) {
    samples.push({
      sample_count : stream.readUInt32BE(),
      sample_offset: stream.readUInt32BE()
    });
  }

  return {
    version,
    flags,
    samples
  };
}
