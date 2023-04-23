import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function edts({
  elsts = []
}: {
  elsts: Buffer[]
}) {
  const stream = new StreamOutputBuffer();

  elsts.forEach(it => {
    stream.write(it);
  });

  return generateBox('edts', stream.getBuffer());
}
