import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function traf(
  tfhdBuffer: Buffer,
  tfdtBuffer: Buffer,
  sdtpBuffer: Buffer,
  trunBuffer: Buffer) {
  const stream = new StreamOutputBuffer();
  stream.write(tfhdBuffer);
  stream.write(tfdtBuffer);
  stream.write(sdtpBuffer);
  stream.write(trunBuffer);

  return generateBox('traf', stream.getBuffer());
}
