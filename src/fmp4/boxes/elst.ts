import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function elst({
  version = 0x00,
  flag = 0x000000,
  entries = []
}: {
  version?: number,
  flag?: number,
  entries?: {
    duration: number,
    mediaTime: number,
    mediaRate: number
  }[]
}) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flag, 3);
  stream.writeUInt32BE(entries.length);

  entries.forEach(it => {
    if (version === 1) {
      stream.writeUInt32BE(it.duration / Math.pow(2, 32));
      stream.writeUInt32BE(it.duration % Math.pow(2, 32));
      stream.writeUInt32BE(it.mediaTime / Math.pow(2, 32));
      stream.writeUInt32BE(it.mediaTime % Math.pow(2, 32));
    } else {
      stream.writeUInt32BE(it.duration);
      stream.writeUInt32BE(it.mediaTime);
    }
    const _rate = it.mediaRate * 65536;
    stream.writeUInt16BE((_rate & 0xffff0000) >> 16);
    stream.writeUInt16BE(_rate & 0x0000ffff);
  });


  return generateBox('elst', stream.getBuffer());
}
