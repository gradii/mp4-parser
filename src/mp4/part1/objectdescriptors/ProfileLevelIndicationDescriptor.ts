import { BaseDescriptor } from './BaseDescriptor';
import { StreamInputBuffer, StreamOutputBuffer } from '@gradii/stream-buffer';

/**
 * class ProfileLevelIndicationIndexDescriptor () extends BaseDescriptor
 * : bit(8) ProfileLevelIndicationIndexDescrTag {
 * bit(8) profileLevelIndicationIndex;
 * }
 * @class
 * @extends BaseDescriptor
 */
export class ProfileLevelIndicationDescriptor extends BaseDescriptor {
  tag = 20;

  profileLevelIndicationIndex: number = 0;

  /**
   *
   * @param {Buffer} bb
   */
  public parseDetail(bb: StreamInputBuffer) {
    this.profileLevelIndicationIndex = bb.readUInt8();
  }

  /**
   *
   * @return {Buffer}
   */
  public serialize(): Buffer {
    let out: StreamOutputBuffer = new StreamOutputBuffer(this.getSize());
    out.writeUInt8(20);
    this.writeSize(out, this.getContentSize());
    out.writeUInt8(this.profileLevelIndicationIndex);
    return out.getBuffer(true);
  }

  /**
   *
   * @return {number}
   */
  public getContentSize(): number {
    return 1;
  }

}

