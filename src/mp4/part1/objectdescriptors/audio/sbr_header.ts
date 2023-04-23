import { BitStreamInputBuffer } from '@gradii/stream-buffer';

export class sbr_header {
  public bs_amp_res: boolean = false;
  public bs_start_freq: number = 0;
  public bs_stop_freq: number = 0;
  public bs_xover_band: number = 0;
  public bs_reserved: number = 0;
  public bs_header_extra_1: boolean = false;
  public bs_header_extra_2: boolean = false;
  public bs_freq_scale: number = 0;
  public bs_alter_scale: boolean = false;
  public bs_noise_bands: number = 0;
  public bs_limiter_bands: number = 0;
  public bs_limiter_gains: number = 0;
  public bs_interpol_freq: boolean = false;
  public bs_smoothing_mode: boolean = false;

  public constructor(b: BitStreamInputBuffer) {
    this.bs_amp_res = b.readBool();
    this.bs_start_freq = b.readNBit(4);
    this.bs_stop_freq = b.readNBit(4);
    this.bs_xover_band = b.readNBit(3);
    this.bs_reserved = b.readNBit(2);
    this.bs_header_extra_1 = b.readBool();
    this.bs_header_extra_2 = b.readBool();
    if (this.bs_header_extra_1) {
      this.bs_freq_scale = b.readNBit(2);
      this.bs_alter_scale = b.readBool();
      this.bs_noise_bands = b.readNBit(2);
    }
    if (this.bs_header_extra_2) {
      this.bs_limiter_bands = b.readNBit(2);
      this.bs_limiter_gains = b.readNBit(2);
      this.bs_interpol_freq = b.readBool();
    }
    this.bs_smoothing_mode = b.readBool();
  }
}
