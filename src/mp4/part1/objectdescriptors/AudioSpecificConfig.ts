import { BaseDescriptor } from './BaseDescriptor';
import { ELDSpecificConfig } from './audio/ELDSpecificConfig';
import {
  BitStreamInputBuffer,
  BitStreamOutputBuffer,
  StreamInputBuffer,
  StreamOutputBuffer
} from '@gradii/stream-buffer';

// sampling_frequency_index sampling frequeny
//0x0 96000
//0x1 88200
//0x2 64000
//0x3 48000
//0x4 44100
//0x5 32000
//0x6 24000
//0x7 22050
//0x8 16000
//0x9 12000
//0xa 11025
//0xb 8000
//0xc reserved
//0xd reserved
//0xe reserved
//0xf reserved

export const samplingFrequencyIndexMap = new Map();
samplingFrequencyIndexMap.set(0x0, 96000);
samplingFrequencyIndexMap.set(0x1, 88200);
samplingFrequencyIndexMap.set(0x2, 64000);
samplingFrequencyIndexMap.set(0x3, 48000);
samplingFrequencyIndexMap.set(0x4, 44100);
samplingFrequencyIndexMap.set(0x5, 32000);
samplingFrequencyIndexMap.set(0x6, 24000);
samplingFrequencyIndexMap.set(0x7, 22050);
samplingFrequencyIndexMap.set(0x8, 16000);
samplingFrequencyIndexMap.set(0x9, 12000);
samplingFrequencyIndexMap.set(0xa, 11025);
samplingFrequencyIndexMap.set(0xb, 8000);

/* audioObjectType IDs
 0 Null
 1 AAC main X X
 2 AAC LC X X X X X X X
 3 AAC SSR X X
 4 AAC LTP X X X X
 5 SBR X X
 6 AAC Scalable X X X X
 7 TwinVQ X X X
 8 CELP X X X X X X
 9 HVXC X X X X X
 10 (reserved)
 11 (reserved)
 12 TTSI X X X X X X
 13 Main synthetic X X
 14 Wavetable synthesis X* X*
 15 General MIDI X* X*
 16 Algorithmic Synthesis and Audio FX X* X*
 17 ER AAC LC X X X
 18 (reserved)
 19 ER AAC LTP X X
 20 ER AAC Scalable X X X
 21 ER TwinVQ X X
 22 ER BSAC X X
 23 ER AAC LD X X X X
 24 ER CELP X X X
 25 ER HVXC X X
 26 ER HILN X
 27 ER Parametric X
 28 SSC
 29 PS X
 30 MPEG Surround
 31 (escape)
 32 Layer-1
 33 Layer-2
 34 Layer-3
 35 DST
 36 ALS
 37 SLS
 38 SLS non-core
 39 ER AAC ELD
 40 SMR Simple
 41 SMR Main
 */

