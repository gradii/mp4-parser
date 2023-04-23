import { StreamInputBuffer } from '@gradii/stream-buffer';

export function url(buffer: Buffer) {
  const stream = new StreamInputBuffer(buffer);

  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  return {
    version,
    flags,
  };
}
