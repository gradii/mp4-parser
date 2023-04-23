import { StreamInputBuffer } from '@gradii/stream-buffer';

export function meta(data: Buffer) {
  const stream = new StreamInputBuffer(data);

  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  const metaBox = {
    version,
    flags,
  };

  return metaBox;
}