export const audioObjectTypeMap = new Map();
audioObjectTypeMap.set(1, 'AAC main');
audioObjectTypeMap.set(2, 'AAC LC');
audioObjectTypeMap.set(3, 'AAC SSR');
audioObjectTypeMap.set(4, 'AAC LTP');
audioObjectTypeMap.set(5, 'SBR');
audioObjectTypeMap.set(6, 'AAC Scalable');
audioObjectTypeMap.set(7, 'TwinVQ');
audioObjectTypeMap.set(8, 'CELP');
audioObjectTypeMap.set(9, 'HVXC');
audioObjectTypeMap.set(10, '(reserved)');
audioObjectTypeMap.set(11, '(reserved)');
audioObjectTypeMap.set(12, 'TTSI');
audioObjectTypeMap.set(13, 'Main synthetic');
audioObjectTypeMap.set(14, 'Wavetable synthesis');
audioObjectTypeMap.set(15, 'General MIDI');
audioObjectTypeMap.set(16, 'Algorithmic Synthesis and Audio FX');
audioObjectTypeMap.set(17, 'ER AAC LC');
audioObjectTypeMap.set(18, '(reserved)');
audioObjectTypeMap.set(19, 'ER AAC LTP');
audioObjectTypeMap.set(20, 'ER AAC Scalable');
audioObjectTypeMap.set(21, 'ER TwinVQ');
audioObjectTypeMap.set(22, 'ER BSAC');
audioObjectTypeMap.set(23, 'ER AAC LD');
audioObjectTypeMap.set(24, 'ER CELP');
audioObjectTypeMap.set(25, 'ER HVXC');
audioObjectTypeMap.set(26, 'ER HILN');
audioObjectTypeMap.set(27, 'ER Parametric');
audioObjectTypeMap.set(28, 'SSC');
audioObjectTypeMap.set(29, 'PS');
audioObjectTypeMap.set(30, 'MPEG Surround');
audioObjectTypeMap.set(31, '(escape)');
audioObjectTypeMap.set(32, 'Layer-1');
audioObjectTypeMap.set(33, 'Layer-2');
audioObjectTypeMap.set(34, 'Layer-3');
audioObjectTypeMap.set(35, 'DST');
audioObjectTypeMap.set(36, 'ALS');
audioObjectTypeMap.set(37, 'SLS');
audioObjectTypeMap.set(38, 'SLS non-core');
audioObjectTypeMap.set(39, 'ER AAC ELD');
audioObjectTypeMap.set(40, 'SMR Simple');
audioObjectTypeMap.set(41, 'SMR Main');

/* profileLevelIds
 0x00 Reserved for ISO use -
 0x01 Main Audio Profile L1
 0x02 Main Audio Profile L2
 0x03 Main Audio Profile L3
 0x04 Main Audio Profile L4
 0x05 Scalable Audio Profile L1
 0x06 Scalable Audio Profile L2
 0x07 Scalable Audio Profile L3
 0x08 Scalable Audio Profile L4
 0x09 Speech Audio Profile L1
 0x0A Speech Audio Profile L2
 0x0B Synthetic Audio Profile L1
 0x0C Synthetic Audio Profile L2
 0x0D Synthetic Audio Profile L3
 0x0E High Quality Audio Profile L1
 0x0F High Quality Audio Profile L2
 0x10 High Quality Audio Profile L3
 0x11 High Quality Audio Profile L4
 0x12 High Quality Audio Profile L5
 0x13 High Quality Audio Profile L6
 0x14 High Quality Audio Profile L7
 0x15 High Quality Audio Profile L8
 0x16 Low Delay Audio Profile L1
 0x17 Low Delay Audio Profile L2
 0x18 Low Delay Audio Profile L3
 0x19 Low Delay Audio Profile L4
 0x1A Low Delay Audio Profile L5
 0x1B Low Delay Audio Profile L6
 0x1C Low Delay Audio Profile L7
 0x1D Low Delay Audio Profile L8
 0x1E Natural Audio Profile L1
 0x1F Natural Audio Profile L2
 0x20 Natural Audio Profile L3
 0x21 Natural Audio Profile L4
 0x22 Mobile Audio Internetworking Profile L1
 0x23 Mobile Audio Internetworking Profile L2
 0x24 Mobile Audio Internetworking Profile L3
 0x25 Mobile Audio Internetworking Profile L4
 0x26 Mobile Audio Internetworking Profile L5
 0x27 Mobile Audio Internetworking Profile L6
 0x28 AAC Profile L1
 0x29 AAC Profile L2
 0x2A AAC Profile L4
 0x2B AAC Profile L5
 0x2C High Efficiency AAC Profile L2
 0x2D High Efficiency AAC Profile L3
 0x2E High Efficiency AAC Profile L4
 0x2F High Efficiency AAC Profile L5
 0x30 High Efficiency AAC v2 Profile L2
 0x31 High Efficiency AAC v2 Profile L3
 0x32 High Efficiency AAC v2 Profile L4
 0x33 High Efficiency AAC v2 Profile L5
 0x34 Low Delay AAC Profile L1
 0x35 Baseline MPEG Surround Profile (see ISO/IEC
 23003-1)
 L1
 0x36 Baseline MPEG Surround Profile (see ISO/IEC
 23003-1)
 L2
 0x37 Baseline MPEG Surround Profile (see ISO/IEC
 23003-1)
 L3
 0x38 Baseline MPEG Surround Profile (see ISO/IEC
 23003-1)
 L4
 0c39 Baseline MPEG Surround Profile (see ISO/IEC
 23003-1)
 L5
 0x3A Baseline MPEG Surround Profile (see ISO/IEC
 23003-1)
 L6
 0x3B - 0x7F reserved for ISO use -
 0x80 - 0xFD user private -
 0xFE no audio profile specified -
 0xFF no audio capability required -

 */


