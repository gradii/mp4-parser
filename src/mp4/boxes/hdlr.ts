import { StreamInputBuffer } from '@gradii/stream-buffer';

export function hdlr(data: Buffer) {
  const stream = new StreamInputBuffer(data);

  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  // preDefined
  stream.skip(4);
  const handlerType = stream.readString(4, 'binary');

  const handlerType2 = stream.readString(4, 'binary');

  // reserved
  stream.skip(4);
  stream.skip(4);
  const name = [];
  let c;
  while ((c = stream.readUInt8()) !== 0x00) {
    name.push(String.fromCharCode(c));
  }

  const hdlrBox = {
    version,
    flags,
    handlerType,
    handlerType2: handlerType2 || 0,
    name        : name.join('')
  };

  return hdlrBox;
}
