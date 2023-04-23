import { StreamInputBuffer } from '@gradii/stream-buffer';

export function stsc(data: Buffer) {
  const stream = new StreamInputBuffer(data);

  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  const entryCount = stream.readUInt32BE();
  const samples = [];

  for (let i = 0; i < entryCount; i++) {
    samples.push({
      first_chunk      : stream.readUInt32BE(),
      samples_per_chunk: stream.readUInt32BE(),
      sample_desc_index: stream.readUInt32BE(),
    });
  }

  const mdhdBox = {
    version,
    flags,
    samples,
  };

  return mdhdBox;
}