export class AudioSpecificConfig extends BaseDescriptor {
  tag = 0x5;

  public eldSpecificConfig: ELDSpecificConfig;
  public audioObjectType: number = 0;
  public originalAudioObjectType: number = 0;
  public samplingFrequencyIndex: number = 0;
  public samplingFrequency: number = 0;
  public channelConfiguration: number = 0;
  public extensionAudioObjectType: number = 0;
  public origExtensionAudioObjectType: number = 0;
  public sbrPresentFlag: boolean = false;
  public psPresentFlag: boolean = false;
  public extensionSamplingFrequencyIndex: number = -1;
  public extensionSamplingFrequency: number = 0;
  public extensionChannelConfiguration: number = 0;
  public sacPayloadEmbedding: number = 0;
  public fillBits: number = 0;
  public epConfig: number = 0;
  public directMapping: number = 0;
  public syncExtensionType: number = -1;
  public innerSyncExtensionType: number = -1;
  public outerSyncExtensionType: number = -1;
  public frameLengthFlag: number = 0;
  public dependsOnCoreCoder: number = 0;
  public coreCoderDelay: number = 0;
  public extensionFlag: number = 0;
  public layerNr: number = 0;
  public numOfSubFrame: number = 0;
  public layer_length: number = 0;
  public aacSectionDataResilienceFlag: boolean = false;
  public aacScalefactorDataResilienceFlag: boolean = false;
  public aacSpectralDataResilienceFlag: boolean = false;
  public extensionFlag3: number = 0;
  public gaSpecificConfig: boolean = false;
  public isBaseLayer: number = 0;
  public paraMode: number = 0;
  public paraExtensionFlag: number = 0;
  public hvxcVarMode: number = 0;
  public hvxcRateMode: number = 0;
  public erHvxcExtensionFlag: number = 0;
  public var_ScalableFlag: number = 0;
  public hilnQuantMode: number = 0;
  public hilnMaxNumLine: number = 0;
  public hilnSampleRateCode: number = 0;
  public hilnFrameLength: number = 0;
  public hilnContMode: number = 0;
  public hilnEnhaLayer: number = 0;
  public hilnEnhaQuantMode: number = 0;
  public parametricSpecificConfig: boolean = false;
  configBytes: Buffer;
  parsed: boolean = false;

  public constructor() {
    super();
  }

  static writeAudioObjectType(audioObjectType: number, bitWriterBuffer: BitStreamOutputBuffer) {
    if (audioObjectType >= 32) {
      bitWriterBuffer.writeNBit(31, 5);
      bitWriterBuffer.writeNBit(audioObjectType - 32, 6);
    } else {
      bitWriterBuffer.writeNBit(audioObjectType, 5);
    }
  }

  static getAudioObjectType(__in: BitStreamInputBuffer): number {
    let audioObjectType: number = __in.readNBit(5);
    if (audioObjectType === 31) {
      audioObjectType = 32 + __in.readNBit(6);
    }
    return audioObjectType;
  }

