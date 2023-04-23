import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export type TfhdParam = {
  version?: number,
  flags?: number,
  trackId: number,
  sampleDuration?: number,
  sampleFlag?: number
}

export function tfhd({
  version = 0x00,
  flags = 0x000000,
  trackId,
  sampleDuration,
  sampleFlag
}: TfhdParam) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt32BE(trackId);
  if (sampleDuration) {
    stream.writeUInt32BE(sampleDuration);
  }
  if (sampleFlag) {
    stream.writeUInt32BE(sampleFlag);
  }

  return generateBox('tfhd', stream.getBuffer());
}
