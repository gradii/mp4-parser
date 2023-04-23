import { BaseDescriptor } from './BaseDescriptor';
import { StreamInputBuffer, StreamOutputBuffer } from '@gradii/stream-buffer';

/**
 * abstract class ExtensionDescriptor extends BaseDescriptor
 * : bit(8) tag = ExtensionProfileLevelDescrTag, ExtDescrTagStartRange ..
 * ExtDescrTagEndRange {
 * // empty. To be filled by classes extending this class.
 * }
 * @class
 * @extends BaseDescriptor
 */

export class ExtensionDescriptor extends BaseDescriptor {
  data: Buffer;

  /**
   *
   * @param {Buffer} bb
   */
  public parseDetail(bb: StreamInputBuffer) {
    bb.skip(bb.position + this.data.byteLength);
  }

  /**
   *
   * @return {Buffer}
   */
  public serialize(): Buffer {
    let out: StreamOutputBuffer = new StreamOutputBuffer(this.getSize());
    out.writeUInt8(this.tag);
    this.writeSize(out, this.getContentSize());
    out.write(this.data);
    return out.getBuffer();
  }

  /**
   *
   * @return {number}
   */
  getContentSize(): number {
    return this.data.byteLength;
  }
}
