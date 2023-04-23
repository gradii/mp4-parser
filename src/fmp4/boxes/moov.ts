import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function moov(mvhdBuffer: Buffer, trackBuffer: Buffer, mvexBuffer: Buffer) {
  const stream = new StreamOutputBuffer();
  stream.write(mvhdBuffer);
  stream.write(trackBuffer);
  stream.write(mvexBuffer);

  return generateBox('moov', stream.getBuffer());
}
