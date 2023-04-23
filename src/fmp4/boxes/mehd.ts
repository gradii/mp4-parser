import { StreamOutputBuffer } from '@gradii/stream-buffer';
import { generateBox } from '../utils/generateBox';

export type MehdParam = {
  version?: number,
  flags?: number,
  duration: number,
}

export function mehd({
  version = 0,
  flags = 0,
  duration
}: MehdParam) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt32BE(duration);

  return generateBox('mehd', stream.getBuffer());
}

