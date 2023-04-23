import { SeqParameterSet } from './SeqParameterSet';
import { PictureParameterSet } from './PictureParameterSet';
import { StreamInputBuffer } from '@gradii/stream-buffer';
import { CAVLCReader } from '../../stream/CAVLCReader';

export enum SliceType {
  P,
  B,
  I,
  SP,
  SI
}

export class SliceHeader {
  public first_mb_in_slice: number = 0;
  public slice_type: SliceType;
  public pic_parameter_set_id: number = 0;
  public colour_plane_id: number = 0;
  public frame_num: number = 0;
  public field_pic_flag: boolean = false;
  public bottom_field_flag: boolean = false;
  public idr_pic_id: number = 0;
  public pic_order_cnt_lsb: number = 0;
  public delta_pic_order_cnt_bottom: number = 0;
  public delta_pic_order_cnt_0: number = 0;
  public delta_pic_order_cnt_1: number = 0;
  public pps: PictureParameterSet;
  public sps: SeqParameterSet;

  public read(
    is: StreamInputBuffer,
    spss: Map<number, SeqParameterSet>,
    ppss: Map<number, PictureParameterSet>,
    IdrPicFlag: boolean) {
    const sliceHeader = new SliceHeader();

    let reader: CAVLCReader = new CAVLCReader(is);
    sliceHeader.first_mb_in_slice = reader.readUE();
    let sliceTypeInt: number = reader.readUE();
    switch ((sliceTypeInt)) {
      case 0:
      case 5:
        sliceHeader.slice_type = SliceType.P;
        break;
      case 1:
      case 6:
        sliceHeader.slice_type = SliceType.B;
        break;
      case 2:
      case 7:
        sliceHeader.slice_type = SliceType.I;
        break;
      case 3:
      case 8:
        sliceHeader.slice_type = SliceType.SP;
        break;
      case 4:
      case 9:
        sliceHeader.slice_type = SliceType.SI;
        break;
    }
    sliceHeader.pic_parameter_set_id = reader.readUE();
    sliceHeader.pps = ppss.get(sliceHeader.pic_parameter_set_id);
    if (sliceHeader.pps == null) {
      let ids: string = '';
      ids = Array.from(spss.keys()).join(', ');
      throw new Error(`PPS with ids ${ids} available but not ${sliceHeader.pic_parameter_set_id}`);
    }
    sliceHeader.sps = spss.get(sliceHeader.pps.seq_parameter_set_id);
    if (sliceHeader.sps.residual_color_transform_flag) {
      sliceHeader.colour_plane_id = reader.readU(2);
    }
    sliceHeader.frame_num = reader.readU(sliceHeader.sps.log2_max_frame_num_minus4 + 4);
    if (!sliceHeader.sps.frame_mbs_only_flag) {
      sliceHeader.field_pic_flag = reader.readBool();
      if (sliceHeader.field_pic_flag) {
        sliceHeader.bottom_field_flag = reader.readBool();
      }
    }
    if (IdrPicFlag) {
      sliceHeader.idr_pic_id = reader.readUE();
    }
    if (sliceHeader.sps.pic_order_cnt_type === 0) {
      sliceHeader.pic_order_cnt_lsb = reader.readU(sliceHeader.sps.log2_max_pic_order_cnt_lsb_minus4 + 4);
      if (sliceHeader.pps.bottom_field_pic_order_in_frame_present_flag && !sliceHeader.field_pic_flag) {
        sliceHeader.delta_pic_order_cnt_bottom = reader.readSE();
      }
    }
    if (sliceHeader.sps.pic_order_cnt_type === 1 && !sliceHeader.sps.delta_pic_order_always_zero_flag) {
      sliceHeader.delta_pic_order_cnt_0 = reader.readSE();
      if (sliceHeader.pps.bottom_field_pic_order_in_frame_present_flag && !sliceHeader.field_pic_flag) {
        sliceHeader.delta_pic_order_cnt_1 = reader.readSE();
      }
    }

    // no_output_of_prior_pics_flag:       No
    // long_term_reference_flag:           No
    // slice_qp_delta:                     -11 (0xFFFFFFF5)
    // disable_deblocking_filter_idc:      0 (0x0)
    // slice_alpha_c0_offset_div2:         0 (0x0)
    // slice_beta_offset_div2:             0 (0x0)

    return sliceHeader;

  }

  /**
   *
   * @return {string}
   */
  public toString(): string {
    return `SliceHeader{
    first_mb_in_slice=${this.first_mb_in_slice}, 
    slice_type=${this.slice_type}, 
    pic_parameter_set_id=${this.pic_parameter_set_id}, 
    colour_plane_id=${this.colour_plane_id}, 
    frame_num=${this.frame_num}, 
    field_pic_flag=${this.field_pic_flag}, 
    bottom_field_flag=${this.bottom_field_flag}, 
    idr_pic_id=${this.idr_pic_id}, 
    pic_order_cnt_lsb=${this.pic_order_cnt_lsb}, 
    delta_pic_order_cnt_bottom=${this.delta_pic_order_cnt_bottom}}`;
  }
}
