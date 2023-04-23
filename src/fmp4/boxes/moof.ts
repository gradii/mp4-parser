import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function moof(mfhdBuffer, trafBuffer) {
  const stream = new StreamOutputBuffer();
  stream.write(mfhdBuffer);
  stream.write(trafBuffer);

  return generateBox('moof', stream.getBuffer());
}
