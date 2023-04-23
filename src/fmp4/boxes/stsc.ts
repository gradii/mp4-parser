import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function stsc({
  version = 0x00,
  flags = 0x000000,
  samples = []
}: {
  version?: number,
  flags?: number,
  samples: {
    first_chunk,
    samples_per_chunk,
    sample_desc_index
  }[]
}) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt32BE(samples.length);
  samples.forEach(it => {
    stream.writeUInt32BE(it.first_chunk);
    stream.writeUInt32BE(it.samples_per_chunk);
    stream.writeUInt32BE(it.sample_desc_index);
  });

  return generateBox('stsc', stream.getBuffer());
}
