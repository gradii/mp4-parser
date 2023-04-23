import { StreamInputBuffer } from '@gradii/stream-buffer';
import { Mp4Box } from '../mp4Box';

export function dref(data: Buffer) {
  let stream = new StreamInputBuffer(data);
  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  const urlBox = [];
  const entryCount = stream.readUInt32BE();
  // 暂时不支持离散视频，视频的部分内容由url指定
  for (let i = 0; i < entryCount; i++) {
    let mp4Box = new Mp4Box();
    mp4Box.readSize(stream);
    mp4Box.readType(stream);
    mp4Box.readBody(stream);
    urlBox.push(mp4Box.box);
  }
  return {
    version,
    flags,
    url: urlBox
  };
}
