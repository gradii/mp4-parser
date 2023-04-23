import { CAVLCReader } from '../../stream/CAVLCReader';
import { StreamInputBuffer } from '@gradii/stream-buffer';

export class VideoParameterSet {
  vps: Buffer;
  vps_parameter_set_id: number;

  public constructor(vps: Buffer) {
    if (this.vps === undefined) this.vps = null;
    if (this.vps_parameter_set_id === undefined) this.vps_parameter_set_id = 0;
    this.vps = vps;
    let r: CAVLCReader = new CAVLCReader(new StreamInputBuffer(vps));
    this.vps_parameter_set_id = r.readU(4);
    let vps_reserved_three_2bits: number = r.readU(2);
    let vps_max_layers_minus1: number = r.readU(6);
    let vps_max_sub_layers_minus1: number = r.readU(3);
    let vps_temporal_id_nesting_flag: boolean = r.readBool();
    let vps_reserved_0xffff_16bits: number = r.readU(16);
    this.profile_tier_level(vps_max_sub_layers_minus1, r);
    let vps_sub_layer_ordering_info_present_flag: boolean = r.readBool();
    let vps_max_dec_pic_buffering_minus1: number[] = new Array(vps_sub_layer_ordering_info_present_flag ? 1 : vps_max_sub_layers_minus1 + 1);
    let vps_max_num_reorder_pics: number[] = new Array(vps_sub_layer_ordering_info_present_flag ? 1 : vps_max_sub_layers_minus1 + 1);
    let vps_max_latency_increase_plus1: number[] = new Array(vps_sub_layer_ordering_info_present_flag ? 1 : vps_max_sub_layers_minus1 + 1);
    for (let i: number = (vps_sub_layer_ordering_info_present_flag ? 0 : vps_max_sub_layers_minus1); i <= vps_max_sub_layers_minus1; i++) {
      {
        vps_max_dec_pic_buffering_minus1[i] = r.readUE();
        vps_max_num_reorder_pics[i] = r.readUE();
        vps_max_latency_increase_plus1[i] = r.readUE();
      }
      ;
    }
    let vps_max_layer_id: number = r.readU(6);
    let vps_num_layer_sets_minus1: number = r.readUE();
    let layer_id_included_flag: boolean[][] = <any>(function (dims) {
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
    })([vps_num_layer_sets_minus1, vps_max_layer_id]);
    for (let i: number = 1; i <= vps_num_layer_sets_minus1; i++) {
      for (let j: number = 0; j <= vps_max_layer_id; j++) {
        layer_id_included_flag[i][j] = r.readBool();
      }
    }
    let vps_timing_info_present_flag: boolean = r.readBool();
    if (vps_timing_info_present_flag) {
      let vps_num_units_in_tick: number = r.readU(32);
      let vps_time_scale: number = r.readU(32);
      let vps_poc_proportional_to_timing_flag: boolean = r.readBool();
      if (vps_poc_proportional_to_timing_flag) {
        let vps_num_ticks_poc_diff_one_minus1: number = r.readUE();
      }
      let vps_num_hrd_parameters: number = r.readUE();
      let hrd_layer_set_idx: number[] = new Array(vps_num_hrd_parameters);
      let cprms_present_flag: boolean[] = new Array(vps_num_hrd_parameters);
      for (let i: number = 0; i < vps_num_hrd_parameters; i++) {
        hrd_layer_set_idx[i] = r.readUE();
        if (i > 0) {
          cprms_present_flag[i] = r.readBool();
        } else {
          cprms_present_flag[0] = true;
        }
        this.hrd_parameters(cprms_present_flag[i], vps_max_sub_layers_minus1, r);
      }
    }
    let vps_extension_flag: boolean = r.readBool();
    if (vps_extension_flag) {
      while ((r.moreRBSPData())) {
        let vps_extension_data_flag: boolean = r.readBool();
      }
    }
    r.readTrailingBits();
  }

