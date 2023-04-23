import { HRDParameters } from './HRDParameters';

export class VUIParameters {
  public aspect_ratio_info_present_flag: boolean = false;
  public aspect_ratio_idc: number = 0xff;
  public sar_width: number = 0;
  public sar_height: number = 0;

  public overscan_info_present_flag: boolean = false;
  public overscan_appropriate_flag: boolean = false;

  public video_signal_type_present_flag: boolean = false;
  public video_format: number = 0;
  public video_full_range_flag: boolean = false;
  // -->
  public colour_description_present_flag: boolean = false;
  public colour_primaries: number = 0;
  public transfer_characteristics: number = 0;
  public matrix_coefficients: number = 0;

  public chroma_loc_info_present_flag: boolean = false;
  public chroma_sample_loc_type_top_field: number = 0;
  public chroma_sample_loc_type_bottom_field: number = 0;

  public timing_info_present_flag: boolean = false;
  public num_units_in_tick: number = 0;
  public time_scale: number = 0;
  public fixed_frame_rate_flag: boolean = false;

  public nalHRDParams: HRDParameters = null;

  public vclHRDParams: HRDParameters = null;
  public low_delay_hrd_flag: boolean = false;

  public pic_struct_present_flag: boolean = false;
  public bitstreamRestriction: BitstreamRestriction = null;

  constructor({
    aspect_ratio_info_present_flag = false,
    aspect_ratio_idc = 0xff,
    sar_width = 0,
    sar_height = 0,
    overscan_info_present_flag = false,
    overscan_appropriate_flag = false,
    video_signal_type_present_flag = false,
    video_format = 0,
    video_full_range_flag = false,
    colour_description_present_flag = false,
    colour_primaries = 0,
    transfer_characteristics = 0,
    matrix_coefficients = 0,
    chroma_loc_info_present_flag = false,
    chroma_sample_loc_type_top_field = 0,
    chroma_sample_loc_type_bottom_field = 0,
    timing_info_present_flag = false,
    num_units_in_tick = 0,
    time_scale = 0,
    fixed_frame_rate_flag = false,
    low_delay_hrd_flag = false,
    pic_struct_present_flag = false,
    nalHRDParams = null,
    vclHRDParams = null,
    bitstreamRestriction = null
  }: {
    aspect_ratio_info_present_flag?: boolean
    aspect_ratio_idc?: number
    sar_width?: number
    sar_height?: number
    overscan_info_present_flag?: boolean
    overscan_appropriate_flag?: boolean
    video_signal_type_present_flag?: boolean
    video_format?: number
    video_full_range_flag?: boolean
    colour_description_present_flag?: boolean
    colour_primaries?: number
    transfer_characteristics?: number
    matrix_coefficients?: number
    chroma_loc_info_present_flag?: boolean
    chroma_sample_loc_type_top_field?: number
    chroma_sample_loc_type_bottom_field?: number
    timing_info_present_flag?: boolean
    num_units_in_tick?: number
    time_scale?: number
    fixed_frame_rate_flag?: boolean
    low_delay_hrd_flag?: boolean
    pic_struct_present_flag?: boolean
    nalHRDParams?: HRDParameters
    vclHRDParams?: HRDParameters
    bitstreamRestriction?: BitstreamRestriction
  } = {}) {
    this.aspect_ratio_info_present_flag = aspect_ratio_info_present_flag;
    this.sar_width = sar_width;
    this.sar_height = sar_height;
    this.overscan_info_present_flag = overscan_info_present_flag;
    this.overscan_appropriate_flag = overscan_appropriate_flag;
    this.video_signal_type_present_flag = video_signal_type_present_flag;
    this.video_format = video_format;
    this.video_full_range_flag = video_full_range_flag;
    this.colour_description_present_flag = colour_description_present_flag;
    this.colour_primaries = colour_primaries;
    this.transfer_characteristics = transfer_characteristics;
    this.matrix_coefficients = matrix_coefficients;
    this.chroma_loc_info_present_flag = chroma_loc_info_present_flag;
    this.chroma_sample_loc_type_top_field = chroma_sample_loc_type_top_field;
    this.chroma_sample_loc_type_bottom_field = chroma_sample_loc_type_bottom_field;
    this.timing_info_present_flag = timing_info_present_flag;
    this.num_units_in_tick = num_units_in_tick;
    this.time_scale = time_scale;
    this.fixed_frame_rate_flag = fixed_frame_rate_flag;
    this.low_delay_hrd_flag = low_delay_hrd_flag;
    this.pic_struct_present_flag = pic_struct_present_flag;
    this.nalHRDParams = nalHRDParams;
    this.vclHRDParams = vclHRDParams;
    this.bitstreamRestriction = bitstreamRestriction;
    this.aspect_ratio_idc = aspect_ratio_idc;
  }

