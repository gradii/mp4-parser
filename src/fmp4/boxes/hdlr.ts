import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export type HdlrParam = {
  version?: number,
  flags?: number,
  type: string,
  name: string
}

export function hdlr({
  version = 0x00,
  flags = 0x000000,
  type,
  name
}: HdlrParam) {
  // let handler = ''
  // let name = ''
  // switch (type) {
  //   case 'video':
  //     handler = 'vide'
  //     name = 'VideoHandler'
  //     break
  //   case 'audio':
  //     handler = 'soun'
  //     name = 'SoundHandler'
  // }

  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.fill(0, 4);
  stream.writeString(type, 4, 'binary');
  stream.fill(0, 12);
  stream.writeString(name, name.length);
  stream.writeUInt8(0);

  // // prettier-ignore
  // const content = new Uint8Array([
  //   ...generateVersionAndFlags(0, 0),
  //   ...generatePredefined(4),
  //   ...str2TypedArray(handler), // **
  //   ...generateReserved(12),
  //   ...str2TypedArray(name),
  //   0x00,
  // ])
  return generateBox('hdlr', stream.getBuffer());
}
