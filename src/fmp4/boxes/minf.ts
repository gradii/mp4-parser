import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function minf(boxes = []) {
  // let header;
  // switch (type) {
  //   case 'video':
  //     header = vmhd(arguments[0]);
  //     break;
  //   case 'audio':
  //     header = smhd(arguments[0]);
  //     break;
  // }

  const stream = new StreamOutputBuffer();
  // stream.write(header);
  // stream.write(dinf());
  // stream.write(stbl(arguments[0]));
  // stream.write(stbl(arguments[0]));

  boxes.forEach(it => {
    stream.write(it);
  });

  return generateBox('minf', stream.getBuffer());
}