  /**
   *
   * @return {string}
   */
  public toString(): string {
    return `VUIParameters{
      aspect_ratio_info_present_flag=${this.aspect_ratio_info_present_flag}, 
      sar_width=${this.sar_width}, 
      sar_height=${this.sar_height}, 
      overscan_info_present_flag=${this.overscan_info_present_flag}, 
      overscan_appropriate_flag=${this.overscan_appropriate_flag}, 
      video_signal_type_present_flag=${this.video_signal_type_present_flag}, 
      video_format=${this.video_format}, 
      video_full_range_flag=${this.video_full_range_flag}, 
      colour_description_present_flag=${this.colour_description_present_flag}, 
      colour_primaries=${this.colour_primaries}, 
      transfer_characteristics=${this.transfer_characteristics}, 
      matrix_coefficients=${this.matrix_coefficients}, 
      chroma_loc_info_present_flag=${this.chroma_loc_info_present_flag}, 
      chroma_sample_loc_type_top_field=${this.chroma_sample_loc_type_top_field}, 
      chroma_sample_loc_type_bottom_field=${this.chroma_sample_loc_type_bottom_field}, 
      timing_info_present_flag=${this.timing_info_present_flag}, 
      num_units_in_tick=${this.num_units_in_tick}, 
      time_scale=${this.time_scale}, 
      fixed_frame_rate_flag=${this.fixed_frame_rate_flag}, 
      low_delay_hrd_flag=${this.low_delay_hrd_flag}, 
      pic_struct_present_flag=${this.pic_struct_present_flag}, 
      nalHRDParams=${this.nalHRDParams}, 
      vclHRDParams=${this.vclHRDParams}, 
      bitstreamRestriction=${this.bitstreamRestriction}, 
      aspect_ratio=${this.aspect_ratio_idc}}`;
  }
}

export class BitstreamRestriction {
  public motion_vectors_over_pic_boundaries_flag: boolean;
  public max_bytes_per_pic_denom: number;
  public max_bits_per_mb_denom: number;
  public log2_max_mv_length_horizontal: number;
  public log2_max_mv_length_vertical: number;
  public max_num_reorder_frames: number;
  public max_dec_frame_buffering: number;

  constructor(
    {
      motion_vectors_over_pic_boundaries_flag = false,
      max_bytes_per_pic_denom = 0,
      max_bits_per_mb_denom = 0,
      log2_max_mv_length_horizontal = 0,
      log2_max_mv_length_vertical = 0,
      max_num_reorder_frames = 0,
      max_dec_frame_buffering = 0
    }: {
      motion_vectors_over_pic_boundaries_flag?: boolean
      max_bytes_per_pic_denom?: number
      max_bits_per_mb_denom?: number
      log2_max_mv_length_horizontal?: number
      log2_max_mv_length_vertical?: number
      max_num_reorder_frames?: number
      max_dec_frame_buffering?: number
    } = {}
  ) {
    this.motion_vectors_over_pic_boundaries_flag = motion_vectors_over_pic_boundaries_flag;
    this.max_bytes_per_pic_denom = max_bytes_per_pic_denom;
    this.max_bits_per_mb_denom = max_bits_per_mb_denom;
    this.log2_max_mv_length_horizontal = log2_max_mv_length_horizontal;
    this.log2_max_mv_length_vertical = log2_max_mv_length_vertical;
    this.max_num_reorder_frames = max_num_reorder_frames;
    this.max_dec_frame_buffering = max_dec_frame_buffering;
  }

  /**
   *
   * @return {string}
   */
  public toString(): string {
    return `BitstreamRestriction{
      motion_vectors_over_pic_boundaries_flag=${this.motion_vectors_over_pic_boundaries_flag}, 
      max_bytes_per_pic_denom=${this.max_bytes_per_pic_denom}, 
      max_bits_per_mb_denom=${this.max_bits_per_mb_denom}, 
      log2_max_mv_length_horizontal=${this.log2_max_mv_length_horizontal}, 
      log2_max_mv_length_vertical=${this.log2_max_mv_length_vertical}, 
      max_num_reorder_frames=${this.max_num_reorder_frames}, 
      max_dec_frame_buffering=${this.max_dec_frame_buffering}
    }`;
  }
}


