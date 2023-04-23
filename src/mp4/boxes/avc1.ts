import { StreamInputBuffer } from '@gradii/stream-buffer';
import { Mp4Box } from '../mp4Box';

export function avc1(data: Buffer) {
  const stream = new StreamInputBuffer(data);
  stream.skip(6);
  const dataReferenceIndex = stream.readUInt16BE();
  stream.skip(16);
  const width = stream.readUInt16BE();
  const height = stream.readUInt16BE();
  const horizresolution = stream.readUInt32BE() / 65536;
  const vertresolution = stream.readUInt32BE() / 65536;
  stream.skip(4);
  const frameCount = stream.readUInt16BE();
  const compressorname = stream.readString(32, 'binary');
  const depth = stream.readUInt16BE();
  stream.skip(2);

  const mp4Box = new Mp4Box();
  mp4Box.readSize(stream);
  mp4Box.readType(stream);
  mp4Box.readBody(stream);
  const avcCBox = mp4Box.box;

  const avc1Box = {
    dataReferenceIndex,
    width,
    height,
    horizresolution,
    vertresolution,
    frameCount,
    compressorname,
    depth,
    avcC: avcCBox
  };

  return avc1Box;
}
