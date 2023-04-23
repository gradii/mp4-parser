import { CAVLCReader } from '../../stream/CAVLCReader';
import { StreamInputBuffer } from '@gradii/stream-buffer';
import { VuiParameters } from './VuiParameters';

export class SequenceParameterSetRbsp {
  public vuiParameters: VuiParameters = null;
  public pic_width_in_luma_samples: number = 0;
  public pic_height_in_luma_samples: number = 0;
  public general_profile_space: number = 0;
  public general_tier_flag: boolean = false;
  public general_profile_idc: number = 0;
  public general_profile_compatibility_flags: number = 0;
  public general_constraint_indicator_flags: number = 0;
  public general_level_idc: number = 0;
  public chroma_format_idc: number = 0;
  public bit_depth_luma_minus8: number = 0;
  public bit_depth_chroma_minus8: number = 0;
  public sps_max_sub_layers_minus1: number = 0;
  public sps_temporal_id_nesting_flag: boolean = false;

  public constructor(is: StreamInputBuffer) {
    let bsr: CAVLCReader = new CAVLCReader(is);
    let sps_video_parameter_set_id: number = (<number>bsr.readNBit(4) | 0);
    this.sps_max_sub_layers_minus1 = (<number>bsr.readNBit(3) | 0);
    let sps_temporal_id_nesting_flag: boolean = bsr.readBool();
    this.profile_tier_level(this.sps_max_sub_layers_minus1, bsr);
    let sps_seq_parameter_set_id: number = bsr.readUE();
    this.chroma_format_idc = bsr.readUE();
    if (this.chroma_format_idc === 3) {
      let separate_colour_plane_flag: number = bsr.read1Bit();
    }
    this.pic_width_in_luma_samples = bsr.readUE();
    this.pic_height_in_luma_samples = bsr.readUE();
    let conformance_window_flag: boolean = bsr.readBool();
    if (conformance_window_flag) {
      let conf_win_left_offset: number = bsr.readUE();
      let conf_win_right_offset: number = bsr.readUE();
      let conf_win_top_offset: number = bsr.readUE();
      let conf_win_bottom_offset: number = bsr.readUE();
    }
    this.bit_depth_luma_minus8 = bsr.readUE();
    this.bit_depth_chroma_minus8 = bsr.readUE();
    let log2_max_pic_order_cnt_lsb_minus4: number = bsr.readUE();
    let sps_sub_layer_ordering_info_present_flag: boolean = bsr.readBool();
    let j: number = this.sps_max_sub_layers_minus1 - (sps_sub_layer_ordering_info_present_flag ? 0 : this.sps_max_sub_layers_minus1) + 1;
    let sps_max_dec_pic_buffering_minus1: number[] = new Array(j);
    let sps_max_num_reorder_pics: number[] = new Array(j);
    let sps_max_latency_increase_plus1: number[] = new Array(j);
    for (let i: number = (sps_sub_layer_ordering_info_present_flag ? 0 : this.sps_max_sub_layers_minus1); i <= this.sps_max_sub_layers_minus1; i++) {
      {
        sps_max_dec_pic_buffering_minus1[i] = bsr.readUE();
        sps_max_num_reorder_pics[i] = bsr.readUE();
        sps_max_latency_increase_plus1[i] = bsr.readUE();
      }
      ;
    }
    let log2_min_luma_coding_block_size_minus3: number = bsr.readUE();
    let log2_diff_max_min_luma_coding_block_size: number = bsr.readUE();
    let log2_min_transform_block_size_minus2: number = bsr.readUE();
    let log2_diff_max_min_transform_block_size: number = bsr.readUE();
    let max_transform_hierarchy_depth_inter: number = bsr.readUE();
    let max_transform_hierarchy_depth_intra: number = bsr.readUE();
    let scaling_list_enabled_flag: boolean = bsr.readBool();
    if (scaling_list_enabled_flag) {
      let sps_scaling_list_data_present_flag: boolean = bsr.readBool();
      if (sps_scaling_list_data_present_flag) {
        SequenceParameterSetRbsp.skip_scaling_list_data(bsr);
      }
    }
    let amp_enabled_flag: boolean = bsr.readBool();
    let sample_adaptive_offset_enabled_flag: boolean = bsr.readBool();
    let pcm_enabled_flag: boolean = bsr.readBool();
    if (pcm_enabled_flag) {
      let pcm_sample_bit_depth_luma_minus1: number = (<number>bsr.readNBit(4) | 0);
      let pcm_sample_bit_depth_chroma_minus1: number = (<number>bsr.readNBit(4) | 0);
      let log2_min_pcm_luma_coding_block_size_minus3: number = bsr.readUE();
      let log2_diff_max_min_pcm_luma_coding_block_size: number = bsr.readUE();
      let pcm_loop_filter_disabled_flag: boolean = bsr.readBool();
    }
    let num_short_term_ref_pic_sets: number = bsr.readUE();
    this.parse_short_term_ref_pic_sets(num_short_term_ref_pic_sets, bsr);
    let long_term_ref_pics_present_flag: boolean = bsr.readBool();
    if (long_term_ref_pics_present_flag) {
      let num_long_term_ref_pics_sps: number = bsr.readUE();
      let lt_ref_pic_poc_lsb_sps: number[] = new Array(num_long_term_ref_pics_sps);
      let used_by_curr_pic_lt_sps_flag: boolean[] = new Array(num_long_term_ref_pics_sps);
      for (let i: number = 0; i < num_long_term_ref_pics_sps; i++) {
        {
          lt_ref_pic_poc_lsb_sps[i] = bsr.readU(log2_max_pic_order_cnt_lsb_minus4 + 4);
          used_by_curr_pic_lt_sps_flag[i] = bsr.readBool();
        }
        ;
      }
    }
    let sps_temporal_mvp_enabled_flag: boolean = bsr.readBool();
    let strong_intra_smoothing_enabled_flag: boolean = bsr.readBool();
    let vui_parameters_present_flag: boolean = bsr.readBool();
    if (vui_parameters_present_flag) {
      this.vuiParameters = new VuiParameters(this.sps_max_sub_layers_minus1, bsr);
    }
  }

