import { CAVLCReader } from '../../stream/CAVLCReader';
import { SubLayerHrdParameters } from './SubLayerHrdParameters';

export class HrdParameters {
  public constructor(commonInfPresentFlag: boolean, maxNumSubLayersMinus1: number, bsr: CAVLCReader) {
    let nal_hrd_parameters_present_flag: boolean = false;
    let vcl_hrd_parameters_present_flag: boolean = false;
    let sub_pic_hrd_params_present_flag: boolean = false;
    if (commonInfPresentFlag) {
      nal_hrd_parameters_present_flag = bsr.readBool();
      vcl_hrd_parameters_present_flag = bsr.readBool();
      if (nal_hrd_parameters_present_flag || vcl_hrd_parameters_present_flag) {
        sub_pic_hrd_params_present_flag = bsr.readBool();
        if (sub_pic_hrd_params_present_flag) {
          let tick_divisor_minus2: number = bsr.readU(8);
          let du_cpb_removal_delay_increment_length_minus1: number = bsr.readU(5);
          let sub_pic_cpb_params_in_pic_timing_sei_flag: boolean = bsr.readBool();
          let dpb_output_delay_du_length_minus1: number = bsr.readU(5);
        }
        let bit_rate_scale: number = bsr.readU(4);
        let cpb_size_scale: number = bsr.readU(4);
        if (sub_pic_hrd_params_present_flag) {
          let cpb_size_du_scale: number = bsr.readU(4);
        }
        let initial_cpb_removal_delay_length_minus1: number = bsr.readU(5);
        let au_cpb_removal_delay_length_minus1: number = bsr.readU(5);
        let dpb_output_delay_length_minus1: number = bsr.readU(5);
      }
    }
    let fixed_pic_rate_general_flag: boolean[] = new Array(maxNumSubLayersMinus1 + 1);
    let fixed_pic_rate_within_cvs_flag: boolean[] = new Array(maxNumSubLayersMinus1 + 1);
    let elemental_duration_in_tc_minus1: number[] = new Array(maxNumSubLayersMinus1 + 1);
    let low_delay_hrd_flag: boolean[] = new Array(maxNumSubLayersMinus1 + 1);
    let cpb_cnt_minus1: number[] = new Array(maxNumSubLayersMinus1 + 1);
    for (let i: number = 0; i <= maxNumSubLayersMinus1; i++) {
      fixed_pic_rate_general_flag[i] = bsr.readBool();
      if (!fixed_pic_rate_general_flag[i]) {
        fixed_pic_rate_within_cvs_flag[i] = bsr.readBool();
      }
      if (fixed_pic_rate_within_cvs_flag[i]) {
        elemental_duration_in_tc_minus1[i] = bsr.readUE();
      } else {
        low_delay_hrd_flag[i] = bsr.readBool();
      }
      if (!low_delay_hrd_flag[i]) {
        cpb_cnt_minus1[i] = bsr.readUE();
      }
      if (nal_hrd_parameters_present_flag) {
        new SubLayerHrdParameters(i, cpb_cnt_minus1, sub_pic_hrd_params_present_flag, bsr);
      }
      if (vcl_hrd_parameters_present_flag) {
        new SubLayerHrdParameters(i, cpb_cnt_minus1, sub_pic_hrd_params_present_flag, bsr);
      }
    }
  }
}

