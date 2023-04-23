import { Mp4Box } from '../mp4Box';
import { StreamInputBuffer } from '@gradii/stream-buffer';

export function mp4a(data: Buffer) {
  let stream = new StreamInputBuffer(data);

  stream.skip(4);
  stream.skip(2);

  const dataReferenceIndex = stream.readInt16BE();

  stream.skip(2);
  stream.skip(2);
  stream.skip(4);

  const channelCount = stream.readUInt16BE();
  const sampleSize = stream.readUInt16BE();

  stream.skip(4);
  const sampleRate = stream.readUInt32BE() / 0x10000;
  let mp4Box = new Mp4Box();
  mp4Box.readSize(stream);
  mp4Box.readType(stream);
  mp4Box.readBody(stream);
  const esdsBox = mp4Box.box;

  const mp4aBox = {
    dataReferenceIndex,
    channelCount,
    sampleSize,
    sampleRate,
    esds: esdsBox
  };

  return mp4aBox;
}
