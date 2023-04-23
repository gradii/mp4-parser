import { StreamInputBuffer } from '@gradii/stream-buffer';

const TAGS = [
  null,
  null,
  null,
  'ESDescrTag',
  'DecoderConfigDescrTag',
  'DecSpecificDescrTag'
];

export function esds(data: Buffer) {
  const stream = new StreamInputBuffer(data);

  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  const type = TAGS[stream.readUInt8()];
  const esdsBox = {
    version,
    flags,
    [type]: getESDescrTag(stream)
  };

  return esdsBox;
}

function getESDescrTag(stream: StreamInputBuffer) {
  const data: any = {};

  let size = stream.readUInt8();
  if (size === 0x80) {
    stream.readUInt16BE();
    size = stream.readUInt8() + 5;
  } else {
    size += 2;
  }

  data.size = size;
  data.ESID = stream.readUInt16BE();
  data.streamPriority = stream.readUInt8();

  data[TAGS[stream.readUInt8()]] = getDecoderConfigDescrTag(stream);
  data[TAGS[stream.readUInt8()]] = getDecSpecificDescrTag(stream);
  return data;
}

function getDecoderConfigDescrTag(stream: StreamInputBuffer) {
  let size = stream.readUInt8();
  if (size === 0x80) {
    stream.readUInt16BE();
    size = stream.readUInt8() + 5;
  } else {
    size += 2;
  }

  const objectTypeIndication = stream.readUInt8();
  const type = stream.readUInt8();
  const streamType = type & ((1 << 7) - 1);
  const upStream = type & (1 << 1);
  const bufferSize = stream.readUIntBE(3);
  const maxBitrate = stream.readUInt32BE();
  const avgBitrate = stream.readUInt32BE();

  return {
    size,
    objectTypeIndication,
    streamType,
    upStream,
    bufferSize,
    maxBitrate,
    avgBitrate
  };
}

function getDecSpecificDescrTag(stream: StreamInputBuffer) {
  let size = stream.readUInt8();
  let dataSize = size;
  if (size === 0x80) {
    stream.readUInt16BE();
    size = stream.readUInt8() + 5;
    dataSize = size - 5;
  } else {
    size += 2;
  }

  const EScode = [];
  for (let i = 0; i < dataSize; i++) {
    EScode.push(
      Number(stream.readUInt8())
        .toString(16)
        .padStart(2, '0')
    );
  }
  const audioConfig = EScode.map(item => Number(`0x${item}`));

  return {
    size,
    audioConfig
  };
}
