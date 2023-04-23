import { StreamOutputBuffer } from '@gradii/stream-buffer';
import { generateBox } from '../utils/generateBox';
import { MATRIX_TYPED_ARRAY } from '../utils/constants';

export type MvhdParam = {
  version?: number,
  flags?: number,
  creationTime?: number,
  modificationTime?: number,
  timescale: number,
  duration: number,
  rate?: number,
  volume?: number,
  matrix?: any,
  previewTime?: number,
  previewDuration?: number,
  posterTime?: number,
  selectionTime?: number,
  selectionDuration?: number,
  currentTime?: number,
  nextTrackId: number,
}

export function mvhd({
  version = 0,
  flags = 0,
  creationTime = 0,
  modificationTime = 0,
  timescale,
  duration,
  rate = 1,
  volume = 1,
  matrix = MATRIX_TYPED_ARRAY,
  previewTime = 0,
  previewDuration = 0,
  posterTime = 0,
  selectionTime = 0,
  selectionDuration = 0,
  currentTime = 0,
  nextTrackId
}: MvhdParam) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);

  if (version == 1) {
    stream.writeUInt32BE((creationTime / Math.pow(2, 32)) & 0xffffffff);
    stream.writeUInt32BE(creationTime & 0xffffffff);

    stream.writeUInt32BE((modificationTime / Math.pow(2, 32)) & 0xffffffff);
    stream.writeUInt32BE(modificationTime & 0xffffffff);

    stream.writeUInt32BE(timescale);

    stream.writeUInt32BE((duration / Math.pow(2, 32)) & 0xffffffff);
    stream.writeUInt32BE(duration & 0xffffffff);
  } else {
    stream.writeUInt32BE(creationTime);
    stream.writeUInt32BE(modificationTime);
    stream.writeUInt32BE(timescale);
    stream.writeUInt32BE(duration);
  }

  const _rate = rate * 65536;
  const _volume = volume * 256;

  stream.writeUInt16BE((_rate & 0xffff0000) >>> 16);
  stream.writeUInt16BE(_rate & 0x0000ffff);
  stream.writeUInt8((_volume & 0xff00) >>> 8);
  stream.writeUInt8(_volume & 0x00ff);
  stream.writeUInt16BE(0);
  stream.writeUInt32BE(0);
  stream.writeUInt32BE(0);

  stream.write(matrix);

  stream.writeUInt32BE(previewTime);
  stream.writeUInt32BE(previewDuration);
  stream.writeUInt32BE(posterTime);
  stream.writeUInt32BE(selectionTime);
  stream.writeUInt32BE(selectionDuration);
  stream.writeUInt32BE(currentTime);

  stream.writeUInt32BE(nextTrackId);

  return generateBox('mvhd', stream.getBuffer());
}

