import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function stbl(subBoxes: Buffer[]) {
  const stream = new StreamOutputBuffer();
  subBoxes.forEach(it => {
    stream.write(it);
  });
  return generateBox('stbl', stream.getBuffer());
}


