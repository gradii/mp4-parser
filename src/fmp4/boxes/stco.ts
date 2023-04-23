import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export type StcoParam = {
  version?: number
  flags?: number
  samples?: number[]
}

export function stco({
  version = 0x00,
  flags = 0x000000,
  samples = []
}: StcoParam) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt32BE(samples.length);
  samples.forEach(it => {
    stream.writeUInt32BE(it);
  });

  return generateBox('stco', stream.getBuffer());
}
