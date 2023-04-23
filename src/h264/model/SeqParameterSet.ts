/**
 * Sequence Parameter Set structure of h264 bitstream
 * <p>
 * capable to serialize and deserialize with CAVLC bitstream</p>
 *
 */
import { ChromaFormat } from './ChromaFormat';
import { StreamInputBuffer, StreamOutputBuffer } from '@gradii/stream-buffer';
import { BitstreamRestriction, VUIParameters } from './VUIParameters';
import { ScalingMatrix } from './ScalingMatrix';
import { ScalingList } from './ScalingList';
import { AspectRatio_Extended_SAR } from './AspectRatio';
import { HRDParameters } from './HRDParameters';
import { CAVLCReader } from '../../stream/CAVLCReader';
import { CAVLCWriter } from '../../stream/CAVLCWriter';
import { H264NalUnitTypes } from '../../fmp4/utils/generateBox';

export class SeqParameterSet {

  public static NalUnitType = H264NalUnitTypes.SEQ_PARAMETER_SET;

  // public field_pic_flag: boolean = false;
  // public weighted_pred_flag: boolean = false;
  // public weighted_bipred_idc: number = 0;
  // public entropy_coding_mode_flag: boolean = false;


  public profile_idc: number = 0;
  public constraint_set_0_flag: boolean = false;
  public constraint_set_1_flag: boolean = false;
  public constraint_set_2_flag: boolean = false;
  public constraint_set_3_flag: boolean = false;
  public constraint_set_4_flag: boolean = false;
  public constraint_set_5_flag: boolean = false;
  public level_idc: number = 0;
  public seq_parameter_set_id: number = 0;
  //
  public chroma_format_idc: ChromaFormat = null;
  public residual_color_transform_flag: boolean = false;
  public bit_depth_luma_minus8: number = 0;
  public bit_depth_chroma_minus8: number = 0;
  public qpprime_y_zero_transform_bypass_flag: boolean = false;
  //
  public scalingMatrix: ScalingMatrix = null;
  public log2_max_frame_num_minus4: number = 0;
  //
  public pic_order_cnt_type: number = 2;
  public log2_max_pic_order_cnt_lsb_minus4: number = 0;
  public delta_pic_order_always_zero_flag: boolean = false;
  public offset_for_non_ref_pic: number = 0;
  public offset_for_top_to_bottom_field: number = 0;
  public offsetForRefFrame: number[] = null;
  //
  public num_ref_frames: number = 0;
  public gaps_in_frame_num_value_allowed_flag: boolean = false;
  public pic_width_in_mbs_minus1: number = 0;
  public pic_height_in_map_units_minus1: number = 0;
  //
  public frame_mbs_only_flag: boolean = true;
  public mb_adaptive_frame_field_flag: boolean = false;
  public direct_8x8_inference_flag: boolean = false;
  public frame_cropping_flag: boolean = false;
  public frame_crop_left_offset: number = 0;
  public frame_crop_right_offset: number = 0;
  public frame_crop_top_offset: number = 0;
  public frame_crop_bottom_offset: number = 0;
  public vuiParams: VUIParameters = null;
  private reserved_zero_2bits: number = 0;
  //vui_parameters_present_flag
  private num_ref_frames_in_pic_order_cnt_cycle: number = 0;

