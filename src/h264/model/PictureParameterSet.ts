/**
 * Picture Parameter Set entity of H264 bitstream
 * <p>
 * capable to serialize / deserialize with CAVLC bitstream</p>
 */
import { StreamInputBuffer, StreamOutputBuffer } from '@gradii/stream-buffer';
import { ScalingList } from './ScalingList';
import { ScalingMatrix } from './ScalingMatrix';
import { CAVLCReader } from '../../stream/CAVLCReader';
import { CAVLCWriter } from '../../stream/CAVLCWriter';
import { H264NalUnitTypes } from '../../fmp4/utils/generateBox';

export class PictureParameterSet {
  public static NalUnitType = H264NalUnitTypes.PIC_PARAMETER_SET;

  public pic_parameter_set_id: number = 0;
  public seq_parameter_set_id: number = 0;
  public entropy_coding_mode_flag: boolean = false;
  public bottom_field_pic_order_in_frame_present_flag: boolean = false;
  //
  public num_slice_groups_minus1: number = 0;
  public slice_group_map_type: number = 0;
  public slice_group_change_direction_flag: boolean = false;
  public slice_group_change_rate_minus1: number = 0;

  public top_left: number[] = null;
  public bottom_right: number[] = null;
  public run_length_minus1: number[] = null;
  public num_ref_idx_l0_default_active_minus1: number = 0;
  public num_ref_idx_l1_default_active_minus1: number = 0;
  public weighted_pred_flag: boolean = false;
  public weighted_bipred_idc: number = 0;
  public pic_init_qp_minus26: number = 0;
  public pic_init_qs_minus26: number = 0;
  public chroma_qp_index_offset: number = 0;
  public deblocking_filter_control_present_flag: boolean = false;
  public constrained_intra_pred_flag: boolean = false;
  public redundant_pic_cnt_present_flag: boolean = false;
  public slice_group_id: number[] = null;
  public extended: PPSExt = null;

  public static read(is: StreamInputBuffer): PictureParameterSet {
    let reader: CAVLCReader = new CAVLCReader(is);
    let pps: PictureParameterSet = new PictureParameterSet();
    pps.pic_parameter_set_id = reader.readUE();
    pps.seq_parameter_set_id = reader.readUE();
    pps.entropy_coding_mode_flag = reader.readBool();
    pps.bottom_field_pic_order_in_frame_present_flag = reader.readBool();
    pps.num_slice_groups_minus1 = reader.readUE();
    if (pps.num_slice_groups_minus1 > 0) {
      pps.slice_group_map_type = reader.readUE();
      pps.top_left = new Array(pps.num_slice_groups_minus1 + 1);
      pps.bottom_right = new Array(pps.num_slice_groups_minus1 + 1);
      pps.run_length_minus1 = new Array(pps.num_slice_groups_minus1 + 1);
      if (pps.slice_group_map_type === 0) {
        for (let iGroup: number = 0; iGroup <= pps.num_slice_groups_minus1; iGroup++) {
          pps.run_length_minus1[iGroup] = reader.readUE();
        }
      } else if (pps.slice_group_map_type === 2) {
        for (let iGroup: number = 0; iGroup < pps.num_slice_groups_minus1; iGroup++) {
          pps.top_left[iGroup] = reader.readUE();
          pps.bottom_right[iGroup] = reader.readUE();
        }
      } else if (pps.slice_group_map_type === 3 || pps.slice_group_map_type === 4 || pps.slice_group_map_type === 5) {
        pps.slice_group_change_direction_flag = reader.readBool();
        pps.slice_group_change_rate_minus1 = reader.readUE();
      } else if (pps.slice_group_map_type === 6) {
        let NumberBitsPerSliceGroupId: number;
        if (pps.num_slice_groups_minus1 + 1 > 4) {
          NumberBitsPerSliceGroupId = 3;
        } else if (pps.num_slice_groups_minus1 + 1 > 2) NumberBitsPerSliceGroupId = 2; else NumberBitsPerSliceGroupId = 1;
        let pic_size_in_map_units_minus1: number = reader.readUE();
        pps.slice_group_id = new Array(pic_size_in_map_units_minus1 + 1);
        for (let i: number = 0; i <= pic_size_in_map_units_minus1; i++) {
          pps.slice_group_id[i] = reader.readU(NumberBitsPerSliceGroupId);
        }
      }
    }
    pps.num_ref_idx_l0_default_active_minus1 = reader.readUE();
    pps.num_ref_idx_l1_default_active_minus1 = reader.readUE();
    pps.weighted_pred_flag = reader.readBool();
    pps.weighted_bipred_idc = (<number>reader.readNBit(2) | 0);
    pps.pic_init_qp_minus26 = reader.readSE();
    pps.pic_init_qs_minus26 = reader.readSE();
    pps.chroma_qp_index_offset = reader.readSE();
    pps.deblocking_filter_control_present_flag = reader.readBool();
    pps.constrained_intra_pred_flag = reader.readBool();
    pps.redundant_pic_cnt_present_flag = reader.readBool();
    if (reader.moreRBSPData()) {
      pps.extended = new PPSExt();
      pps.extended.transform_8x8_mode_flag = reader.readBool();
      let pic_scaling_matrix_present_flag: boolean = reader.readBool();
      if (pic_scaling_matrix_present_flag) {
        for (let i: number = 0; i < 6 + 2 * (pps.extended.transform_8x8_mode_flag ? 1 : 0); i++) {
          let pic_scaling_list_present_flag: boolean = reader.readBool();
          if (pic_scaling_list_present_flag) {
            pps.extended.scalindMatrix.ScalingList4x4 = [null, null, null, null, null, null, null, null];
            pps.extended.scalindMatrix.ScalingList8x8 = [null, null, null, null, null, null, null, null];
            if (i < 6) {
              pps.extended.scalindMatrix.ScalingList4x4[i] = ScalingList.read(reader, 16);
            } else {
              pps.extended.scalindMatrix.ScalingList8x8[i - 6] = ScalingList.read(reader, 64);
            }
          }
        }
      }
      pps.extended.second_chroma_qp_index_offset = reader.readSE();
    }
    reader.readTrailingBits();
    return pps;
  }

