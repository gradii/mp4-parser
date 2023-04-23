import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function getTrunFlag(trackId) {
  return 0x00 << 8 | (trackId === 1 ? 0x0f : 0x07) << 4 | 0x01;
}

export function getTrunOffset(trackId, samplesLength) {
  const ceil = trackId === 1 ? 0x10 : 0xc;
  const offset = 108 + ceil * samplesLength + samplesLength;
  return offset;
}

export function trun({
  version,
  flags,
  samples = [],
  dataOffset,
  trackId
}) {
  // const ceil = trackId === 1 ? 0x10 : 0xc
  // const length = samples.length
  // // mdat-header 8
  // // moof-header 8
  // // mfhd 16
  // // traf-header 8
  // // thhd 16
  // // tfdt 20
  // // trun-header 12
  // // sampleCount 4
  // // data-offset 4
  // // samples.length
  // // sdtp-header 12
  // const offset = 108 + ceil * length + samples.length
  // // prettier-ignore
  // const content = new Uint8Array([
  //   0x00, 0x00, trackId === 1 ? 0x0f : 0x07, 0x01,
  //   ...num2FourBytes(samples.length),
  //   ...num2FourBytes(offset),
  //   ...concatTypedArray(
  //     ...samples.map((sample, index) => {
  //       const {duration, size, compositionTimeOffset} = sample
  //       return concatTypedArray(
  //         num2FourBytes(duration),
  //         num2FourBytes(size),
  //         trackId === 1
  //           ? index === 0 // FIXME:need sample flags
  //           ? [0x02, 0x00, 0x00, 0x00]
  //           : [0x01, 0x01, 0x00, 0x00]
  //           : [0x01, 0x00, 0x00, 0x00],
  //         trackId === 1 ? num2FourBytes(compositionTimeOffset) : [],
  //       )
  //     })
  //   ),
  // ])

  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt32BE(samples.length);
  stream.writeUInt32BE(dataOffset);
  samples.forEach((sample, index) => {
    const {duration, size, compositionTimeOffset} = sample;
    stream.writeUInt32BE(duration);
    stream.writeUInt32BE(size);
    if (trackId === 1) {
      if (index === 0) {
        stream.writeUInt32BE(0x02000000);
      } else {
        stream.writeUInt32BE(0x01000000);
      }
    } else {
      stream.writeUInt32BE(0x01000000);
    }
    if (trackId === 1) {
      stream.writeUInt32BE(compositionTimeOffset);
    }
  });


  return generateBox('trun', stream.getBuffer());
}
