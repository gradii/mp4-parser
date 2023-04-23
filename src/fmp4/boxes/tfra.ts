import { StreamOutputBuffer } from '@gradii/stream-buffer';
import { generateBox } from '../utils/generateBox';

export function tfra({
  version = 0x00,
  flags = 0x000000,
  trackId,
  trafTurnSampleNumber,
  entries = []
}) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt32BE(trackId);
  stream.writeUInt32BE(trafTurnSampleNumber);
  stream.writeUInt32BE(entries.length);
  entries.forEach(it => {
    if (version === 1) {
      stream.writeUInt32BE((it.time / Math.pow(2, 32)) & 0xffffffff);
      stream.writeUInt32BE(it.time & 0xffffffff);
      stream.writeUInt32BE((it.moofOffset / Math.pow(2, 32)) & 0xffffffff);
      stream.writeUInt32BE(it.moofOffset & 0xffffffff);
    } else {
      stream.writeUInt32BE(it.time);
      stream.writeUInt32BE(it.moofOffset);
    }
    stream.writeUInt8(1);
    stream.writeUInt8(1);
    stream.writeUInt8(1);
  });

  return generateBox('tfra', stream.getBuffer());
}
