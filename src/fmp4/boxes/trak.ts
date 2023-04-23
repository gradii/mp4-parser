import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

/**
 * tkhd(data), mdia(data)
 * @param subBoxes
 */
export function trak(subBoxes: Buffer[]) {
  const stream = new StreamOutputBuffer();
  subBoxes.forEach(it => {
    stream.write(it);
  });
  return generateBox('trak', stream.getBuffer());
}