  public write(out: StreamOutputBuffer) {
    let writer: CAVLCWriter = new CAVLCWriter(out);
    writer.writeUE(this.pic_parameter_set_id);
    writer.writeUE(this.seq_parameter_set_id);
    writer.writeBool(this.entropy_coding_mode_flag);
    writer.writeBool(this.bottom_field_pic_order_in_frame_present_flag);
    writer.writeUE(this.num_slice_groups_minus1);
    if (this.num_slice_groups_minus1 > 0) {
      writer.writeUE(this.slice_group_map_type);
      let top_left: number[] = [0];
      let bottom_right: number[] = [0];
      let run_length_minus1: number[] = [0];
      if (this.slice_group_map_type === 0) {
        for (let iGroup: number = 0; iGroup <= this.num_slice_groups_minus1; iGroup++) {
          writer.writeUE(run_length_minus1[iGroup]);
        }
      } else if (this.slice_group_map_type === 2) {
        for (let iGroup: number = 0; iGroup < this.num_slice_groups_minus1; iGroup++) {
          writer.writeUE(top_left[iGroup]);
          writer.writeUE(bottom_right[iGroup]);
        }
      } else if (this.slice_group_map_type === 3 || this.slice_group_map_type === 4 || this.slice_group_map_type === 5) {
        writer.writeBool(this.slice_group_change_direction_flag);
        writer.writeUE(this.slice_group_change_rate_minus1);
      } else if (this.slice_group_map_type === 6) {
        let NumberBitsPerSliceGroupId: number;
        if (this.num_slice_groups_minus1 + 1 > 4) NumberBitsPerSliceGroupId = 3; else if (this.num_slice_groups_minus1 + 1 > 2) NumberBitsPerSliceGroupId = 2; else NumberBitsPerSliceGroupId = 1;
        writer.writeUE(this.slice_group_id.length);
        for (let i: number = 0; i <= this.slice_group_id.length; i++) {
          writer.writeU(this.slice_group_id[i], NumberBitsPerSliceGroupId);
        }
      }
    }
    writer.writeUE(this.num_ref_idx_l0_default_active_minus1);
    writer.writeUE(this.num_ref_idx_l1_default_active_minus1);
    writer.writeBool(this.weighted_pred_flag);
    writer.writeNBit(this.weighted_bipred_idc, 2);
    writer.writeSE(this.pic_init_qp_minus26);
    writer.writeSE(this.pic_init_qs_minus26);
    writer.writeSE(this.chroma_qp_index_offset);
    writer.writeBool(this.deblocking_filter_control_present_flag);
    writer.writeBool(this.constrained_intra_pred_flag);
    writer.writeBool(this.redundant_pic_cnt_present_flag);
    if (this.extended != null) {
      writer.writeBool(this.extended.transform_8x8_mode_flag);
      writer.writeBool(this.extended.scalindMatrix != null);
      if (this.extended.scalindMatrix != null) {
        for (let i: number = 0; i < 6 + 2 * (this.extended.transform_8x8_mode_flag ? 1 : 0); i++) {
          if (i < 6) {
            writer.writeBool(this.extended.scalindMatrix.ScalingList4x4[i] != null);
            if (this.extended.scalindMatrix.ScalingList4x4[i] != null) {
              this.extended.scalindMatrix.ScalingList4x4[i].write(writer);
            }
          } else {
            writer.writeBool(this.extended.scalindMatrix.ScalingList8x8[i - 6] != null);
            if (this.extended.scalindMatrix.ScalingList8x8[i - 6] != null) {
              this.extended.scalindMatrix.ScalingList8x8[i - 6].write(writer);
            }
          }
        }
      }
      writer.writeSE(this.extended.second_chroma_qp_index_offset);
    }
    writer.writeTrailingBits();
  }

