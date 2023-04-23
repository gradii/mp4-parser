import { StreamInputBuffer } from '@gradii/stream-buffer';

export function tkhd(data) {
  let stream = new StreamInputBuffer(data);
  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  let creationTime;
  let modificationTime;
  let trackId;
  let duration;
  if (version === 1) {
    creationTime = stream.readUInt32BE() * Math.pow(2, 32) + stream.readUInt32BE();
    modificationTime = stream.readUInt32BE() * Math.pow(2, 32) + stream.readUInt32BE();
    trackId = stream.readUInt32BE();
    stream.skip(4);
    duration = stream.readUInt32BE() * Math.pow(2, 32) + stream.readUInt32BE();
  } else {
    creationTime = stream.readUInt32BE();
    modificationTime = stream.readUInt32BE();
    trackId = stream.readUInt32BE();
    stream.skip(4);
    duration = stream.readUInt32BE();
  }
  stream.skip(4);
  stream.skip(4);

  const layer = stream.readUInt16BE();
  const alternateGroup = stream.readUInt16BE();
  const volume = stream.readUInt16BE() >> 8;
  stream.skip(2);
  // 视频转换矩阵
  let matrix = [];
  for (let i = 0; i < 9; i++) {
    matrix.push(stream.readUInt32BE());
  }
  const width = Number(stream.readUInt16BE() + '.' + stream.readUInt16BE());
  const height = Number(stream.readUInt16BE() + '.' + stream.readUInt16BE());

  const tkhdBox = {
    version,
    flags,
    creationTime,
    modificationTime,
    trackId,
    duration,
    layer,
    alternateGroup,
    volume,
    matrix,
    width,
    height
  };

  return tkhdBox;
}
