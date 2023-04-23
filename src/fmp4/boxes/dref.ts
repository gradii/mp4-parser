import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function dref({
  version = 0,
  flags = 0,
  entries = []
} = {}) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt32BE(entries.length);
  entries.forEach(it => {
    stream.write(it);
  });

  return generateBox('dref', stream.getBuffer());
}

