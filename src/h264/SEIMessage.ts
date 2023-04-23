import { SeqParameterSet } from './model/SeqParameterSet';
import { StreamInputBuffer } from '@gradii/stream-buffer';
import { CAVLCReader } from '../stream/CAVLCReader';

export class SEIMessage {
  payloadType: number = 0;
  payloadSize: number = 0;
  removal_delay_flag: boolean = false;
  cpb_removal_delay: number = 0;
  dpb_removal_delay: number = 0;
  clock_timestamp_flag: boolean = false;
  pic_struct: number = 0;
  ct_type: number = 0;
  nuit_field_based_flag: number = 0;
  counting_type: number = 0;
  full_timestamp_flag: number = 0;
  discontinuity_flag: number = 0;
  cnt_dropped_flag: number = 0;
  n_frames: number = 0;
  seconds_value: number = 0;
  minutes_value: number = 0;
  hours_value: number = 0;
  time_offset_length: number = 0;
  time_offset: number = 0;
  sps: SeqParameterSet;

  public constructor(is: StreamInputBuffer, sps: SeqParameterSet) {
    this.sps = sps;
    is.skip(1);
    let datasize = is.getLength() - is.getOffset();
    let read = 0;
    while ((read < datasize)) {
      {
        this.payloadType = 0;
        this.payloadSize = 0;
        let last_payload_type_bytes: number = is.readUInt8();
        read++;
        while ((last_payload_type_bytes === 0xff)) {
          {
            this.payloadType += last_payload_type_bytes;
            last_payload_type_bytes = is.readUInt8();
            read++;
          }
        }
        this.payloadType += last_payload_type_bytes;
        let last_payload_size_bytes: number = is.readUInt8();
        read++;
        while ((last_payload_size_bytes === 255)) {
          {
            this.payloadSize += last_payload_size_bytes;
            last_payload_size_bytes = is.readUInt8();
            read++;
          }
        }
        this.payloadSize += last_payload_size_bytes;
        if (datasize - read >= this.payloadSize) {
          if (this.payloadType === 1) {
            if (sps.vuiParams != null && (sps.vuiParams.nalHRDParams != null || sps.vuiParams.vclHRDParams != null || sps.vuiParams.pic_struct_present_flag)) {
              let data = new Buffer(this.payloadSize);
              is.skip(1);
              read += this.payloadSize;
              let reader: CAVLCReader = new CAVLCReader(new StreamInputBuffer(data));
              if (sps.vuiParams.nalHRDParams != null || sps.vuiParams.vclHRDParams != null) {
                this.removal_delay_flag = true;
                this.cpb_removal_delay = reader.readU(sps.vuiParams.nalHRDParams.cpb_removal_delay_length_minus1 + 1);
                this.dpb_removal_delay = reader.readU(sps.vuiParams.nalHRDParams.dpb_output_delay_length_minus1 + 1);
              } else {
                this.removal_delay_flag = false;
              }
              if (sps.vuiParams.pic_struct_present_flag) {
                this.pic_struct = reader.readU(4);
                let numClockTS: number;
                switch ((this.pic_struct)) {
                  case 0:
                  case 1:
                  case 2:
                  default:
                    numClockTS = 1;
                    break;
                  case 3:
                  case 4:
                  case 7:
                    numClockTS = 2;
                    break;
                  case 5:
                  case 6:
                  case 8:
                    numClockTS = 3;
                    break;
                }
                for (let i: number = 0; i < numClockTS; i++) {
                  {
                    this.clock_timestamp_flag = reader.readBool();
                    if (this.clock_timestamp_flag) {
                      this.ct_type = reader.readU(2);
                      this.nuit_field_based_flag = reader.readU(1);
                      this.counting_type = reader.readU(5);
                      this.full_timestamp_flag = reader.readU(1);
                      this.discontinuity_flag = reader.readU(1);
                      this.cnt_dropped_flag = reader.readU(1);
                      this.n_frames = reader.readU(8);
                      if (this.full_timestamp_flag === 1) {
                        this.seconds_value = reader.readU(6);
                        this.minutes_value = reader.readU(6);
                        this.hours_value = reader.readU(5);
                      } else {
                        if (reader.readBool()) {
                          this.seconds_value = reader.readU(6);
                          if (reader.readBool()) {
                            this.minutes_value = reader.readU(6);
                            if (reader.readBool()) {
                              this.hours_value = reader.readU(5);
                            }
                          }
                        }
                      }
                      if (true) {
                        if (sps.vuiParams.nalHRDParams != null) {
                          this.time_offset_length = sps.vuiParams.nalHRDParams.time_offset_length;
                        } else if (sps.vuiParams.vclHRDParams != null) {
                          this.time_offset_length = sps.vuiParams.vclHRDParams.time_offset_length;
                        } else {
                          this.time_offset_length = 24;
                        }
                        this.time_offset = reader.readU(24);
                      }
                    }
                  }
                }
              }
            } else {
              for (let i: number = 0; i < this.payloadSize; i++) {
                is.skip(1);
                read++;
              }
            }
          } else {
            for (let i: number = 0; i < this.payloadSize; i++) {
              {
                is.skip(1);
                read++;
              }
            }
          }
        } else {
          read = datasize;
        }
      }
    }
  }

  /**
   *
   * @return {string}
   */
  public toString(): string {
    let out: string = `SEIMessage{payloadType=${this.payloadType}, payloadSize=${this.payloadSize}`;
    if (this.payloadType === 1) {
      if (this.sps.vuiParams.nalHRDParams != null || this.sps.vuiParams.vclHRDParams != null) {
        out += `, cpb_removal_delay=${this.cpb_removal_delay}, dpb_removal_delay=${this.dpb_removal_delay}`;
      }
      if (this.sps.vuiParams.pic_struct_present_flag) {
        out += `, pic_struct=${this.pic_struct}`;
        if (this.clock_timestamp_flag) {
          out += `, ct_type=${this.ct_type}, nuit_field_based_flag=${this.nuit_field_based_flag}, counting_type=${this.counting_type}, full_timestamp_flag=${this.full_timestamp_flag}, discontinuity_flag=${this.discontinuity_flag}, cnt_dropped_flag=${this.cnt_dropped_flag}, n_frames=${this.n_frames}, seconds_value=${this.seconds_value}, minutes_value=${this.minutes_value}, hours_value=${this.hours_value}, time_offset_length=${this.time_offset_length}, time_offset=${this.time_offset}`;
        }
      }
    }
    out += '}';
    return out;
  }
}
