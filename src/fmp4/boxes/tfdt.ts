import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function tfdt({
  version = 0x00,
  flags = 0x000000,
  decodeTime
}) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  if (version === 1) {
    stream.writeUInt32BE((decodeTime / Math.pow(2, 32)) & 0xffffffff);
    stream.writeUInt32BE(decodeTime & 0xffffffff);
  } else {
    stream.writeUInt32BE(decodeTime);
  }

  return generateBox('tfdt', stream.getBuffer());
}