  public static read(is: StreamInputBuffer): SeqParameterSet {
    let reader: CAVLCReader = new CAVLCReader(is);
    let sps: SeqParameterSet = new SeqParameterSet();
    sps.profile_idc = (<number>reader.readNBit(8) | 0);
    sps.constraint_set_0_flag = reader.readBool();
    sps.constraint_set_1_flag = reader.readBool();
    sps.constraint_set_2_flag = reader.readBool();
    sps.constraint_set_3_flag = reader.readBool();
    sps.constraint_set_4_flag = reader.readBool();
    sps.constraint_set_5_flag = reader.readBool();
    sps.reserved_zero_2bits = reader.readNBit(2);
    sps.level_idc = (<number>reader.readNBit(8) | 0);
    sps.seq_parameter_set_id = reader.readUE();
    if (sps.profile_idc === 100 || sps.profile_idc === 110 || sps.profile_idc === 122 || sps.profile_idc === 144) {
      sps.chroma_format_idc = ChromaFormat.fromId(reader.readUE());
      if (sps.chroma_format_idc === ChromaFormat.YUV_444) {
        sps.residual_color_transform_flag = reader.readBool();
      }
      sps.bit_depth_luma_minus8 = reader.readUE();
      sps.bit_depth_chroma_minus8 = reader.readUE();
      sps.qpprime_y_zero_transform_bypass_flag = reader.readBool();
      let seqScalingMatrixPresent: boolean = reader.readBool();
      if (seqScalingMatrixPresent) {
        SeqParameterSet.readScalingListMatrix(reader, sps);
      }
    } else {
      sps.chroma_format_idc = ChromaFormat.YUV_420;
    }
    sps.log2_max_frame_num_minus4 = reader.readUE();
    sps.pic_order_cnt_type = reader.readUE();
    if (sps.pic_order_cnt_type === 0) {
      sps.log2_max_pic_order_cnt_lsb_minus4 = reader.readUE();
    } else if (sps.pic_order_cnt_type === 1) {
      sps.delta_pic_order_always_zero_flag = reader.readBool();
      sps.offset_for_non_ref_pic = reader.readSE();
      sps.offset_for_top_to_bottom_field = reader.readSE();
      sps.num_ref_frames_in_pic_order_cnt_cycle = reader.readUE();
      sps.offsetForRefFrame = new Array(sps.num_ref_frames_in_pic_order_cnt_cycle);
      for (let i: number = 0; i < sps.num_ref_frames_in_pic_order_cnt_cycle; i++) {
        sps.offsetForRefFrame[i] = reader.readSE();
      }
    }
    sps.num_ref_frames = reader.readUE();
    sps.gaps_in_frame_num_value_allowed_flag = reader.readBool();
    sps.pic_width_in_mbs_minus1 = reader.readUE();
    sps.pic_height_in_map_units_minus1 = reader.readUE();
    sps.frame_mbs_only_flag = reader.readBool();
    if (!sps.frame_mbs_only_flag) {
      sps.mb_adaptive_frame_field_flag = reader.readBool();
    }
    sps.direct_8x8_inference_flag = reader.readBool();
    sps.frame_cropping_flag = reader.readBool();
    if (sps.frame_cropping_flag) {
      sps.frame_crop_left_offset = reader.readUE();
      sps.frame_crop_right_offset = reader.readUE();
      sps.frame_crop_top_offset = reader.readUE();
      sps.frame_crop_bottom_offset = reader.readUE();
    }
    let vui_parameters_present_flag: boolean = reader.readBool();
    if (vui_parameters_present_flag) sps.vuiParams = SeqParameterSet.ReadVUIParameters(reader);
    reader.readTrailingBits();
    return sps;
  }

  /*private*/
  static readScalingListMatrix(reader: CAVLCReader, sps: SeqParameterSet) {
    sps.scalingMatrix = new ScalingMatrix();
    for (let i: number = 0; i < 8; i++) {
      {
        let seqScalingListPresentFlag: boolean = reader.readBool();
        if (seqScalingListPresentFlag) {
          sps.scalingMatrix.ScalingList4x4 = [null, null, null, null, null, null, null, null];
          sps.scalingMatrix.ScalingList8x8 = [null, null, null, null, null, null, null, null];
          if (i < 6) {
            sps.scalingMatrix.ScalingList4x4[i] = ScalingList.read(reader, 16);
          } else {
            sps.scalingMatrix.ScalingList8x8[i - 6] = ScalingList.read(reader, 64);
          }
        }
      }
    }
  }

