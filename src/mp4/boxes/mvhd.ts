import { StreamInputBuffer } from '@gradii/stream-buffer';

export function mvhd(data: Buffer) {
  const stream = new StreamInputBuffer(data);

  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);
  const creationTime = stream.readUInt32BE();
  const modificationTime = stream.readUInt32BE();
  const timescale = stream.readUInt32BE();
  const duration = stream.readUInt32BE();

  const rate = stream.readUInt32BE() / 65536;
  const volume = stream.readUInt16BE() / 256;

  // reserved
  stream.readUInt16BE();
  stream.readUInt32BE();
  stream.readUInt32BE();

  const matrix = [];
  for (let i = 0; i < 36; i += 4) {
    matrix.push(stream.readUInt32BE());
  }

  // preDefined
  for (let i = 0; i < 24; i += 4) {
    stream.readUInt32BE();
  }

  const nextTrackId = stream.readUInt32BE();

  const mvhdBox = {
    version,
    flags,
    creationTime,
    modificationTime,
    timescale,
    duration,
    rate,
    volume,
    matrix,
    nextTrackId
  };

  return mvhdBox;
}
