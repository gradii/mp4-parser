import { StreamInputBuffer } from '@gradii/stream-buffer';
import { Mp4Box } from '../mp4Box';

export function stsd(buffer) {
  const stream = new StreamInputBuffer(buffer);

  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  const entryCount = stream.readUInt32BE();

  const box = [];
  const mp4Box = new Mp4Box();
  let type = 'avc1';

  for (let i = 0; i < entryCount; i++) {
    mp4Box.readSize(stream);
    mp4Box.readType(stream);
    mp4Box.readBody(stream);
    box.push(mp4Box.box);
    type = mp4Box.type;
  }

  const stsdBox = {
    version,
    flags,
    [type]: box
  };

  return stsdBox;
}
