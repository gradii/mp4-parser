import { BitStreamInputBuffer } from '@gradii/stream-buffer';
import { sbr_header } from './sbr_header';

export class ELDSpecificConfig {
  static ELDEXT_TERM: number = 0;

  public frameLengthFlag: boolean = false;
  public aacSectionDataResilienceFlag: boolean = false;
  public aacScalefactorDataResilienceFlag: boolean = false;
  public aacSpectralDataResilienceFlag: boolean = false;
  public ldSbrPresentFlag: boolean = false;
  public ldSbrSamplingRate: boolean = false;
  public ldSbrCrcFlag: boolean = false;

  public constructor(channelConfiguration: number, bitReaderBuffer: BitStreamInputBuffer) {
    this.frameLengthFlag = bitReaderBuffer.readBool();
    this.aacSectionDataResilienceFlag = bitReaderBuffer.readBool();
    this.aacScalefactorDataResilienceFlag = bitReaderBuffer.readBool();
    this.aacSpectralDataResilienceFlag = bitReaderBuffer.readBool();
    this.ldSbrPresentFlag = bitReaderBuffer.readBool();
    if (this.ldSbrPresentFlag) {
      this.ldSbrSamplingRate = bitReaderBuffer.readBool();
      this.ldSbrCrcFlag = bitReaderBuffer.readBool();
      this.ld_sbr_header(channelConfiguration, bitReaderBuffer);
    }
    let eldExtType: number = 0;
    while (((eldExtType = bitReaderBuffer.readNBit(4)) !== ELDSpecificConfig.ELDEXT_TERM)) {
      {
        let eldExtLen: number = bitReaderBuffer.readNBit(4);
        let len: number = eldExtLen;
        let eldExtLenAdd: number = 0;
        if (eldExtLen === 15) {
          eldExtLenAdd = bitReaderBuffer.readNBit(8);
          len += eldExtLenAdd;
        }
        if (eldExtLenAdd === 255) {
          let eldExtLenAddAdd: number = bitReaderBuffer.readNBit(16);
          len += eldExtLenAddAdd;
        }
        switch ((eldExtType)) {
          default:
            for (let cnt: number = 0; cnt < len; cnt++) {
              {
                let other_byte: number = bitReaderBuffer.readNBit(8);
              }
              ;
            }
            break;
        }
      }
    }
  }

  public ld_sbr_header(channelConfiguration: number, bitReaderBuffer: BitStreamInputBuffer) {
    let numSbrHeader: number = 0;
    switch ((channelConfiguration)) {
      case 1:
      case 2:
        numSbrHeader = 1;
        break;
      case 3:
        numSbrHeader = 2;
        break;
      case 4:
      case 5:
      case 6:
        numSbrHeader = 3;
        break;
      case 7:
        numSbrHeader = 4;
        break;
      default:
        numSbrHeader = 0;
        break;
    }
    for (let el: number = 0; el < numSbrHeader; el++) {
      new sbr_header(bitReaderBuffer);
    }
  }
}
