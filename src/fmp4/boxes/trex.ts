import { StreamOutputBuffer } from '@gradii/stream-buffer';
import { generateBox } from '../utils/generateBox';

export type TrexParam = {
  version?: number,
  flags?: number,
  trackId: number,
  defaultSampleDescriptionIndex?: number,
  defaultSampleDuration?: number,
  defaultSampleSize?: number,
  defaultSampleFlags?: number
}

export function trex({
  version = 0x00,
  flags = 0x000000,
  trackId,
  defaultSampleDescriptionIndex = 0x00000001,
  defaultSampleDuration = 0x00000000,
  defaultSampleSize = 0x00000000,
  defaultSampleFlags = 0x00010001
}: TrexParam) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt32BE(trackId);
  stream.writeUInt32BE(defaultSampleDescriptionIndex);
  stream.writeUInt32BE(defaultSampleDuration);
  stream.writeUInt32BE(defaultSampleSize);
  stream.writeUInt32BE(defaultSampleFlags);

  return generateBox('trex', stream.getBuffer());
}
