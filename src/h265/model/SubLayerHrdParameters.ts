import { CAVLCReader } from '../../stream/CAVLCReader';

export class SubLayerHrdParameters {
  public constructor(subLayerId: number, cpb_cnt_minus1: number[], sub_pic_hrd_params_present_flag: boolean, bsr: CAVLCReader) {
    let CpbCnt: number = cpb_cnt_minus1[subLayerId];
    let bit_rate_value_minus1: number[] = new Array(CpbCnt + 1);
    let cpb_size_value_minus1: number[] = new Array(CpbCnt + 1);
    let cpb_size_du_value_minus1: number[] = new Array(CpbCnt + 1);
    let bit_rate_du_value_minus1: number[] = new Array(CpbCnt + 1);
    let cbr_flag: boolean[] = new Array(CpbCnt + 1);
    for (let i: number = 0; i <= CpbCnt; i++) {
      bit_rate_value_minus1[i] = bsr.readUE();
      cpb_size_value_minus1[i] = bsr.readUE();
      if (sub_pic_hrd_params_present_flag) {
        cpb_size_du_value_minus1[i] = bsr.readUE();
        bit_rate_du_value_minus1[i] = bsr.readUE();
      }
      cbr_flag[i] = bsr.readBool();
    }
  }
}