  public profile_tier_level(maxNumSubLayersMinus1: number, r: CAVLCReader) {
    let general_profile_space: number = r.readU(2);
    let general_tier_flag: boolean = r.readBool();
    let general_profile_idc: number = r.readU(5);
    let general_profile_compatibility_flag: boolean[] = new Array(32);
    for (let j: number = 0; j < 32; j++) {
      general_profile_compatibility_flag[j] = r.readBool();
    }
    let general_progressive_source_flag: boolean = r.readBool();
    let general_interlaced_source_flag: boolean = r.readBool();
    let general_non_packed_constraint_flag: boolean = r.readBool();
    let general_frame_only_constraint_flag: boolean = r.readBool();
    let general_reserved_zero_44bits: number = r.readU(44);
    let general_level_idc: number = r.readU(8);
    let sub_layer_profile_present_flag: boolean[] = new Array(maxNumSubLayersMinus1);
    let sub_layer_level_present_flag: boolean[] = new Array(maxNumSubLayersMinus1);
    for (let i: number = 0; i < maxNumSubLayersMinus1; i++) {
      sub_layer_profile_present_flag[i] = r.readBool();
      sub_layer_level_present_flag[i] = r.readBool();
    }
    if (maxNumSubLayersMinus1 > 0) {
      for (let i: number = maxNumSubLayersMinus1; i < 8; i++) {
        r.readU(2);
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
    let sub_layer_level_idc: number[] = new Array(maxNumSubLayersMinus1);
    for (let i: number = 0; i < maxNumSubLayersMinus1; i++) {
      if (sub_layer_profile_present_flag[i]) {
        sub_layer_profile_space[i] = r.readU(2);
        sub_layer_tier_flag[i] = r.readBool();
        sub_layer_profile_idc[i] = r.readU(5);
        for (let j: number = 0; j < 32; j++) {
          sub_layer_profile_compatibility_flag[i][j] = r.readBool();
        }
        sub_layer_progressive_source_flag[i] = r.readBool();
        sub_layer_interlaced_source_flag[i] = r.readBool();
        sub_layer_non_packed_constraint_flag[i] = r.readBool();
        sub_layer_frame_only_constraint_flag[i] = r.readBool();
        r.readNBit(44);
      }
      if (sub_layer_level_present_flag[i]) sub_layer_level_idc[i] = r.readU(8);
    }
  }

  /*private*/
  hrd_parameters(commonInfPresentFlag: boolean, maxNumSubLayersMinus1: number, r: CAVLCReader) {
    let nal_hrd_parameters_present_flag: boolean = false;
    let vcl_hrd_parameters_present_flag: boolean = false;
    let sub_pic_hrd_params_present_flag: boolean = false;
    if (commonInfPresentFlag) {
      nal_hrd_parameters_present_flag = r.readBool();
      vcl_hrd_parameters_present_flag = r.readBool();
      if (nal_hrd_parameters_present_flag || vcl_hrd_parameters_present_flag) {
        sub_pic_hrd_params_present_flag = r.readBool();
        if (sub_pic_hrd_params_present_flag) {
          let tick_divisor_minus2: number = r.readU(8);
          let du_cpb_removal_delay_increment_length_minus1: number = r.readU(5);
          let sub_pic_cpb_params_in_pic_timing_sei_flag: boolean = r.readBool();
          let dpb_output_delay_du_length_minus1: number = r.readU(5);
        }
        let bit_rate_scale: number = r.readU(4);
        let cpb_size_scale: number = r.readU(4);
        if (sub_pic_hrd_params_present_flag) {
          let cpb_size_du_scale: number = r.readU(4);
        }
        let initial_cpb_removal_delay_length_minus1: number = r.readU(5);
        let au_cpb_removal_delay_length_minus1: number = r.readU(5);
        let dpb_output_delay_length_minus1: number = r.readU(5);
      }
    }
    let fixed_pic_rate_general_flag: boolean[] = new Array(maxNumSubLayersMinus1);
    let fixed_pic_rate_within_cvs_flag: boolean[] = new Array(maxNumSubLayersMinus1);
    let low_delay_hrd_flag: boolean[] = new Array(maxNumSubLayersMinus1);
    let cpb_cnt_minus1: number[] = new Array(maxNumSubLayersMinus1);
    let elemental_duration_in_tc_minus1: number[] = new Array(maxNumSubLayersMinus1);
    for (let i: number = 0; i <= maxNumSubLayersMinus1; i++) {
      fixed_pic_rate_general_flag[i] = r.readBool();
      if (!fixed_pic_rate_general_flag[i]) {
        fixed_pic_rate_within_cvs_flag[i] = r.readBool();
      }
      if (fixed_pic_rate_within_cvs_flag[i]) {
        elemental_duration_in_tc_minus1[i] = r.readUE();
      } else {
        low_delay_hrd_flag[i] = r.readBool();
      }
      if (!low_delay_hrd_flag[i]) {
        cpb_cnt_minus1[i] = r.readUE();
      }
      if (nal_hrd_parameters_present_flag) {
        this.sub_layer_hrd_parameters(i, cpb_cnt_minus1[i], sub_pic_hrd_params_present_flag, r);
      }
      if (vcl_hrd_parameters_present_flag) {
        this.sub_layer_hrd_parameters(i, cpb_cnt_minus1[i], sub_pic_hrd_params_present_flag, r);
      }
    }
  }

  sub_layer_hrd_parameters(subLayerId: number, cpbCnt: number, sub_pic_hrd_params_present_flag: boolean, r: CAVLCReader) {
    let bit_rate_value_minus1: number[] = new Array(cpbCnt);
    let cpb_size_value_minus1: number[] = new Array(cpbCnt);
    let cpb_size_du_value_minus1: number[] = new Array(cpbCnt);
    let bit_rate_du_value_minus1: number[] = new Array(cpbCnt);
    let cbr_flag: boolean[] = new Array(cpbCnt);
    for (let i: number = 0; i <= cpbCnt; i++) {
      bit_rate_value_minus1[i] = r.readUE();
      cpb_size_value_minus1[i] = r.readUE();
      if (sub_pic_hrd_params_present_flag) {
        cpb_size_du_value_minus1[i] = r.readUE();
        bit_rate_du_value_minus1[i] = r.readUE();
      }
      cbr_flag[i] = r.readBool();
    }
  }

  public toByteBuffer(): Buffer {
    return this.vps;
  }
}
