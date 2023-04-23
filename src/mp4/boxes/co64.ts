import { StreamInputBuffer } from '@gradii/stream-buffer';

export function co64(data: Buffer) {
  let stream = new StreamInputBuffer(data);
  const version = stream.readUInt8();
  const flag = stream.readUIntBE(3);
  const count = stream.readUInt32BE();
  let entries = [];
  for (let i = 0; i < count; i++) {
    entries.push((stream.readUInt32BE() * Math.pow(2, 32)) | stream.readUInt32BE());
  }

  return {
    version,
    flag,
    count,
    entries
  };
}
