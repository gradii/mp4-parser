import { generateBox } from '../utils/generateBox';
import { BitStreamOutputBuffer, StreamOutputBuffer } from '@gradii/stream-buffer';

/**
 * iso14496/part15/AvcDecoderConfigurationRecord
 *
 * @param configurationVersion
 * @param AVCProfileIndication
 * @param profileCompatibility
 * @param AVCLevelIndication
 * @param lengthSizeMinusOne
 * @param numOfSequenceParameterSets
 * @param sequenceLength
 * @param sequence
 * @param ppsCount
 * @param ppsLength
 * @param pps
 * @param hasExts
 */
export function avcC({
  configurationVersion = 0x00,
  AVCProfileIndication,
  profileCompatibility,
  AVCLevelIndication,
  lengthSizeMinusOne,
  sequenceParameterSets = [],// sequenceParameterSets
  pictureParameterSets = [],// pictureParameterSets
  hasExts = false,
  chromaFormat = 1,
  bitDepthLumaMinus8 = 0,
  bitDepthChromaMinus8 = 0,
  sequenceParameterSetExts = []
}: {
  configurationVersion: number
  AVCProfileIndication: number,
  profileCompatibility: number,
  AVCLevelIndication: number,
  lengthSizeMinusOne: number,
  sequenceParameterSets?: Buffer[],
  pictureParameterSets?: Buffer[],
  hasExts?: boolean,
  chromaFormat?: number,
  bitDepthLumaMinus8?: number,
  bitDepthChromaMinus8?: number,
  sequenceParameterSetExts?: Buffer[]
}) {
  /**
   * Just for non-spec-conform encoders
   */
  const lengthSizeMinusOnePaddingBits = 63;
  const numberOfSequenceParameterSetsPaddingBits = 7;
  const chromaFormatPaddingBits = 31;
  const bitDepthLumaMinus8PaddingBits = 31;
  const bitDepthChromaMinus8PaddingBits = 31;

  let stream = new StreamOutputBuffer();

  stream.writeUInt8(configurationVersion);
  stream.writeUInt8(AVCProfileIndication);
  stream.writeUInt8(profileCompatibility);
  stream.writeUInt8(AVCLevelIndication);

  stream.writeUInt8(lengthSizeMinusOne | 0xfc);
  //seq_parameter_set count
  stream.writeUInt8(sequenceParameterSets.length | 0xe0);
  sequenceParameterSets.forEach(it => {
    stream.writeUInt16BE(it.byteLength);
    stream.write(it);
  });
  //pic_parameter_set
  stream.writeUInt8(pictureParameterSets.length);
  pictureParameterSets.forEach(it => {
    stream.writeUInt16BE(it.byteLength);
    stream.write(it);
  });

  if (hasExts && (AVCProfileIndication == 100 ||
                  AVCProfileIndication == 110 ||
                  AVCProfileIndication == 122 ||
                  AVCProfileIndication == 144)) {

    const bwb = new BitStreamOutputBuffer(stream);
    bwb.writeNBit(chromaFormatPaddingBits, 6);
    bwb.writeNBit(chromaFormat, 2);
    bwb.writeNBit(bitDepthLumaMinus8PaddingBits, 5);
    bwb.writeNBit(bitDepthLumaMinus8, 3);
    bwb.writeNBit(bitDepthChromaMinus8PaddingBits, 5);
    bwb.writeNBit(bitDepthChromaMinus8, 3);
    sequenceParameterSetExts.forEach(it => {
      stream.writeUInt16BE(it.byteLength);
      stream.write(it);
    });
  }

  return generateBox('avcC', stream.getBuffer());
}
