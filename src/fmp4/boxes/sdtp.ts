import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export type SdtpParam = {
  version?: number
  flags?: number
  samples: {
    is_leading,
    sample_depends_on,
    sample_is_depended_on,
    sample_has_redundancy
  }[]
}

export function sdtp({
  version = 0x00,
  flags = 0x000000,
  samples
}: SdtpParam) {
  // const content = concatTypedArray(
  //   [0x00, 0x00, 0x00, 0x00],
  //   ...samples.map(() => new Uint8Array([0x10])) // FIXME: need sample flags
  // )

  const stream = new StreamOutputBuffer();

  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  samples.forEach(it => {
    stream.writeUInt8(
      (it.is_leading & 0x03) << 6 |
      (it.sample_depends_on & 0x03) << 4 |
      (it.sample_is_depended_on & 0x03) << 2 |
      (it.sample_has_redundancy & 0x03)
    );
  });
  return generateBox('sdtp', stream.getBuffer());
}