  /*private*/
  static skip_scaling_list_data(bsr: CAVLCReader) {
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 0; j < (i === 3 ? 2 : 6); j++) {

        if (bsr.readBool()) {
          bsr.readUE();
        } else {
          let coef_num: number = Math.min(64, (1 << (4 + (i << 1))));
          if (i > 1) {
            bsr.readUE();
          }
          for (let k: number = 0; k < coef_num; k++) {
            bsr.readUE();
          }
        }
      }
    }
  }

  /*private*/
  parse_short_term_ref_pic_sets(num_short_term_ref_pic_sets: number, bsr: CAVLCReader) {
    let num_delta_pocs: number[] = new Array(num_short_term_ref_pic_sets);
    for (let rpsIdx: number = 0; rpsIdx < num_short_term_ref_pic_sets; rpsIdx++) {

      if (rpsIdx !== 0 && bsr.readBool()) {
        bsr.readBool();
        bsr.readUE();
        num_delta_pocs[rpsIdx] = 0;
        for (let i: number = 0; i <= num_delta_pocs[rpsIdx - 1]; i++) {
          let use_delta_flag: boolean = false;
          let used_by_curr_pic_flag: boolean = bsr.readBool();
          if (!used_by_curr_pic_flag) {
            use_delta_flag = bsr.readBool();
          }
          if (used_by_curr_pic_flag || use_delta_flag) {
            num_delta_pocs[rpsIdx]++;
          }
        }
      } else {
        let delta_pocs: number = bsr.readUE() + bsr.readUE();
        num_delta_pocs[rpsIdx] = delta_pocs;
        for (let i: number = 0; i < delta_pocs; ++i) {

          bsr.readUE();
          bsr.readBool();
        }
      }
    }
  }

  /*private*/
  profile_tier_level(maxNumSubLayersMinus1: number, bsr: CAVLCReader) {
    this.general_profile_space = bsr.readU(2);
    this.general_tier_flag = bsr.readBool();
    this.general_profile_idc = bsr.readU(5);
    this.general_profile_compatibility_flags = bsr.readNBit(32);
    this.general_constraint_indicator_flags = bsr.readNBit(48);
    this.general_level_idc = (<number>bsr.readByte() | 0);
    let sub_layer_profile_present_flag: boolean[] = new Array(maxNumSubLayersMinus1);
    let sub_layer_level_present_flag: boolean[] = new Array(maxNumSubLayersMinus1);
    for (let i: number = 0; i < maxNumSubLayersMinus1; i++) {
      sub_layer_profile_present_flag[i] = bsr.readBool();
      sub_layer_level_present_flag[i] = bsr.readBool();
    }
    if (maxNumSubLayersMinus1 > 0) {
      let reserved_zero_2bits: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
      for (let i: number = maxNumSubLayersMinus1; i < 8; i++) {
        reserved_zero_2bits[i] = bsr.readU(2);
      }
    }
    let sub_layer_profile_space: number[] = new Array(maxNumSubLayersMinus1);
    let sub_layer_tier_flag: boolean[] = new Array(maxNumSubLayersMinus1);
    let sub_layer_profile_idc: number[] = new Array(maxNumSubLayersMinus1);
    let sub_layer_profile_compatibility_flag: boolean[][] = <any>(function (dims) {
      let allocate = function (dims) {
        if (dims.length == 0) {
          return false;
        } else {
          let array = [];
          for (let i = 0; i < dims[0]; i++) {
            array.push(allocate(dims.slice(1)));
          }
          return array;
        }
      };
      return allocate(dims);
    })([maxNumSubLayersMinus1, 32]);
    let sub_layer_progressive_source_flag: boolean[] = new Array(maxNumSubLayersMinus1);
    let sub_layer_interlaced_source_flag: boolean[] = new Array(maxNumSubLayersMinus1);
    let sub_layer_non_packed_constraint_flag: boolean[] = new Array(maxNumSubLayersMinus1);
    let sub_layer_frame_only_constraint_flag: boolean[] = new Array(maxNumSubLayersMinus1);
    let sub_layer_reserved_zero_44bits: number[] = new Array(maxNumSubLayersMinus1);
    let sub_layer_level_idc: number[] = new Array(maxNumSubLayersMinus1);
    for (let i: number = 0; i < maxNumSubLayersMinus1; i++) {
      if (sub_layer_profile_present_flag[i]) {
        sub_layer_profile_space[i] = bsr.readU(2);
        sub_layer_tier_flag[i] = bsr.readBool();
        sub_layer_profile_idc[i] = bsr.readU(5);
        for (let j: number = 0; j < 32; j++) {

          sub_layer_profile_compatibility_flag[i][j] = bsr.readBool();
        }
        sub_layer_progressive_source_flag[i] = bsr.readBool();
        sub_layer_interlaced_source_flag[i] = bsr.readBool();
        sub_layer_non_packed_constraint_flag[i] = bsr.readBool();
        sub_layer_frame_only_constraint_flag[i] = bsr.readBool();
        sub_layer_reserved_zero_44bits[i] = bsr.readNBit(44);
      }
      if (sub_layer_level_present_flag[i]) {
        sub_layer_level_idc[i] = bsr.readU(8);
      }
    }
  }
}

