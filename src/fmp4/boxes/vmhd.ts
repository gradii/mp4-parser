import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export type VmhdParam = {
  version?: number,
  flags?: number,
  graphicsmode?: number,
  opcolor?: number[]
}

export function vmhd({
  version = 0x00,
  flags = 0x000001,
  graphicsmode = 0,
  opcolor = [0, 0, 0]
}: VmhdParam = {}) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt16BE(graphicsmode);
  opcolor.forEach(it => {
    stream.writeUInt16BE(it);
  });

  return generateBox('vmhd', stream.getBuffer());
}
