import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';
import { trex } from './trex';
import { mehd, MehdParam } from './mehd';

export function mvex(data: MehdParam) {
  const stream = new StreamOutputBuffer();
  stream.write(mehd(data));
  stream.write(trex({trackId: 1}));
  stream.write(trex({trackId: 2}));

  return generateBox('mvex', stream.getBuffer());
}
