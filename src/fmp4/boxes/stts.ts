import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export type SttsParam = {
  version?: number,
  flags?: number,
  samples: {
    sample_count,
    sample_delta
  }[]
}

export function stts({
  version = 0x00,
  flags = 0x000000,
  samples = []
}: SttsParam) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt32BE(samples.length);
  samples.forEach(it => {
    stream.writeUInt32BE(it.sample_count);
    stream.writeUInt32BE(it.sample_delta);
  });

  return generateBox('stts', stream.getBuffer());
}