  /**
   *
   * @return {string}
   */
  public toString(): string {
    return `PictureParameterSet{
       entropy_coding_mode_flag=${this.entropy_coding_mode_flag},
       num_ref_idx_l0_active_minus1=${this.num_ref_idx_l0_default_active_minus1},
       num_ref_idx_l1_active_minus1=${this.num_ref_idx_l1_default_active_minus1},
       slice_group_change_rate_minus1=${this.slice_group_change_rate_minus1},
       pic_parameter_set_id=${this.pic_parameter_set_id},
       seq_parameter_set_id=${this.seq_parameter_set_id},
       pic_order_present_flag=${this.bottom_field_pic_order_in_frame_present_flag},
       num_slice_groups_minus1=${this.num_slice_groups_minus1},
       slice_group_map_type=${this.slice_group_map_type},
       weighted_pred_flag=${this.weighted_pred_flag},
       weighted_bipred_idc=${this.weighted_bipred_idc},
       pic_init_qp_minus26=${this.pic_init_qp_minus26},
       pic_init_qs_minus26=${this.pic_init_qs_minus26},
       chroma_qp_index_offset=${this.chroma_qp_index_offset},
       deblocking_filter_control_present_flag=${this.deblocking_filter_control_present_flag},
       constrained_intra_pred_flag=${this.constrained_intra_pred_flag},
       redundant_pic_cnt_present_flag=${this.redundant_pic_cnt_present_flag},
       top_left=${this.top_left},
       bottom_right=${this.bottom_right},
       run_length_minus1=${this.run_length_minus1},
       slice_group_change_direction_flag=${this.slice_group_change_direction_flag},
       slice_group_id=${this.slice_group_id},
       extended=${this.extended}}`;
  }
}

export class PPSExt {
  public transform_8x8_mode_flag: boolean = false;
  public scalindMatrix: ScalingMatrix = new ScalingMatrix();
  public second_chroma_qp_index_offset: number = 0;
  public pic_scaling_list_present_flag: boolean[];

  /**
   *
   * @return {string}
   */
  public toString(): string {
    return `PPSExt{
    transform_8x8_mode_flag=${this.transform_8x8_mode_flag}, 
    scalindMatrix=${this.scalindMatrix}, 
    second_chroma_qp_index_offset=${this.second_chroma_qp_index_offset}, 
    pic_scaling_list_present_flag=${this.pic_scaling_list_present_flag}}`;
  }

}