  /**
   *
   * @param {Buffer} bb
   */
  public parseDetail(bb: StreamInputBuffer) {
    this.parsed = true;
    this.configBytes = bb.read(this.sizeOfInstance);

    let bitReaderBuffer = new BitStreamInputBuffer(new StreamInputBuffer(this.configBytes));
    this.originalAudioObjectType = this.audioObjectType = AudioSpecificConfig.getAudioObjectType(bitReaderBuffer);
    this.samplingFrequencyIndex = bitReaderBuffer.readNBit(4);
    if (this.samplingFrequencyIndex === 15) {
      this.samplingFrequency = bitReaderBuffer.readNBit(24);
    }
    this.channelConfiguration = bitReaderBuffer.readNBit(4);
    if (this.audioObjectType === 5 || this.audioObjectType === 29) {
      this.extensionAudioObjectType = 5;
      this.sbrPresentFlag = true;
      if (this.audioObjectType === 29) {
        this.psPresentFlag = true;
      }
      this.extensionSamplingFrequencyIndex = bitReaderBuffer.readNBit(4);
      if (this.extensionSamplingFrequencyIndex === 15) this.extensionSamplingFrequency = bitReaderBuffer.readNBit(24);
      this.audioObjectType = AudioSpecificConfig.getAudioObjectType(bitReaderBuffer);
      if (this.audioObjectType === 22) this.extensionChannelConfiguration = bitReaderBuffer.readNBit(4);
    } else {
      this.extensionAudioObjectType = 0;
    }
    switch ((this.audioObjectType)) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 6:
      case 7:
      case 17:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
        this.parseGaSpecificConfig(this.samplingFrequencyIndex, this.channelConfiguration, this.audioObjectType, bitReaderBuffer);
        break;
      case 8:
        throw new Error(`can't parse CelpSpecificConfig yet`);
      case 9:
        throw new Error(`can't parse HvxcSpecificConfig yet`);
      case 12:
        throw new Error(`can't parse TTSSpecificConfig yet`);
      case 13:
      case 14:
      case 15:
      case 16:
        throw new Error(`can't parse StructuredAudioSpecificConfig yet`);
      case 24:
        throw new Error(`can't parse ErrorResilientCelpSpecificConfig yet`);
      case 25:
        throw new Error(`can't parse ErrorResilientHvxcSpecificConfig yet`);
      case 26:
      case 27:
        this.parseParametricSpecificConfig(this.samplingFrequencyIndex, this.channelConfiguration, this.audioObjectType, bitReaderBuffer);
        break;
      case 28:
        throw new Error(`can't parse SSCSpecificConfig yet`);
      case 30:
        this.sacPayloadEmbedding = bitReaderBuffer.readNBit(1);
        throw new Error(`can't parse SpatialSpecificConfig yet`);
      case 32:
      case 33:
      case 34:
        throw new Error(`can't parse MPEG_1_2_SpecificConfig yet`);
      case 35:
        throw new Error(`can't parse DSTSpecificConfig yet`);
      case 36:
        this.fillBits = bitReaderBuffer.readNBit(5);
        throw new Error(`can't parse ALSSpecificConfig yet`);
      case 37:
      case 38:
        throw new Error(`can't parse SLSSpecificConfig yet`);
      case 39:
        this.eldSpecificConfig = new ELDSpecificConfig(this.channelConfiguration, bitReaderBuffer);
        break;
      case 40:
      case 41:
        throw new Error(`can't parse SymbolicMusicSpecificConfig yet`);
      default:
    }
    switch ((this.audioObjectType)) {
      case 17:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
      case 26:
      case 27:
      case 39:
        this.epConfig = bitReaderBuffer.readNBit(2);
        if (this.epConfig === 2 || this.epConfig === 3) {
          throw new Error(`can't parse ErrorProtectionSpecificConfig yet`);
        }
        if (this.epConfig === 3) {
          this.directMapping = bitReaderBuffer.readNBit(1);
          if (this.directMapping === 0) {
            throw new Error('not implemented');
          }
        }
    }
    if (this.extensionAudioObjectType !== 5 && bitReaderBuffer.remainingBits() >= 16) {
      this.outerSyncExtensionType = this.syncExtensionType = bitReaderBuffer.readNBit(11);
      if (this.syncExtensionType === 695) {
        this.extensionAudioObjectType = AudioSpecificConfig.getAudioObjectType(bitReaderBuffer);
        if (this.extensionAudioObjectType === 5) {
          this.sbrPresentFlag = bitReaderBuffer.readBool();
          if (this.sbrPresentFlag) {
            this.extensionSamplingFrequencyIndex = bitReaderBuffer.readNBit(4);
            if (this.extensionSamplingFrequencyIndex === 15) {
              this.extensionSamplingFrequency = bitReaderBuffer.readNBit(24);
            }
            if (bitReaderBuffer.remainingBits() >= 12) {
              this.innerSyncExtensionType = this.syncExtensionType = bitReaderBuffer.readNBit(11);
              if (this.syncExtensionType === 1352) {
                this.psPresentFlag = bitReaderBuffer.readBool();
              }
            }
          }
        }
        if (this.extensionAudioObjectType === 22) {
          this.sbrPresentFlag = bitReaderBuffer.readBool();
          if (this.sbrPresentFlag) {
            this.extensionSamplingFrequencyIndex = bitReaderBuffer.readNBit(4);
            if (this.extensionSamplingFrequencyIndex === 15) {
              this.extensionSamplingFrequency = bitReaderBuffer.readNBit(24);
            }
          }
          this.extensionChannelConfiguration = bitReaderBuffer.readNBit(4);
        }
      }
    }
  }

  gaSpecificConfigSize(): number {
    let n: number = 0;
    n += 1;
    n += 1;
    if (this.dependsOnCoreCoder === 1) {
      n += 14;
    }
    n += 1;
    if (this.channelConfiguration === 0) {
      throw new Error('can\'t parse program_config_element yet');
    }
    if ((this.audioObjectType === 6) || (this.audioObjectType === 20)) {
      n += 3;
    }
    if (this.extensionFlag === 1) {
      if (this.audioObjectType === 22) {
        n += 5;
        n += 11;
      }
      if (this.audioObjectType === 17 || this.audioObjectType === 19 || this.audioObjectType === 20 || this.audioObjectType === 23) {
        n += 1;
        n += 1;
        n += 1;
      }
      n += 1;
      if (this.extensionFlag3 === 1) {
        throw new Error('Not implemented');
      }
    }
    return n;
  }

  getContentSize(): number {
    let sizeInBits: number = 5;
    if (this.originalAudioObjectType > 30) {
      sizeInBits += 6;
    }
    sizeInBits += 4;
    if (this.samplingFrequencyIndex === 15) {
      sizeInBits += 24;
    }
    sizeInBits += 4;
    if (this.audioObjectType === 5 || this.audioObjectType === 29) {
      sizeInBits += 4;
      if (this.extensionSamplingFrequencyIndex === 15) {
        sizeInBits += 24;
      }
    }
    if (this.audioObjectType === 22) {
      sizeInBits += 4;
    }
    if (this.gaSpecificConfig) {
      sizeInBits += this.gaSpecificConfigSize();
    }
    if (this.outerSyncExtensionType >= 0) {
      sizeInBits += 11;
      if (this.outerSyncExtensionType === 695) {
        sizeInBits += 5;
        if (this.extensionAudioObjectType > 30) {
          sizeInBits += 6;
        }
        if (this.extensionAudioObjectType === 5) {
          sizeInBits += 1;
          if (this.sbrPresentFlag) {
            sizeInBits += 4;
            if (this.extensionSamplingFrequencyIndex === 15) {
              sizeInBits += 24;
            }
            if (this.innerSyncExtensionType >= 0) {
              sizeInBits += 11;
              if (this.innerSyncExtensionType === 1352) {
                sizeInBits += 1;
              }
            }
          }
        }
        if (this.extensionAudioObjectType === 22) {
          sizeInBits += 1;
          if (this.sbrPresentFlag) {
            sizeInBits += 4;
            if (this.extensionSamplingFrequencyIndex === 15) {
              sizeInBits += 24;
            }
          }
          sizeInBits += 4;
        }
      }
    }
    return (<number>Math.ceil((<number>sizeInBits) / 8) | 0);
  }

  public serialize(): Buffer {
    let out: StreamOutputBuffer = new StreamOutputBuffer(this.getSize());
    out.writeUInt8(this.tag);
    this.writeSize(out, this.getContentSize());
    out.write(this.serializeConfigBytes());
    return out.getBuffer();
  }

  serializeConfigBytes(): Buffer {
    let out: StreamOutputBuffer = new StreamOutputBuffer(this.getContentSize());
    let bitWriterBuffer: BitStreamOutputBuffer = new BitStreamOutputBuffer(out);
    AudioSpecificConfig.writeAudioObjectType(this.originalAudioObjectType, bitWriterBuffer);
    bitWriterBuffer.writeNBit(this.samplingFrequencyIndex, 4);
    if (this.samplingFrequencyIndex === 15) {
      bitWriterBuffer.writeNBit(this.samplingFrequency, 24);
    }
    bitWriterBuffer.writeNBit(this.channelConfiguration, 4);
    if (this.audioObjectType === 5 || this.audioObjectType === 29) {
      this.extensionAudioObjectType = 5;
      this.sbrPresentFlag = true;
      if (this.audioObjectType === 29) {
        this.psPresentFlag = true;
      }
      bitWriterBuffer.writeNBit(this.extensionSamplingFrequencyIndex, 4);
      if (this.extensionSamplingFrequencyIndex === 15) bitWriterBuffer.writeNBit(this.extensionSamplingFrequency, 24);
      AudioSpecificConfig.writeAudioObjectType(this.audioObjectType, bitWriterBuffer);
    } else if (this.audioObjectType === 22) {
      bitWriterBuffer.writeNBit(this.extensionChannelConfiguration, 4);
    }
    switch ((this.audioObjectType)) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 6:
      case 7:
      case 17:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
        this.writeGaSpecificConfig(bitWriterBuffer);
        break;
      case 8:
        throw new Error(`can't write CelpSpecificConfig yet`);
      case 9:
        throw new Error(`can't write HvxcSpecificConfig yet`);
      case 12:
        throw new Error(`can't write TTSSpecificConfig yet`);
      case 13:
      case 14:
      case 15:
      case 16:
        throw new Error(`can't write StructuredAudioSpecificConfig yet`);
      case 24:
        throw new Error(`can't write ErrorResilientCelpSpecificConfig yet`);
      case 25:
        throw new Error(`can't write ErrorResilientHvxcSpecificConfig yet`);
      case 26:
      case 27:
        throw new Error(`can't write parseParametricSpecificConfig yet`);
      case 28:
        throw new Error(`can't write SSCSpecificConfig yet`);
      case 30:
        bitWriterBuffer.writeNBit(this.sacPayloadEmbedding, 1);
        throw new Error(`can't write SpatialSpecificConfig yet`);
      case 32:
      case 33:
      case 34:
        throw new Error(`can't write MPEG_1_2_SpecificConfig yet`);
      case 35:
        throw new Error(`can't write DSTSpecificConfig yet`);
      case 36:
        bitWriterBuffer.writeNBit(this.fillBits, 5);
        throw new Error(`can't write ALSSpecificConfig yet`);
      case 37:
      case 38:
        throw new Error(`can't write SLSSpecificConfig yet`);
      case 39:
        throw new Error(`can't write ELDSpecificConfig yet`);
      case 40:
      case 41:
        throw new Error(`can't parse SymbolicMusicSpecificConfig yet`);
      default:
    }
    switch ((this.audioObjectType)) {
      case 17:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
      case 26:
      case 27:
      case 39:
        bitWriterBuffer.writeNBit(this.epConfig, 2);
        if (this.epConfig === 2 || this.epConfig === 3) {
          throw new Error(`can't parse ErrorProtectionSpecificConfig yet`);
        }
        if (this.epConfig === 3) {
          bitWriterBuffer.writeNBit(this.directMapping, 1);
          if (this.directMapping === 0) {
            throw new Error('not implemented');
          }
        }
    }
    if (this.outerSyncExtensionType >= 0) {
      bitWriterBuffer.writeNBit(this.outerSyncExtensionType, 11);
      if (this.outerSyncExtensionType === 695) {
        AudioSpecificConfig.writeAudioObjectType(this.extensionAudioObjectType, bitWriterBuffer);
        if (this.extensionAudioObjectType === 5) {
          bitWriterBuffer.writeBool(this.sbrPresentFlag);
          if (this.sbrPresentFlag) {
            bitWriterBuffer.writeNBit(this.extensionSamplingFrequencyIndex, 4);
            if (this.extensionSamplingFrequencyIndex === 15) {
              bitWriterBuffer.writeNBit(this.extensionSamplingFrequency, 24);
            }
            if (this.innerSyncExtensionType >= 0) {
              bitWriterBuffer.writeNBit(this.innerSyncExtensionType, 11);
              if (this.syncExtensionType === 1352) {
                bitWriterBuffer.writeBool(this.psPresentFlag);
              }
            }
          }
        }
        if (this.extensionAudioObjectType === 22) {
          bitWriterBuffer.writeBool(this.sbrPresentFlag);
          if (this.sbrPresentFlag) {
            bitWriterBuffer.writeNBit(this.extensionSamplingFrequencyIndex, 4);
            if (this.extensionSamplingFrequencyIndex === 15) {
              bitWriterBuffer.writeNBit(this.extensionSamplingFrequency, 24);
            }
          }
          bitWriterBuffer.writeNBit(this.extensionChannelConfiguration, 4);
        }
      }
    }
    return out.getBuffer();
  }

  parseGaSpecificConfig(samplingFrequencyIndex: number, channelConfiguration: number, audioObjectType: number, __in: BitStreamInputBuffer) {
    this.frameLengthFlag = __in.readNBit(1);
    this.dependsOnCoreCoder = __in.readNBit(1);
    if (this.dependsOnCoreCoder === 1) {
      this.coreCoderDelay = __in.readNBit(14);
    }
    this.extensionFlag = __in.readNBit(1);
    if (channelConfiguration === 0) {
      throw new Error('can\'t parse program_config_element yet');
    }
    if ((audioObjectType === 6) || (audioObjectType === 20)) {
      this.layerNr = __in.readNBit(3);
    }
    if (this.extensionFlag === 1) {
      if (audioObjectType === 22) {
        this.numOfSubFrame = __in.readNBit(5);
        this.layer_length = __in.readNBit(11);
      }
      if (audioObjectType === 17 || audioObjectType === 19 || audioObjectType === 20 || audioObjectType === 23) {
        this.aacSectionDataResilienceFlag = __in.readBool();
        this.aacScalefactorDataResilienceFlag = __in.readBool();
        this.aacSpectralDataResilienceFlag = __in.readBool();
      }
      this.extensionFlag3 = __in.readNBit(1);
      if (this.extensionFlag3 === 1) {
        throw new Error('not yet implemented');
      }
    }
    this.gaSpecificConfig = true;
  }

  writeGaSpecificConfig(out: BitStreamOutputBuffer) {
    out.writeNBit(this.frameLengthFlag, 1);
    out.writeNBit(this.dependsOnCoreCoder, 1);
    if (this.dependsOnCoreCoder === 1) {
      out.writeNBit(this.coreCoderDelay, 14);
    }
    out.writeNBit(this.extensionFlag, 1);
    if (this.channelConfiguration === 0) {
      throw new Error(`can't parse program_config_element yet`);
    }
    if ((this.audioObjectType === 6) || (this.audioObjectType === 20)) {
      out.writeNBit(this.layerNr, 3);
    }
    if (this.extensionFlag === 1) {
      if (this.audioObjectType === 22) {
        out.writeNBit(this.numOfSubFrame, 5);
        out.writeNBit(this.layer_length, 11);
      }
      if (this.audioObjectType === 17 || this.audioObjectType === 19 || this.audioObjectType === 20 || this.audioObjectType === 23) {
        out.writeBool(this.aacSectionDataResilienceFlag);
        out.writeBool(this.aacScalefactorDataResilienceFlag);
        out.writeBool(this.aacSpectralDataResilienceFlag);
      }
      out.writeNBit(this.extensionFlag3, 1);
      if (this.extensionFlag3 === 1) {
        throw new Error('not yet implemented');
      }
    }
  }

  parseParametricSpecificConfig(samplingFrequencyIndex: number, channelConfiguration: number, audioObjectType: number, __in: BitStreamInputBuffer) {
    this.isBaseLayer = __in.readNBit(1);
    if (this.isBaseLayer === 1) {
      this.parseParaConfig(samplingFrequencyIndex, channelConfiguration, audioObjectType, __in);
    } else {
      this.parseHilnEnexConfig(samplingFrequencyIndex, channelConfiguration, audioObjectType, __in);
    }
  }

  parseParaConfig(samplingFrequencyIndex: number, channelConfiguration: number, audioObjectType: number, __in: BitStreamInputBuffer) {
    this.paraMode = __in.readNBit(2);
    if (this.paraMode !== 1) {
      this.parseErHvxcConfig(samplingFrequencyIndex, channelConfiguration, audioObjectType, __in);
    }
    if (this.paraMode !== 0) {
      this.parseHilnConfig(samplingFrequencyIndex, channelConfiguration, audioObjectType, __in);
    }
    this.paraExtensionFlag = __in.readNBit(1);
    this.parametricSpecificConfig = true;
  }

  parseErHvxcConfig(samplingFrequencyIndex: number, channelConfiguration: number, audioObjectType: number, __in: BitStreamInputBuffer) {
    this.hvxcVarMode = __in.readNBit(1);
    this.hvxcRateMode = __in.readNBit(2);
    this.erHvxcExtensionFlag = __in.readNBit(1);
    if (this.erHvxcExtensionFlag === 1) {
      this.var_ScalableFlag = __in.readNBit(1);
    }
  }

  parseHilnConfig(samplingFrequencyIndex: number, channelConfiguration: number, audioObjectType: number, __in: BitStreamInputBuffer) {
    this.hilnQuantMode = __in.readNBit(1);
    this.hilnMaxNumLine = __in.readNBit(8);
    this.hilnSampleRateCode = __in.readNBit(4);
    this.hilnFrameLength = __in.readNBit(12);
    this.hilnContMode = __in.readNBit(2);
  }

  parseHilnEnexConfig(samplingFrequencyIndex: number, channelConfiguration: number, audioObjectType: number, __in: BitStreamInputBuffer) {
    this.hilnEnhaLayer = __in.readNBit(1);
    if (this.hilnEnhaLayer === 1) {
      this.hilnEnhaQuantMode = __in.readNBit(2);
    }
  }

  public getConfigBytes(): Buffer {
    return this.serializeConfigBytes();
  }

  public getSamplingFrequency(): number {
    return samplingFrequencyIndexMap.get(this.samplingFrequencyIndex);
  }

  public setSamplingFrequency(samplingFrequency: number) {
    this.samplingFrequency = samplingFrequency;
  }

  public getExtensionSamplingFrequency(): number {
    return samplingFrequencyIndexMap.get(this.extensionSamplingFrequencyIndex);
  }

  public getChannelConfiguration(): number {
    return this.channelConfiguration;
  }

  public setChannelConfiguration(channelConfiguration: number) {
    this.channelConfiguration = channelConfiguration;
  }
}
