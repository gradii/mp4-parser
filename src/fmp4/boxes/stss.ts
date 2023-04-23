import { StreamOutputBuffer } from '@gradii/stream-buffer';
import { generateBox } from '../utils/generateBox';

export function stss({
  version = 0x00,
  flags = 0x000000,
  sampleNumbers = []
}: {
  version?: number,
  flags?: number,
  sampleNumbers: number[]
}) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt32BE(sampleNumbers.length);
  sampleNumbers.forEach(it => {
    stream.writeUInt32BE(it);
  });

  return generateBox('stss', stream.getBuffer());
}