  /*private*/
  static ReadVUIParameters(reader: CAVLCReader): VUIParameters {
    let vuip: VUIParameters = new VUIParameters();
    vuip.aspect_ratio_info_present_flag = reader.readBool();
    if (vuip.aspect_ratio_info_present_flag) {
      vuip.aspect_ratio_idc = (reader.readNBit(8) | 0);
      if (vuip.aspect_ratio_idc === AspectRatio_Extended_SAR) {
        vuip.sar_width = (<number>reader.readNBit(16) | 0);
        vuip.sar_height = (<number>reader.readNBit(16) | 0);
      }
    }
    vuip.overscan_info_present_flag = reader.readBool();
    if (vuip.overscan_info_present_flag) {
      vuip.overscan_appropriate_flag = reader.readBool();
    }
    vuip.video_signal_type_present_flag = reader.readBool();
    if (vuip.video_signal_type_present_flag) {
      vuip.video_format = (<number>reader.readNBit(3) | 0);
      vuip.video_full_range_flag = reader.readBool();
      vuip.colour_description_present_flag = reader.readBool();
      if (vuip.colour_description_present_flag) {
        vuip.colour_primaries = (<number>reader.readNBit(8) | 0);
        vuip.transfer_characteristics = (<number>reader.readNBit(8) | 0);
        vuip.matrix_coefficients = (<number>reader.readNBit(8) | 0);
      }
    }
    vuip.chroma_loc_info_present_flag = reader.readBool();
    if (vuip.chroma_loc_info_present_flag) {
      vuip.chroma_sample_loc_type_top_field = reader.readUE();
      vuip.chroma_sample_loc_type_bottom_field = reader.readUE();
    }
    vuip.timing_info_present_flag = reader.readBool();
    if (vuip.timing_info_present_flag) {
      vuip.num_units_in_tick = (<number>reader.readNBit(32) | 0);
      vuip.time_scale = (<number>reader.readNBit(32) | 0);
      vuip.fixed_frame_rate_flag = reader.readBool();
    }
    let nal_hrd_parameters_present_flag: boolean = reader.readBool();
    if (nal_hrd_parameters_present_flag) vuip.nalHRDParams = SeqParameterSet.readHRDParameters(reader);
    let vcl_hrd_parameters_present_flag: boolean = reader.readBool();
    if (vcl_hrd_parameters_present_flag) vuip.vclHRDParams = SeqParameterSet.readHRDParameters(reader);
    if (nal_hrd_parameters_present_flag || vcl_hrd_parameters_present_flag) {
      vuip.low_delay_hrd_flag = reader.readBool();
    }
    vuip.pic_struct_present_flag = reader.readBool();
    let bitstream_restriction_flag: boolean = reader.readBool();
    if (bitstream_restriction_flag) {
      vuip.bitstreamRestriction = new BitstreamRestriction();
      vuip.bitstreamRestriction.motion_vectors_over_pic_boundaries_flag = reader.readBool();
      vuip.bitstreamRestriction.max_bytes_per_pic_denom = reader.readUE();
      vuip.bitstreamRestriction.max_bits_per_mb_denom = reader.readUE();
      vuip.bitstreamRestriction.log2_max_mv_length_horizontal = reader.readUE();
      vuip.bitstreamRestriction.log2_max_mv_length_vertical = reader.readUE();
      vuip.bitstreamRestriction.max_num_reorder_frames = reader.readUE();
      vuip.bitstreamRestriction.max_dec_frame_buffering = reader.readUE();
    }
    return vuip;
  }

