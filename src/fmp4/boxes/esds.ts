import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function esds({
  version = 0x00,
  flags = 0x00,
  decoderSpecificInfo = 0x03,
  audioConfig = [0x2b, 0x92, 0x08, 0x00],
  es_id = 0x0001,
  stream_priority,
  decoderConfigDescrTag,
  codec = 0x40,
  stream_type = 0x15,
  maxBitrate = 0x00000000,
  avgBitrate = 0x00000000,
  DecSpecificInfoTag = 0x05,
  config = [],
  GASpecificConfig = 0x060102
}) {
  const stream = new StreamOutputBuffer();

  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  //region MP4ESDescrTag
  stream.writeUInt8(decoderSpecificInfo);
  //todo
  stream.writeUInt8(0x17 + audioConfig.length);
  stream.writeUInt16BE(es_id);
  stream.writeUInt8(stream_priority);
  //region MP4DecConfigDescrTag
  stream.writeUInt8(decoderConfigDescrTag);
  stream.writeUInt8(0x0f + audioConfig.length);
  stream.writeUInt8(codec);
  stream.writeUInt8(stream_type);
  stream.writeUInt8(0x00);
  stream.writeUInt8(0x00);
  stream.writeUInt8(0x00);
  stream.writeUInt32BE(maxBitrate);
  stream.writeUInt32BE(avgBitrate);
  //SLConfigDescriptor
  stream.writeUInt8(DecSpecificInfoTag);
  stream.writeUInt8(config.length);
  config.forEach(it => {
    stream.writeUInt8(it);
  });
  stream.writeUIntBE(GASpecificConfig, 3);
  //endregion

  return generateBox('esds', stream.getBuffer());
}


export function MP4DecConfigDescrTag({
  type,
  size,
  extend,
  typeID,
  streamUint,
  bufferSize,
  maximum,
  average
}) {
  let stream = new StreamOutputBuffer();
  stream.writeUInt8(type);
  if (extend) {
    for (let i = 0; i < 3; i++) {
      stream.writeUInt8(0x80);
    }
    stream.writeUInt8(size - 5);
  } else {
    stream.writeUInt8(size - 2);
  }
  stream.writeUInt8(typeID);
  stream.writeUInt8(streamUint);
  stream.writeUIntBE(bufferSize, 3);
  stream.writeUInt32BE(maximum);
  stream.writeUInt32BE(average);
  MP4DecSpecificDescrTag(arguments[0]);
  return stream.getBuffer();
}

export function MP4DecSpecificDescrTag({type, size, extend, EScode}) {
  let stream = new StreamOutputBuffer();
  stream.writeUInt8(type);
  if (extend) {
    for (let i = 0; i < 3; i++) {
      stream.writeUInt8(0x80);
    }
    stream.writeUInt8(size - 5);
  } else {
    stream.writeUInt8(size - 2);
  }
  EScode.forEach(item => {
    stream.writeUInt8(Number(`0x${item}`));
  });

  return stream.getBuffer();
}

export function MP4ESDescrTag({type, size, extend, esID, priority}) {
  let stream = new StreamOutputBuffer();
  stream.writeUInt8(type);
  if (extend) {
    for (let i = 0; i < 3; i++) {
      stream.writeUInt8(0x80);
    }
    stream.writeUInt8(size - 5);
  } else {
    stream.writeUInt8(size - 2);
  }
  stream.writeUInt16BE(esID);
  stream.writeUInt8(priority);


  stream.write(MP4DecConfigDescrTag(arguments[0]));
  stream.write(SLConfigDescriptor(arguments[0]));

  return stream.getBuffer();

}

export function SLConfigDescriptor({type, extend, size, SL}) {
  let stream = new StreamOutputBuffer();
  stream.writeUInt8(type);
  if (extend) {
    for (let i = 0; i < 3; i++) {
      stream.writeUInt8(0x80);
    }
    stream.writeUInt8(size - 5);
  } else {
    stream.writeUInt8(size - 2);
  }
  stream.writeUInt8(SL);

  return stream.getBuffer();
}
