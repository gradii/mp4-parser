import { generateBox } from '../utils/generateBox';
import { MATRIX_TYPED_ARRAY } from '../utils/constants';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export type TkhdParam = {
  version?: number,
  flags?: number,
  creation_time?: number,
  modification_time?: number,
  trackId,
  layer,
  alternate_group,
  volume?: number,
  matrix?
  duration,
  width: number,
  height: number
}

export function tkhd({
  version = 0x01,
  flags = 0x000007,
  creation_time = 0,
  modification_time = 0,
  trackId,
  layer,
  alternate_group,
  volume = 1,
  matrix = MATRIX_TYPED_ARRAY,
  duration,
  width,
  height
}: TkhdParam) {

  const stream = new StreamOutputBuffer();

  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  if (version === 1) {
    stream.writeUInt32BE(creation_time / Math.pow(2, 32));
    stream.writeUInt32BE(creation_time % Math.pow(2, 32));
    stream.writeUInt32BE(modification_time / Math.pow(2, 32));
    stream.writeUInt32BE(modification_time % Math.pow(2, 32));
    stream.writeUInt32BE(trackId);
    stream.writeUInt32BE(0);
    stream.writeUInt32BE(duration / Math.pow(2, 32));
    stream.writeUInt32BE(duration % Math.pow(2, 32));
  } else {
    stream.writeUInt32BE(creation_time);
    stream.writeUInt32BE(modification_time);
    stream.writeUInt32BE(trackId);
    stream.writeUInt32BE(0);
    stream.writeUInt32BE(duration);
  }

  stream.fill(0, 8);
  stream.writeInt16BE(layer);
  stream.writeInt16BE(alternate_group);
  stream.writeInt16BE(volume);
  stream.fill(0, 2);

  stream.write(matrix);

  const _width = width * 65536;
  const _height = height * 65536;

  stream.writeUInt16BE((_width & 0xffff0000) >>> 16);
  stream.writeUInt16BE(_width & 0x0000ffff);
  stream.writeUInt16BE((_height & 0xffff0000) >>> 16);
  stream.writeUInt16BE(_height & 0x0000ffff);

  return generateBox('tkhd', stream.getBuffer());
}