  /*private*/
  static readHRDParameters(reader: CAVLCReader): HRDParameters {
    let hrd: HRDParameters = new HRDParameters();
    hrd.cpb_cnt_minus1 = reader.readUE();
    hrd.bit_rate_scale = (<number>reader.readNBit(4) | 0);
    hrd.cpb_size_scale = (<number>reader.readNBit(4) | 0);
    hrd.bit_rate_value_minus1 = new Array(hrd.cpb_cnt_minus1 + 1);
    hrd.cpb_size_value_minus1 = new Array(hrd.cpb_cnt_minus1 + 1);
    hrd.cbr_flag = new Array(hrd.cpb_cnt_minus1 + 1);
    for (let SchedSelIdx: number = 0; SchedSelIdx <= hrd.cpb_cnt_minus1; SchedSelIdx++) {
      hrd.bit_rate_value_minus1[SchedSelIdx] = reader.readUE();
      hrd.cpb_size_value_minus1[SchedSelIdx] = reader.readUE();
      hrd.cbr_flag[SchedSelIdx] = reader.readBool();
    }
    hrd.initial_cpb_removal_delay_length_minus1 = (<number>reader.readNBit(5) | 0);
    hrd.cpb_removal_delay_length_minus1 = (<number>reader.readNBit(5) | 0);
    hrd.dpb_output_delay_length_minus1 = (<number>reader.readNBit(5) | 0);
    hrd.time_offset_length = (<number>reader.readNBit(5) | 0);
    return hrd;
  }

  /*private*/
  static writeVUIParameters(vuip: VUIParameters, writer: CAVLCWriter) {
    writer.writeBool(vuip.aspect_ratio_info_present_flag);
    if (vuip.aspect_ratio_info_present_flag) {
      writer.writeNBit(vuip.aspect_ratio_idc, 8);
      if (vuip.aspect_ratio_idc === AspectRatio_Extended_SAR) {
        writer.writeNBit(vuip.sar_width, 16);
        writer.writeNBit(vuip.sar_height, 16);
      }
    }
    writer.writeBool(vuip.overscan_info_present_flag);
    if (vuip.overscan_info_present_flag) {
      writer.writeBool(vuip.overscan_appropriate_flag);
    }
    writer.writeBool(vuip.video_signal_type_present_flag);
    if (vuip.video_signal_type_present_flag) {
      writer.writeNBit(vuip.video_format, 3);
      writer.writeBool(vuip.video_full_range_flag);
      writer.writeBool(vuip.colour_description_present_flag);
      if (vuip.colour_description_present_flag) {
        writer.writeNBit(vuip.colour_primaries, 8);
        writer.writeNBit(vuip.transfer_characteristics, 8);
        writer.writeNBit(vuip.matrix_coefficients, 8);
      }
    }
    writer.writeBool(vuip.chroma_loc_info_present_flag);
    if (vuip.chroma_loc_info_present_flag) {
      writer.writeUE(vuip.chroma_sample_loc_type_top_field);
      writer.writeUE(vuip.chroma_sample_loc_type_bottom_field);
    }
    writer.writeBool(vuip.timing_info_present_flag);
    if (vuip.timing_info_present_flag) {
      writer.writeNBit(vuip.num_units_in_tick, 32);
      writer.writeNBit(vuip.time_scale, 32);
      writer.writeBool(vuip.fixed_frame_rate_flag);
    }
    writer.writeBool(vuip.nalHRDParams != null);
    if (vuip.nalHRDParams != null) {
      SeqParameterSet.writeHRDParameters(vuip.nalHRDParams, writer);
    }
    writer.writeBool(vuip.vclHRDParams != null);
    if (vuip.vclHRDParams != null) {
      SeqParameterSet.writeHRDParameters(vuip.vclHRDParams, writer);
    }
    if (vuip.nalHRDParams != null || vuip.vclHRDParams != null) {
      writer.writeBool(vuip.low_delay_hrd_flag);
    }
    writer.writeBool(vuip.pic_struct_present_flag);
    writer.writeBool(vuip.bitstreamRestriction != null);
    if (vuip.bitstreamRestriction != null) {
      writer.writeBool(vuip.bitstreamRestriction.motion_vectors_over_pic_boundaries_flag);
      writer.writeUE(vuip.bitstreamRestriction.max_bytes_per_pic_denom);
      writer.writeUE(vuip.bitstreamRestriction.max_bits_per_mb_denom);
      writer.writeUE(vuip.bitstreamRestriction.log2_max_mv_length_horizontal);
      writer.writeUE(vuip.bitstreamRestriction.log2_max_mv_length_vertical);
      writer.writeUE(vuip.bitstreamRestriction.max_num_reorder_frames);
      writer.writeUE(vuip.bitstreamRestriction.max_dec_frame_buffering);
    }
  }

