import { BaseDescriptor } from './BaseDescriptor';
import { DecoderSpecificInfo } from './DecoderSpecificInfo';
import { AudioSpecificConfig } from './AudioSpecificConfig';
import { ProfileLevelIndicationDescriptor } from './ProfileLevelIndicationDescriptor';
import { StreamInputBuffer, StreamOutputBuffer } from '@gradii/stream-buffer';

/**
 * class DecoderConfigDescriptor extends BaseDescriptor : bit(8)
 * tag=DecoderConfigDescrTag {
 * bit(8) objectTypeIndication;
 * bit(6) streamType;
 * bit(1) upStream;
 * const bit(1) reserved=1;
 * bit(24) bufferSizeDB;
 * bit(32) maxBitrate;
 * bit(32) avgBitrate;
 * DecoderSpecificInfo decSpecificInfo[0 .. 1];
 * profileLevelIndicationIndexDescriptor profileLevelIndicationIndexDescr
 * [0..255];
 * }
 * @class
 * @extends BaseDescriptor
 */
export class DecoderConfigDescriptor extends BaseDescriptor {
  tag = 4;

  objectTypeIndication: number = 0;
  streamType: number = 0;
  upStream: number = 0;
  bufferSizeDB: number = 0;
  maxBitRate: number = 0;
  avgBitRate: number = 0;
  decoderSpecificInfo: DecoderSpecificInfo;
  audioSpecificInfo: AudioSpecificConfig;
  profileLevelIndicationDescriptors: Array<ProfileLevelIndicationDescriptor> = <any>([]);
  configDescriptorDeadBytes: number[];


  /**
   *
   * @param {Buffer} bb
   */
  public parseDetail(bb: StreamInputBuffer) {
    this.objectTypeIndication = bb.readUInt8();
    let data: number = bb.readUInt8();
    this.streamType = data >>> 2;
    this.upStream = (data >> 1) & 1;
    this.bufferSizeDB = (bb.readUInt16BE() << 8) | bb.readUInt8();
    this.maxBitRate = bb.readUInt32BE();
    this.avgBitRate = bb.readUInt32BE();
    let descriptor: BaseDescriptor;
    while ((bb.getLength() - bb.position > 2)) {
      /* todo
       let begin: number = bb.position;
       descriptor = ObjectDescriptorFactory.createFrom(this.objectTypeIndication, bb);
       let read: number = bb.position - begin;
       if (descriptor != null) {
       let size: number = descriptor.getSize();
       if (read < size) {
       this.configDescriptorDeadBytes = (s => {
       let a = [];
       while (s-- > 0) a.push(0);
       return a;
       })(size - read);
       bb.get(this.configDescriptorDeadBytes);
       }
       }
       if (descriptor != null && descriptor instanceof <any>DecoderSpecificInfo) {
       this.decoderSpecificInfo = <DecoderSpecificInfo>descriptor;
       } else if (descriptor != null && descriptor instanceof <any>AudioSpecificConfig) {
       this.audioSpecificInfo = <AudioSpecificConfig>descriptor;
       } else if (descriptor != null && descriptor instanceof <any>ProfileLevelIndicationDescriptor) {
       /!* add *!/
       (this.profileLevelIndicationDescriptors.push(<ProfileLevelIndicationDescriptor>descriptor) > 0);
       }*/
    }
  }

  getContentSize(): number {
    let out: number = 13
                      + (this.audioSpecificInfo == null ? 0 : this.audioSpecificInfo.getSize())
                      + (this.decoderSpecificInfo == null ? 0 : this.decoderSpecificInfo.getSize());
    for (let index456 = 0; index456 < this.profileLevelIndicationDescriptors.length; index456++) {
      let profileLevelIndicationDescriptor = this.profileLevelIndicationDescriptors[index456];
      {
        out += profileLevelIndicationDescriptor.getSize();
      }
    }
    return out;
  }

  public serialize(): Buffer {
    const out = new StreamOutputBuffer(this.getSize());
    out.writeUInt8(this.tag);
    this.writeSize(out, this.getContentSize());
    out.writeUInt8(this.objectTypeIndication);

    let flags: number = (this.streamType << 2) | (this.upStream << 1) | 1;
    out.writeUInt8(flags);
    out.writeUInt16BE((this.bufferSizeDB >>> 8) & 0xffff);
    out.writeUInt8(this.bufferSizeDB & 0xff);
    out.writeUInt32BE(this.maxBitRate);
    out.writeUInt32BE(this.avgBitRate);
    if (this.decoderSpecificInfo != null) {
      let bb: Buffer = this.decoderSpecificInfo.serialize();
      out.write(bb);
    }
    if (this.audioSpecificInfo != null) {
      let bb: Buffer = this.audioSpecificInfo.serialize();
      out.write(bb);
    }
    for (let index457 = 0; index457 < this.profileLevelIndicationDescriptors.length; index457++) {
      let profileLevelIndicationDescriptor = this.profileLevelIndicationDescriptors[index457];
      {
        out.write(profileLevelIndicationDescriptor.serialize());
      }
    }
    return out.getBuffer(true);
  }
}
