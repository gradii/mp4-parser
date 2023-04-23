import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';


export enum Language {

}

export function mdhd({
  version = 0x00,
  flags = 0x000000,
  creation_time = 0,
  modification_time = 0,
  timescale, //video timescale or sound timescale
  duration,
  language = 0x55c4, //ISO 639-2
  quality = 0
}) {
  // const {type} = data
  // let duration
  // let timescale
  // if (type === 'video') {
  //   duration = data.videoDuration
  //   timescale = data.videoTimescale
  // } else {
  //   duration = data.audioDuration
  //   timescale = data.audioTimescale
  // }

  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);

  if (version === 1) {
    stream.writeUInt32BE(creation_time / Math.pow(2, 32));
    stream.writeUInt32BE(creation_time % Math.pow(2, 32));
    stream.writeUInt32BE(modification_time / Math.pow(2, 32));
    stream.writeUInt32BE(modification_time % Math.pow(2, 32));
    stream.writeUInt32BE(timescale);
    stream.writeUInt32BE(duration / Math.pow(2, 32));
    stream.writeUInt32BE(duration % Math.pow(2, 32));
  } else {
    stream.writeUInt32BE(creation_time >>> 0);
    stream.writeUInt32BE(modification_time >>> 0);
    stream.writeUInt32BE(timescale);
    stream.writeUInt32BE(duration);
  }

  stream.writeUInt16BE(language);
  stream.writeUInt16BE(quality);

  return generateBox('mdhd', stream.getBuffer());
}