  /*private*/
  static writeHRDParameters(hrd: HRDParameters, writer: CAVLCWriter) {
    writer.writeUE(hrd.cpb_cnt_minus1);
    writer.writeNBit(hrd.bit_rate_scale, 4);
    writer.writeNBit(hrd.cpb_size_scale, 4);
    for (let SchedSelIdx: number = 0; SchedSelIdx <= hrd.cpb_cnt_minus1; SchedSelIdx++) {
      writer.writeUE(hrd.bit_rate_value_minus1[SchedSelIdx]);
      writer.writeUE(hrd.cpb_size_value_minus1[SchedSelIdx]);
      writer.writeBool(hrd.cbr_flag[SchedSelIdx]);
    }
    writer.writeNBit(hrd.initial_cpb_removal_delay_length_minus1, 5);
    writer.writeNBit(hrd.cpb_removal_delay_length_minus1, 5);
    writer.writeNBit(hrd.dpb_output_delay_length_minus1, 5);
    writer.writeNBit(hrd.time_offset_length, 5);
  }

  public write(out: StreamOutputBuffer) {
    let writer: CAVLCWriter = new CAVLCWriter(out);
    writer.writeNBit(this.profile_idc, 8);
    writer.writeBool(this.constraint_set_0_flag);
    writer.writeBool(this.constraint_set_1_flag);
    writer.writeBool(this.constraint_set_2_flag);
    writer.writeBool(this.constraint_set_3_flag);
    writer.writeBool(this.constraint_set_4_flag);
    writer.writeBool(this.constraint_set_5_flag);
    writer.writeNBit(0, 2);
    writer.writeNBit(this.level_idc, 8);
    writer.writeUE(this.seq_parameter_set_id);
    if (this.profile_idc === 100 || this.profile_idc === 110 || this.profile_idc === 122 || this.profile_idc === 144) {
      writer.writeUE(this.chroma_format_idc.getId());
      if (this.chroma_format_idc === ChromaFormat.YUV_444) {
        writer.writeBool(this.residual_color_transform_flag);
      }
      writer.writeUE(this.bit_depth_luma_minus8);
      writer.writeUE(this.bit_depth_chroma_minus8);
      writer.writeBool(this.qpprime_y_zero_transform_bypass_flag);
      writer.writeBool(this.scalingMatrix != null);
      if (this.scalingMatrix != null) {
        for (let i: number = 0; i < 8; i++) {
          if (i < 6) {
            writer.writeBool(this.scalingMatrix.ScalingList4x4[i] != null);
            if (this.scalingMatrix.ScalingList4x4[i] != null) {
              this.scalingMatrix.ScalingList4x4[i].write(writer);
            }
          } else {
            writer.writeBool(this.scalingMatrix.ScalingList8x8[i - 6] != null);
            if (this.scalingMatrix.ScalingList8x8[i - 6] != null) {
              this.scalingMatrix.ScalingList8x8[i - 6].write(writer);
            }
          }
        }
      }
    }
    writer.writeUE(this.log2_max_frame_num_minus4);
    writer.writeUE(this.pic_order_cnt_type);
    if (this.pic_order_cnt_type === 0) {
      writer.writeUE(this.log2_max_pic_order_cnt_lsb_minus4);
    } else if (this.pic_order_cnt_type === 1) {
      writer.writeBool(this.delta_pic_order_always_zero_flag);
      writer.writeSE(this.offset_for_non_ref_pic);
      writer.writeSE(this.offset_for_top_to_bottom_field);
      writer.writeUE(this.offsetForRefFrame.length);
      for (let i: number = 0; i < this.offsetForRefFrame.length; i++) {
        writer.writeSE(this.offsetForRefFrame[i]);
      }
    }
    writer.writeUE(this.num_ref_frames);
    writer.writeBool(this.gaps_in_frame_num_value_allowed_flag);
    writer.writeUE(this.pic_width_in_mbs_minus1);
    writer.writeUE(this.pic_height_in_map_units_minus1);
    writer.writeBool(this.frame_mbs_only_flag);
    if (!this.frame_mbs_only_flag) {
      writer.writeBool(this.mb_adaptive_frame_field_flag);
    }
    writer.writeBool(this.direct_8x8_inference_flag);
    writer.writeBool(this.frame_cropping_flag);
    if (this.frame_cropping_flag) {
      writer.writeUE(this.frame_crop_left_offset);
      writer.writeUE(this.frame_crop_right_offset);
      writer.writeUE(this.frame_crop_top_offset);
      writer.writeUE(this.frame_crop_bottom_offset);
    }
    writer.writeBool(this.vuiParams != null);
    if (this.vuiParams != null) SeqParameterSet.writeVUIParameters(this.vuiParams, writer);
    writer.writeTrailingBits();
  }

