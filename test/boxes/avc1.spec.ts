import { avc1 } from '../../src/fmp4/boxes/avc1';
import { avcC } from '../../src/fmp4/boxes/avcC';
import { generateNalUnitType, H264NalUnitTypes } from '../../src/fmp4/utils/generateBox';
import { SeqParameterSet } from '../../src/h264/model/SeqParameterSet';
import { PictureParameterSet } from '../../src/h264/model/PictureParameterSet';
import { BitstreamRestriction, VUIParameters } from '../../src/h264/model/VUIParameters';
import { HRDParameters } from '../../src/h264/model/HRDParameters';
import * as dump from 'buffer-hexdump';
import { pasp } from '../../src/fmp4/boxes/pasp';


describe('avc1 box', () => {
  it('write avc1 box', () => {
    const seqParameterSet = new SeqParameterSet();

    seqParameterSet.profile_idc = 0x4d;
    seqParameterSet.constraint_set_0_flag = false;
    seqParameterSet.constraint_set_1_flag = true;
    seqParameterSet.constraint_set_2_flag = false;
    seqParameterSet.constraint_set_3_flag = false;
    seqParameterSet.constraint_set_4_flag = false;
    seqParameterSet.constraint_set_5_flag = false;
    seqParameterSet.level_idc = 0x1e;
    seqParameterSet.seq_parameter_set_id = 0x0;
    seqParameterSet.log2_max_frame_num_minus4 = 0x4;
    seqParameterSet.pic_order_cnt_type = 0x2;
    seqParameterSet.num_ref_frames = 0x1;
    seqParameterSet.gaps_in_frame_num_value_allowed_flag = false;
    seqParameterSet.pic_width_in_mbs_minus1 = 0x1a;
    seqParameterSet.pic_height_in_map_units_minus1 = 0x031;
    seqParameterSet.frame_mbs_only_flag = true;
    seqParameterSet.direct_8x8_inference_flag = true;
    seqParameterSet.frame_cropping_flag = true;
    seqParameterSet.frame_crop_left_offset = 0x0;
    seqParameterSet.frame_crop_right_offset = 0x4;
    seqParameterSet.frame_crop_top_offset = 0x0;
    seqParameterSet.frame_crop_bottom_offset = 0x4;

    seqParameterSet.vuiParams = new VUIParameters({
      aspect_ratio_info_present_flag: true,
      aspect_ratio_idc              : 1.000, //0x01 8 bits - 1.000
      overscan_info_present_flag    : false,
      video_signal_type_present_flag: false,
      chroma_loc_info_present_flag  : false,
      timing_info_present_flag      : true,
      num_units_in_tick             : 0x000003E8, //1000 (0x000003E8) - (32 bits)
      time_scale                    : 0x0000EA60, //60000 (0x0000EA60) - (32 bits)
      fixed_frame_rate_flag         : true,
      nalHRDParams                  : new HRDParameters({
        cpb_cnt_minus1                         : 0x0,
        bit_rate_scale                         : 0x0, //4 bits
        cpb_size_scale                         : 0x0, //4 bits
        bit_rate_value_minus1                  : [0x0000DC45, 0x371180],   //56389 (0x0000DC45) - 3608960 (0x371180) bps
        cpb_size_value_minus1                  : [0x000024B66, 0x24B670],   //150374 (0x000024B66) - 2406000 (0x24B670) bits
        cbr_flag                               : [false],
        initial_cpb_removal_delay_length_minus1: 0x17, //5 bits
        cpb_removal_delay_length_minus1        : 0x0f, //5 bits
        dpb_output_delay_length_minus1         : 0x05, //5 bits
        time_offset_length                     : 0x18 //5 bits
      }),
      vclHRDParams                  : null,
      bitstreamRestriction          : new BitstreamRestriction({
        motion_vectors_over_pic_boundaries_flag: true,
        max_bytes_per_pic_denom                : 0x0,
        max_bits_per_mb_denom                  : 0x0,
        log2_max_mv_length_horizontal          : 0x1,
        log2_max_mv_length_vertical            : 0x1,
        max_num_reorder_frames                 : 0x0,
        max_dec_frame_buffering                : 0x1
      }),
      low_delay_hrd_flag            : false,
      pic_struct_present_flag       : true

    });

    const picParameterSet = new PictureParameterSet();
    picParameterSet.pic_parameter_set_id = 0x0;
    picParameterSet.seq_parameter_set_id = 0x0;
    picParameterSet.entropy_coding_mode_flag = true;
    picParameterSet.bottom_field_pic_order_in_frame_present_flag = false;
    picParameterSet.num_slice_groups_minus1 = 0x0;
    picParameterSet.num_ref_idx_l0_default_active_minus1 = 0x0;
    picParameterSet.num_ref_idx_l1_default_active_minus1 = 0x0;
    picParameterSet.weighted_pred_flag = false;
    picParameterSet.weighted_bipred_idc = 0x0; // 2bits
    picParameterSet.pic_init_qp_minus26 = 0x0;
    picParameterSet.pic_init_qs_minus26 = 0x0;
    picParameterSet.chroma_qp_index_offset = 0x0;
    picParameterSet.deblocking_filter_control_present_flag = true;
    picParameterSet.constrained_intra_pred_flag = false;
    picParameterSet.redundant_pic_cnt_present_flag = false;

    const avc1Buf = avc1({
        dataReferenceIndex: 1,
        width             : 424,
        height            : 792,
        frameCount        : 1,
        compressorname    : '',
        depth             : 24
      }, [avcC({
        configurationVersion : 0x01,
        AVCProfileIndication : 0x4d,
        profileCompatibility : 0x40,
        AVCLevelIndication   : 0x1e,
        lengthSizeMinusOne   : 0x3,
        sequenceParameterSets: [
          generateNalUnitType({nal_unit_type: H264NalUnitTypes.SEQ_PARAMETER_SET, nalUnit: seqParameterSet})
        ],// sequenceParameterSets
        pictureParameterSets : [
          generateNalUnitType({nal_unit_type: H264NalUnitTypes.PIC_PARAMETER_SET, nalUnit: picParameterSet})
        ]// pictureParameterSets
      }), pasp({
        hSpacing: 1,
        vSpacing: 1
      })]
    );

    const targetBuf = Buffer.from([
      0x00, 0x00, 0x00, 0xA0, 0x61, 0x76, 0x63, 0x31, //avc1
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, //Reserved
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //Width     Height
      0x01, 0xA8, 0x03, 0x18, 0x00, 0x48, 0x00, 0x00,
      //
      0x00, 0x48, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,// -> data size
      0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,//frame count
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      //    end //depth   color table id//begin avcc
      0x00, 0x00, 0x00, 0x18, 0xFF, 0xFF, 0x00, 0x00,
      //                                  version profile
      0x00, 0x3A, 0x61, 0x76, 0x63, 0x43, 0x01, 0x4D,
      //45ED50          Compatible profile:            0x40
      // 45ED51          Level:                         0x1e
      // 45ED52          Reserved:                      0x3f - (6 bits)
      //45ED52          Size of NALU length minus 1:   0x3 - (2 bits)
      // 45ED53          Reserved:                      0x7 - (3 bits)
      // 45ED53          seq_parameter_set count:       0x01 //5 bits
      //                                  0b01100111
      0x40, 0x1E, 0xFF, 0xE1, 0x00, 0x23, 0x67, 0x4D,//1 compatiable profile 1 Level --> 2 size  nal_ref_idc:  0x3 - (2 bits)nal_unit_type:                0x7 //5 bits

      0x40, 0x1E, 0x95, 0xA0, 0x6C, 0x19, 0x79, 0x65,
      0xC0, 0x44, 0x00, 0x00, 0x0F, 0xA0, 0x00, 0x03,
      0xA9, 0x83, 0x80, 0x00, 0x00, 0xDC, 0x46, 0x00,
      0x00, 0x49, 0x6C, 0xEB, 0xBC, 0xB8, 0x3E, 0x95,
      0x40, 0x01, 0x00, 0x04, 0x68, 0xEE, 0x3C, 0x80,
      0x00, 0x00, 0x00, 0x10, 0x70, 0x61, 0x73, 0x70,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01
    ]);

    const avc1Dump = dump(avc1Buf);
    const targetDump = dump(targetBuf);

    expect(avc1Dump).toEqual(targetDump);
  });

  it('read avc1 box', () => {
    const targetBuffer = Buffer.from([
      0x00, 0x00, 0x00, 0xA0, 0x61, 0x76, 0x63, 0x31,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x01, 0xA8, 0x03, 0x18, 0x00, 0x48, 0x00, 0x00,
      0x00, 0x48, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x18, 0xFF, 0xFF, 0x00, 0x00,
      0x00, 0x3A, 0x61, 0x76, 0x63, 0x43, 0x01, 0x4D,
      0x40, 0x1E, 0xFF, 0xE1, 0x00, 0x23, 0x67, 0x4D,
      0x40, 0x1E, 0x95, 0xA0, 0x6C, 0x19, 0x79, 0x65,
      0xC0, 0x44, 0x00, 0x00, 0x0F, 0xA0, 0x00, 0x03,
      0xA9, 0x83, 0x80, 0x00, 0x00, 0xDC, 0x46, 0x00,
      0x00, 0x49, 0x6C, 0xEB, 0xBC, 0xB8, 0x3E, 0x95,
      0x40, 0x01, 0x00, 0x04, 0x68, 0xEE, 0x3C, 0x80,
      0x00, 0x00, 0x00, 0x10, 0x70, 0x61, 0x73, 0x70,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01
    ]);

  });
});

