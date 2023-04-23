import { StreamInputBuffer } from '@gradii/stream-buffer';

export function mdhd(data: Buffer) {
  let stream = new StreamInputBuffer(data);
  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  let creationTime;
  let modificationTime;
  let timescale;
  let duration;
  if (version === 1) {
    creationTime = stream.readUInt32BE() * Math.pow(2, 32) + stream.readUInt32BE();
    modificationTime = stream.readUInt32BE() * Math.pow(2, 32) + stream.readUInt32BE();
    timescale = stream.readUInt32BE();
    duration = stream.readUInt32BE() * Math.pow(2, 32) + stream.readUInt32BE();
  } else {
    creationTime = stream.readUInt32BE();
    modificationTime = stream.readUInt32BE();
    timescale = stream.readUInt32BE();
    duration = stream.readUInt32BE();
  }
  const language = stream.readUInt16BE();

  const field = [];
  field[0] = (language >> 10) & 0x1f;
  field[1] = (language >> 5) & 0x1f;
  field[2] = language & 0x1f;
  const languageString = String.fromCharCode(
    0x60 + field[0],
    0x60 + field[1],
    0x60 + field[2]
  );

  stream.skip(2);

  const mdhdBox = {
    version,
    flags,
    creationTime,
    modificationTime,
    timescale,
    duration,
    languageString
  };

  return mdhdBox;
}