  public toString(): string {
    return `SeqParameterSet{ 
        pic_order_cnt_type=${this.pic_order_cnt_type}, 
        delta_pic_order_always_zero_flag=${this.delta_pic_order_always_zero_flag}, 
        mb_adaptive_frame_field_flag=${this.mb_adaptive_frame_field_flag}, 
        direct_8x8_inference_flag=${this.direct_8x8_inference_flag}, 
        chroma_format_idc=${this.chroma_format_idc}, 
        log2_max_frame_num_minus4=${this.log2_max_frame_num_minus4}, 
        log2_max_pic_order_cnt_lsb_minus4=${this.log2_max_pic_order_cnt_lsb_minus4}, 
        pic_height_in_map_units_minus1=${this.pic_height_in_map_units_minus1}, 
        pic_width_in_mbs_minus1=${this.pic_width_in_mbs_minus1}, 
        bit_depth_luma_minus8=${this.bit_depth_luma_minus8}, 
        bit_depth_chroma_minus8=${this.bit_depth_chroma_minus8}, 
        qpprime_y_zero_transform_bypass_flag=${this.qpprime_y_zero_transform_bypass_flag}, 
        profile_idc=${this.profile_idc}, 
        constraint_set_0_flag=${this.constraint_set_0_flag}, 
        constraint_set_1_flag=${this.constraint_set_1_flag}, 
        constraint_set_2_flag=${this.constraint_set_2_flag}, 
        constraint_set_3_flag=${this.constraint_set_3_flag}, 
        constraint_set_4_flag=${this.constraint_set_4_flag}, 
        constraint_set_5_flag=${this.constraint_set_5_flag}, 
        level_idc=${this.level_idc}, 
        seq_parameter_set_id=${this.seq_parameter_set_id}, 
        residual_color_transform_flag=${this.residual_color_transform_flag}, 
        offset_for_non_ref_pic=${this.offset_for_non_ref_pic}, 
        offset_for_top_to_bottom_field=${this.offset_for_top_to_bottom_field}, 
        num_ref_frames=${this.num_ref_frames}, 
        gaps_in_frame_num_value_allowed_flag=${this.gaps_in_frame_num_value_allowed_flag}, 
        frame_mbs_only_flag=${this.frame_mbs_only_flag}, 
        frame_cropping_flag=${this.frame_cropping_flag}, 
        frame_crop_left_offset=${this.frame_crop_left_offset}, 
        frame_crop_right_offset=${this.frame_crop_right_offset}, 
        frame_crop_top_offset=${this.frame_crop_top_offset}, 
        frame_crop_bottom_offset=${this.frame_crop_bottom_offset}, 
        offsetForRefFrame=${this.offsetForRefFrame}, 
        vuiParams=${this.vuiParams}, 
        scalingMatrix=${this.scalingMatrix}, 
        num_ref_frames_in_pic_order_cnt_cycle=${this.num_ref_frames_in_pic_order_cnt_cycle}}`;
  }

}
