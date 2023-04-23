export class HRDParameters {
  public cpb_cnt_minus1: number = 0;
  public bit_rate_scale: number = 0;
  public cpb_size_scale: number = 0;
  public bit_rate_value_minus1: number[];
  public cpb_size_value_minus1: number[];
  public cbr_flag: boolean[];
  public initial_cpb_removal_delay_length_minus1: number = 0;
  public cpb_removal_delay_length_minus1: number = 0;
  public dpb_output_delay_length_minus1: number = 0;
  public time_offset_length: number = 0;

  constructor({
    cpb_cnt_minus1 = 0,
    bit_rate_scale = 0,
    cpb_size_scale = 0,
    bit_rate_value_minus1,
    cpb_size_value_minus1,
    cbr_flag,
    initial_cpb_removal_delay_length_minus1 = 0,
    cpb_removal_delay_length_minus1 = 0,
    dpb_output_delay_length_minus1 = 0,
    time_offset_length = 0
  }: {
    cpb_cnt_minus1?: number
    bit_rate_scale?: number
    cpb_size_scale?: number
    bit_rate_value_minus1?: number[]
    cpb_size_value_minus1?: number[]
    cbr_flag?: boolean[]
    initial_cpb_removal_delay_length_minus1?: number
    cpb_removal_delay_length_minus1?: number
    dpb_output_delay_length_minus1?: number
    time_offset_length?: number
  } = {}) {
    this.cpb_cnt_minus1 = cpb_cnt_minus1;
    this.bit_rate_scale = bit_rate_scale;
    this.cpb_size_scale = cpb_size_scale;
    this.bit_rate_value_minus1 = bit_rate_value_minus1;
    this.cpb_size_value_minus1 = cpb_size_value_minus1;
    this.cbr_flag = cbr_flag;
    this.initial_cpb_removal_delay_length_minus1 = initial_cpb_removal_delay_length_minus1;
    this.cpb_removal_delay_length_minus1 = cpb_removal_delay_length_minus1;
    this.dpb_output_delay_length_minus1 = dpb_output_delay_length_minus1;
    this.time_offset_length = time_offset_length;

  }


  public toString(): string {
    return `HRDParameters{
    cpb_cnt_minus1=${this.cpb_cnt_minus1}, 
    bit_rate_scale=${this.bit_rate_scale}, 
    cpb_size_scale=${this.cpb_size_scale}, 
    bit_rate_value_minus1=${this.bit_rate_value_minus1},
    cpb_size_value_minus1=${this.cpb_size_value_minus1}, 
    cbr_flag=${this.cbr_flag}, 
    initial_cpb_removal_delay_length_minus1=${this.initial_cpb_removal_delay_length_minus1}, 
    cpb_removal_delay_length_minus1=${this.cpb_removal_delay_length_minus1}, 
    dpb_output_delay_length_minus1=${this.dpb_output_delay_length_minus1}, 
    time_offset_length=${this.time_offset_length}}`;
  }
}
