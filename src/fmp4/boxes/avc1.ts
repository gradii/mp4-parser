import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

/**
 * 45ECF0       Video (160 bytes)
 * 45ECF0        Header (8 bytes)
 * 45ECF0         Size:                           160 (0x000000A0)
 * 45ECF4         Name:                           avc1
 * 45ECF8        Reserved:                        0 (0x0000000000000000)
 * 45ECFE        Data reference index:            1 (0x0001)
 * 45ED00        Version:                         0 (0x0000)
 * 45ED02        Revision level:                  0 (0x0000)
 * 45ED04        Vendor:
 * 45ED08        Temporal quality:                0 (0x00000000)
 * 45ED0C        Spatial quality:                 0 (0x00000000)
 * 45ED10        Width:                           424 (0x01A8)
 * 45ED12        Height:                          792 (0x0318)
 * 45ED14        Horizontal resolution:           4718592 (0x00480000)
 * 45ED18        Vertical resolution:             4718592 (0x00480000)
 * 45ED1C        Data size:                       0 (0x00000000)
 * 45ED20        Frame count:                     1 (0x0001)
 * 45ED22        Compressor name size:            0 (0x00)
 * 45ED23        Padding:                         (31 bytes)
 * 45ED42        Depth:                           24 (0x0018)
 * 45ED44        Color table ID:                  65535 (0xFFFF)
 * 45ED46        AVC decode (58 bytes)
 * 45ED46         Header (8 bytes)
 * 45ED46          Size:                          58 (0x0000003A)
 * 45ED4A          Name:                          avcC
 * 45ED4E         Version:                        1 (0x01)
 * 45ED4F         Specific (49 bytes)
 * 45ED4F          Profile:                       77 (0x4D)
 * 45ED50          Compatible profile:            64 (0x40)
 * 45ED51          Level:                         30 (0x1E)
 * 45ED52          Reserved:                      63 (0x3F) - (6 bits)
 * 45ED52          Size of NALU length minus 1:   3 (0x3) - (2 bits)
 * 45ED53          Reserved:                      7 (0x7) - (3 bits)
 * 45ED53          seq_parameter_set count:       1 (0x01) - (5 bits)
 * 45ED54          seq_parameter_set (37 bytes)
 * 45ED54           Size:                         35 (0x0023)
 * 45ED56           nal_ref_idc:                  3 (0x3) - (2 bits)
 * 45ED56           nal_unit_type:                7 (0x7) - (5 bits)
 * 45ED57           profile_idc:                  77 (0x4D)
 * 45ED58           constraints (1 bytes)
 * 45ED58            constraint_set0_flag:        No
 * 45ED58            constraint_set1_flag:        Yes
 * 45ED58            constraint_set2_flag:        No
 * 45ED58            constraint_set3_flag:        No
 * 45ED58            constraint_set4_flag:        No
 * 45ED58            constraint_set5_flag:        No
 * 45ED58            reserved_zero_2bits:         0 (0x0)
 * 45ED59           level_idc:                    30 (0x1E) - (8 bits)
 * 45ED5A           seq_parameter_set_id:         0 (0x0)
 * 45ED5A           log2_max_frame_num_minus4:    4 (0x4)
 * 45ED5A           pic_order_cnt_type:           2 (0x2)
 * 45ED5B           max_num_ref_frames:           1 (0x1)
 * 45ED5B           gaps_in_frame_num_value_allowed_flag: No
 * 45ED5B           pic_width_in_mbs_minus1:      26 (0x1A)
 * 45ED5C           pic_height_in_map_units_minus1: 49 (0x031)
 * 45ED5E           frame_mbs_only_flag:          Yes
 * 45ED5E           direct_8x8_inference_flag:    Yes
 * 45ED5E           frame_cropping_flag (2 bytes)
 * 45ED5E            frame_cropping_flag:         Yes
 * 45ED5E            frame_crop_left_offset:      0 (0x0)
 * 45ED5E            frame_crop_right_offset:     4 (0x4)
 * 45ED5F            frame_crop_top_offset:       0 (0x0)
 * 45ED5F            frame_crop_bottom_offset:    4 (0x4)
 * 45ED60           vui_parameters_present_flag (24 bytes)
 * 45ED60            vui_parameters_present_flag: Yes
 * 45ED60            aspect_ratio_info_present_flag (1 bytes)
 * 45ED60             aspect_ratio_info_present_flag: Yes
 * 45ED60             aspect_ratio_idc:           1 (0x01) - (8 bits) - 1.000
 * 45ED61            overscan_info_present_flag:  No
 * 45ED61            video_signal_type_present_flag: No
 * 45ED61            chroma_loc_info_present_flag: No
 * 45ED61            timing_info_present_flag (8 bytes)
 * 45ED61             timing_info_present_flag:   Yes
 * 45ED61             num_units_in_tick:          1000 (0x000003E8) - (32 bits)
 * 45ED65             time_scale:                 60000 (0x0000EA60) - (32 bits)
 * 45ED69             fixed_frame_rate_flag:      Yes
 * 45ED69            nal_hrd_parameters_present_flag (13 bytes)
 * 45ED69             nal_hrd_parameters_present_flag: Yes
 * 45ED6A             cpb_cnt_minus1:             0 (0x0)
 * 45ED6A             bit_rate_scale:             0 (0x0) - (4 bits)
 * 45ED6A             cpb_size_scale:             0 (0x0) - (4 bits)
 * 45ED6B             ShedSel (8 bytes)
 * 45ED6B              bit_rate_value_minus1:     56389 (0x0000DC45) - 3608960 (0x371180) bps
 * 45ED6F              cpb_size_value_minus1:     150374 (0x000024B66) - 2406000 (0x24B670) bits
 * 45ED73              cbr_flag:                  No
 * 45ED73             initial_cpb_removal_delay_length_minus1: 23 (0x17) - (5 bits)
 * 45ED74             cpb_removal_delay_length_minus1: 15 (0x0F) - (5 bits)
 * 45ED74             dpb_output_delay_length_minus1: 5 (0x05) - (5 bits)
 * 45ED75             time_offset_length:         24 (0x18) - (5 bits)
 * 45ED76            vcl_hrd_parameters_present_flag: No
 * 45ED76            low_delay_hrd_flag:          No
 * 45ED76            pic_struct_present_flag:     Yes
 * 45ED76            bitstream_restriction_flag (2 bytes)
 * 45ED76             bitstream_restriction_flag: Yes
 * 45ED76             motion_vectors_over_pic_boundaries_flag: Yes
 * 45ED76             max_bytes_per_pic_denom:    0 (0x0)
 * 45ED76             max_bits_per_mb_denom:      0 (0x0)
 * 45ED77             log2_max_mv_length_horizontal: 1 (0x1)
 * 45ED77             log2_max_mv_length_vertical: 1 (0x1)
 * 45ED77             max_num_reorder_frames:     0 (0x0)
 * 45ED77             max_dec_frame_buffering:    1 (0x1)
 * 45ED79          pic_parameter_set count:       1 (0x01)
 * 45ED7A          pic_parameter_set (6 bytes)
 * 45ED7A           Size:                         4 (0x0004)
 * 45ED7C           nal_ref_idc:                  3 (0x3) - (2 bits)
 * 45ED7C           nal_unit_type:                8 (0x8) - (5 bits)
 * 45ED7D           pic_parameter_set_id:         0 (0x0)
 * 45ED7D           seq_parameter_set_id:         0 (0x0)
 * 45ED7D           entropy_coding_mode_flag:     Yes
 * 45ED7D           bottom_field_pic_order_in_frame_present_flag: No
 * 45ED7D           num_slice_groups_minus1:      0 (0x0)
 * 45ED7D           num_ref_idx_l0_default_active_minus1: 0 (0x0)
 * 45ED7D           num_ref_idx_l1_default_active_minus1: 0 (0x0)
 * 45ED7D           weighted_pred_flag:           No
 * 45ED7E           weighted_bipred_idc:          0 (0x0) - (2 bits)
 * 45ED7E           pic_init_qp_minus26:          0 (0x0)
 * 45ED7E           pic_init_qs_minus26:          0 (0x0)
 * 45ED7E           chroma_qp_index_offset:       0 (0x0)
 * 45ED7E           deblocking_filter_control_present_flag: Yes
 * 45ED7E           constrained_intra_pred_flag:  No
 * 45ED7E           redundant_pic_cnt_present_flag: No
 * 45ED80          -------------------------
 * 45ED80          ---   AVC, accepted   ---
 * 45ED80          -------------------------
 * 45ED80        Pixel Aspect Ratio (16 bytes)
 * 45ED80         Header (8 bytes)
 * 45ED80          Size:                          16 (0x00000010)
 * 45ED84          Name:                          pasp
 * 45ED88         hSpacing:                       1 (0x00000001)
 * 45ED8C         vSpacing:                       1 (0x00000001)
 */

