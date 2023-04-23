import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function mfhd({
  version = 0,
  flags = 0,
  sequenceNumber
}) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt32BE(sequenceNumber);

  return generateBox('mfhd', stream.getBuffer());
}
