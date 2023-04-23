import { StreamInputBuffer } from '@gradii/stream-buffer';

export function iods(data: Buffer) {
  let stream = new StreamInputBuffer(data);
  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);
  let content = [];
  let length = stream.getLength();
  while (stream.getOffset() < length) {
    content.push(stream.readUInt8());
  }

  const iodsBox = {
    version,
    flags,
    content
  };

  return iodsBox;
}