/**
 * <h1>4cc = "{@value #TYPE1}" || "{@value #TYPE2}" || "{@value #TYPE3}" || "{@value #TYPE4}" || "{@value #TYPE5}"</h1>
 * Contains information common to all visual tracks.
 * <pre>
 * class VisualSampleEntry(codingname) extends AbstractSampleEntry (codingname){
 *  unsigned int(16) pre_defined = 0;
 *  const unsigned int(16) reserved = 0;
 *  unsigned int(32)[3] pre_defined = 0;
 *  unsigned int(16) width;
 *  unsigned int(16) height;
 *  template unsigned int(32) horizresolution = 0x00480000; // 72 dpi
 *  template unsigned int(32) vertresolution = 0x00480000; // 72 dpi
 *  const unsigned int(32) reserved = 0;
 *  template unsigned int(16) frame_count = 1;
 *  string[32] compressorname;
 *  template unsigned int(16) depth = 0x0018;
 *  int(16) pre_defined = -1;
 * }
 * </pre>
 * <br>
 * Format-specific information is appened as boxes after the data described in ISO/IEC 14496-12 chapter 8.16.2.
 */
/**
 *
 * @param dataReferenceIndex
 * @param width
 * @param height
 * @param horizresolution
 * @param vertresolution
 * @param compressorname
 * @param frameCount
 * @param depth
 * @param subBoxes [avcC, pasp]
 */
