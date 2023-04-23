import { StreamInputBuffer } from '@gradii/stream-buffer';

export function avcC(data: Buffer) {
  let stream = new StreamInputBuffer(data);
  const configurationVersion = stream.readUInt8();
  const AVCProfileIndication = stream.readUInt8();
  const profileCompatibility = stream.readUInt8();
  const AVCLevelIndication = stream.readUInt8();
  const lengthSizeMinusOne = (stream.readUInt8() & 3);
  const numOfSequenceParameterSets = stream.readUInt8() & 0x1f;
  const SPS = [];
  for (let i = 0; i < numOfSequenceParameterSets; i++) {
    const length = stream.readUInt16BE();
    SPS.push(stream.read(length));
  }

  const numOfPictureParameterSets = stream.readUInt8();
  const PPS: Buffer[] = [];
  for (let i = 0; i < numOfPictureParameterSets; i++) {
    const length = stream.readUInt16BE();
    PPS.push(stream.read(length));
  }

  const avcCBox = {
    configurationVersion,
    AVCProfileIndication,
    profileCompatibility,
    AVCLevelIndication,
    lengthSizeMinusOne,
    SPS,
    PPS
  };

  return avcCBox;
}
