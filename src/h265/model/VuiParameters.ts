import { CAVLCReader } from '../../stream/CAVLCReader';
import { HrdParameters } from './HrdParameters';

export class VuiParameters {
  static EXTENDED_SAR: number = 255;
  public aspect_ratio_info_present_flag: boolean = false;
  public aspect_ratio_idc: number = 0;
  public sar_width: number = 0;
  public sar_height: number = 0;
  public video_signal_type_present_flag: boolean = false;
  public video_format: number = 0;
  public video_full_range_flag: boolean = false;
  public colour_description_present_flag: boolean = false;
  public colour_primaries: number = 0;
  public transfer_characteristics: number = 0;
  public matrix_coeffs: number = 0;
  public vui_timing_info_present_flag: boolean = false;
  public vui_num_units_in_tick: number = 0;
  public vui_time_scale: number = 0;
  public min_spatial_segmentation_idc: number = 0;

  public constructor(sps_max_sub_layers_minus1: number, bsr: CAVLCReader) {
    this.aspect_ratio_info_present_flag = bsr.readBool();
    if (this.aspect_ratio_info_present_flag) {
      this.aspect_ratio_idc = bsr.readU(8);
      if (this.aspect_ratio_idc === VuiParameters.EXTENDED_SAR) {
        this.sar_width = bsr.readU(16);
        this.sar_height = bsr.readU(16);
      }
    }
    let overscan_info_present_flag: boolean = bsr.readBool();
    if (overscan_info_present_flag) {
      let overscan_appropriate_flag: boolean = bsr.readBool();
    }
    this.video_signal_type_present_flag = bsr.readBool();
    if (this.video_signal_type_present_flag) {
      this.video_format = bsr.readU(3);
      this.video_full_range_flag = bsr.readBool();
      this.colour_description_present_flag = bsr.readBool();
      if (this.colour_description_present_flag) {
        this.colour_primaries = bsr.readU(8);
        this.transfer_characteristics = bsr.readU(8);
        this.matrix_coeffs = bsr.readU(8);
      }
    }
    let chroma_loc_info_present_flag: boolean = bsr.readBool();
    if (chroma_loc_info_present_flag) {
      let chroma_sample_loc_type_top_field: number = bsr.readUE();
      let chroma_sample_loc_type_bottom_field: number = bsr.readUE();
    }
    let neutral_chroma_indication_flag: boolean = bsr.readBool();
    let field_seq_flag: boolean = bsr.readBool();
    let frame_field_info_present_flag: boolean = bsr.readBool();
    let default_display_window_flag: boolean = bsr.readBool();
    if (default_display_window_flag) {
      let def_disp_win_left_offset: number = bsr.readUE();
      let def_disp_win_right_offset: number = bsr.readUE();
      let def_disp_win_top_offset: number = bsr.readUE();
      let def_disp_win_bottom_offset: number = bsr.readUE();
    }
    this.vui_timing_info_present_flag = bsr.readBool();
    if (this.vui_timing_info_present_flag) {
      this.vui_num_units_in_tick = bsr.readNBit(32);
      this.vui_time_scale = bsr.readNBit(32);
      let vui_poc_proportional_to_timing_flag: boolean = bsr.readBool();
      if (vui_poc_proportional_to_timing_flag) {
        let vui_num_ticks_poc_diff_one_minus1: number = bsr.readUE();
      }
      let vui_hrd_parameters_present_flag: boolean = bsr.readBool();
      if (vui_hrd_parameters_present_flag) {
        new HrdParameters(true, sps_max_sub_layers_minus1, bsr);
      }
    }
    let bitstream_restriction_flag: boolean = bsr.readBool();
    if (bitstream_restriction_flag) {
      let tiles_fixed_structure_flag: boolean = bsr.readBool();
      let motion_vectors_over_pic_boundaries_flag: boolean = bsr.readBool();
      let restricted_ref_pic_lists_flag: boolean = bsr.readBool();
      this.min_spatial_segmentation_idc = bsr.readUE();
      let max_bytes_per_pic_denom: number = bsr.readUE();
      let max_bits_per_min_cu_denom: number = bsr.readUE();
      let log2_max_mv_length_horizontal: number = bsr.readUE();
      let log2_max_mv_length_vertical: number = bsr.readUE();
    }
  }
}
