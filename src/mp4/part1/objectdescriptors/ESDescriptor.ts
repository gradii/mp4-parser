import { BaseDescriptor } from './BaseDescriptor';
import { SLConfigDescriptor } from './SLConfigDescriptor';
import { DecoderConfigDescriptor } from './DecoderConfigDescriptor';
import { StreamInputBuffer, StreamOutputBuffer } from '@gradii/stream-buffer';

export class ESDescriptor extends BaseDescriptor {
  tag = 3;

  esId: number;
  streamDependenceFlag: number;
  URLFlag: number;
  oCRstreamFlag: number;
  streamPriority: number;
  URLLength: number = 0;
  URLString: string;
  remoteODFlag: number;
  dependsOnEsId: number;
  oCREsId: number;
  decoderConfigDescriptor: DecoderConfigDescriptor;
  slConfigDescriptor: SLConfigDescriptor;
  otherDescriptors: Array<BaseDescriptor> = <any>([]);

  /**
   *
   * @param {Buffer} bb
   */
  public parseDetail(bb: StreamInputBuffer) {
    this.esId = bb.readUInt16BE();
    let data: number = bb.readUInt8();
    this.streamDependenceFlag = data >>> 7;
    this.URLFlag = (data >>> 6) & 1;
    this.oCRstreamFlag = (data >>> 5) & 1;
    this.streamPriority = data & 0x1f;
    if (this.streamDependenceFlag === 1) {
      this.dependsOnEsId = bb.readUInt16BE();
    }
    if (this.URLFlag === 1) {
      this.URLLength = bb.readUInt8();
      this.URLString = bb.readString(this.URLLength);
    }
    if (this.oCRstreamFlag === 1) {
      this.oCREsId = bb.readUInt16BE();
    }
    while ((bb.getLength() - bb.getOffset() > 1)) {
      throw new Error(`Another Descriptor is not support`);
      // let descriptor: BaseDescriptor = ObjectDescriptorFactory.createFrom(-1, bb);
      // if (descriptor != null && descriptor instanceof <any>DecoderConfigDescriptor) {
      //   this.decoderConfigDescriptor = <DecoderConfigDescriptor>descriptor;
      // } else if (descriptor != null && descriptor instanceof <any>SLConfigDescriptor) {
      //   this.slConfigDescriptor = <SLConfigDescriptor>descriptor;
      // } else {
      //   /* add */
      //   (this.otherDescriptors.push(descriptor) > 0);
      // }
    }
  }

  getContentSize(): number {
    let out: number = 3;
    if (this.streamDependenceFlag > 0) {
      out += 2;
    }
    if (this.URLFlag > 0) {
      out += 1 + this.URLLength;
    }
    if (this.oCRstreamFlag > 0) {
      out += 2;
    }
    out += this.decoderConfigDescriptor.getSize();
    out += this.slConfigDescriptor.getSize();
    if (/* size */(<number>this.otherDescriptors.length) > 0) {
      throw new Error(` Doesn't handle other descriptors yet`);
    }
    return out;
  }

  public serialize(): Buffer {
    let out = new StreamOutputBuffer();
    out.writeUInt8(3);

    this.writeSize(out, this.getContentSize());

    out.writeUInt16BE(this.esId);
    let flags: number = (this.streamDependenceFlag << 7) |
                        (this.URLFlag << 6) | (this.oCRstreamFlag << 5) |
                        (this.streamPriority & 31);
    out.writeUInt8(flags);
    if (this.streamDependenceFlag > 0) {
      out.writeUInt16BE(this.dependsOnEsId);
    }
    if (this.URLFlag > 0) {
      out.writeUInt8(this.URLLength);
      out.writeString(this.URLString, this.URLLength, 'utf8');
    }
    if (this.oCRstreamFlag > 0) {
      out.writeUInt16BE(this.oCREsId);
    }
    let dec: Buffer = this.decoderConfigDescriptor.serialize();
    let sl: Buffer = this.slConfigDescriptor.serialize();
    out.write(dec);
    out.write(sl);
    return out.getBuffer();
  }
}
