import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export type SmhdParam = {
  version?: number,
  flags?: number,
}

export function smhd({
  version = 0x00,
  flags = 0x000000
}: SmhdParam = {}) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt16BE(0x0000); //balance
  stream.writeUInt16BE(0x0000); //reserved

  return generateBox('smhd', stream.getBuffer());
}