export function avc1({
    dataReferenceIndex,
    width,
    height,
    horizresolution = 72,
    vertresolution = 72,
    compressorname = 'Gradii AVC Encoder',
    frameCount,
    depth,
  },
  subBoxes: Buffer[]
) {

  let stream = new StreamOutputBuffer(0xa0);
  // prettier-ignore
  //reserved
  stream.fill(0, 6);
  stream.writeUInt16BE(dataReferenceIndex);
  // 2 version
  // 2 Revision level
  // 4 Vendor
  // 4 Temporal quality
  // 4 Spatial quality
  stream.fill(0, 16);
  stream.writeUInt16BE(width);
  stream.writeUInt16BE(height);
  stream.writeUInt32BE(horizresolution * 65536);
  stream.writeUInt32BE(vertresolution * 65536);
  //data size
  stream.fill(0, 4);
  stream.writeUInt16BE(frameCount);

  // stream.write(new Buffer([
  //   0x0B, //Compressor name size
  //   0x57, 0x41, 0x4E, 0x47, 0x4C, 0x75, 0x76, 0X44, 0x41, 0x4E, 0x47
  // ]));
  // stream.fill(0, 20)

  stream.writeUInt8(compressorname.length & 0x1f);
  stream.writeString(compressorname, 0x1f, 'binary');

  stream.writeUInt16BE(depth);
  //Color table ID
  stream.writeUInt16BE(0xffff);

  subBoxes.forEach(it => {
    stream.write(it);
  });

  return generateBox('avc1', stream.getBuffer());
}
