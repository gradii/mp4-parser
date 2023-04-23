import { StreamOutputBuffer } from '@gradii/stream-buffer';
import { SeqParameterSet } from '../../h264/model/SeqParameterSet';
import { PictureParameterSet } from '../../h264/model/PictureParameterSet';

export enum H264NalUnitTypes {
  UNSPECIFIED              = 0,
  CODED_SLICE_NON_IDR      = 1,
  CODED_SLICE_DATA_PART_A  = 2,
  CODED_SLICE_DATA_PART_B  = 3,
  CODED_SLICE_DATA_PART_C  = 4,
  CODED_SLICE_IDR          = 5,
  SEI                      = 6,
  SEQ_PARAMETER_SET        = 7,
  PIC_PARAMETER_SET        = 8,
  AU_UNIT_DELIMITER        = 9,
  END_OF_SEQUENCE          = 10,
  END_OF_STREAM            = 11,
  FILLER_DATA              = 12,
  SEQ_PARAMETER_SET_EXT    = 13,
  PREFIX_NAL_UNIT          = 14,
  SUBSET_SEQ_PARAMETER_SET = 15,
  RESERVERED_16            = 16,
  RESERVERED_17            = 17,
  RESERVERED_18            = 18,
  CODED_SLICE_AUX_PIC      = 19,
  CODED_SLICE_EXT          = 20,
  RESERVED_21              = 21,
  RESERVED_22              = 22,
  RESERVED_23              = 23,
  UNSPEC_24                = 24,
  UNSPEC_25                = 25,
  UNSPEC_26                = 26,
  UNSPEC_27                = 27,
  UNSPEC_28                = 28,
  UNSPEC_29                = 29,
  UNSPEC_30                = 30,
  UNSPEC_31                = 31,
}


export function generateBox(type, content: Buffer) {
  const buffer = new Buffer(content.length + 8);
  buffer.writeUInt32BE(content.length + 8, 0);
  buffer.write(type, 4, 4, 'binary');
  content.copy(buffer, 8, 0, content.length);

  return buffer;
}


/**
 *
 * @param nal_ref_idc
 * @param nal_ref_type
 * @param content
 */
export function generateH264NalUnitHeader({
  nal_ref_idc,
  nal_ref_type,
  content
}: {
  nal_ref_idc: number,
  nal_ref_type: H264NalUnitTypes,
  content: Buffer
}) {
  const buffer = new Buffer(content.length + 3);
  buffer.writeUInt16BE(content.length, 0);
  buffer.writeUInt8(0x07f & (((nal_ref_idc << 5) & 0x60) | (nal_ref_type & 0x1f)), 2);
  content.copy(buffer, 3, 0, content.length);

  return buffer;
}


/**
 *
 * @param nal_ref_idc     3 (0x3) - (2 bits)
 * @param nal_unit_type   7 (0x7) - (5 bits)
 * @param seqParameterSet
 */
export function generateNalUnitType({
  nal_ref_idc = 0x3,
  nal_unit_type,
  nalUnit
}: {
  nal_ref_idc?: number
  nal_unit_type: H264NalUnitTypes,
  nalUnit: SeqParameterSet | PictureParameterSet
}) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(0x07f & (((nal_ref_idc << 5) & 0x60) | (nal_unit_type & 0x1f)));
  nalUnit.write(stream);

  return stream.getBuffer();
}
