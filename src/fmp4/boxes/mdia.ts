import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function mdia(
  mdhdBuffer: Buffer,
  hdlrBuffer: Buffer,
  minfBuffer: Buffer
) {
  const stream = new StreamOutputBuffer();
  stream.write(mdhdBuffer);
  stream.write(hdlrBuffer);
  stream.write(minfBuffer);

  return generateBox('mdia', stream.getBuffer());
}
