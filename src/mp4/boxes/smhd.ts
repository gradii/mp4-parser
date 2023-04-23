import { StreamInputBuffer } from '@gradii/stream-buffer';

export function smhd(data: Buffer) {
  const stream = new StreamInputBuffer(data);

  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);
  const balance = stream.readUInt16BE();
  stream.skip(2);

  const smhdBox = {
    version,
    flags,
    balance
  };

  return smhdBox;
}
