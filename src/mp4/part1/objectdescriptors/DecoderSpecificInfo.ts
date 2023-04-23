import { BaseDescriptor } from './BaseDescriptor';
import { StreamInputBuffer, StreamOutputBuffer } from '@gradii/stream-buffer';

/**
 * abstract class DecoderSpecificInfo extends BaseDescriptor : bit(8)
 * tag=DecSpecificInfoTag
 * {
 * // empty. To be filled by classes extending this class.
 * }
 * @class
 * @extends BaseDescriptor
 */

export class DecoderSpecificInfo extends BaseDescriptor {
  tag = 5;

  bytes: Buffer;

  /**
   *
   * @param {Buffer} bb
   */
  public parseDetail(bb: StreamInputBuffer) {
    return bb.read(bb.getLength() - bb.position);
  }

  public setData(bytes: Buffer) {
    this.bytes = bytes;
  }

  getContentSize(): number {
    return this.bytes.length;
  }

  public serialize(): Buffer {
    let out: StreamOutputBuffer = new StreamOutputBuffer(this.getSize());
    out.writeUInt8(this.tag);
    this.writeSize(out, this.getContentSize());
    out.write(this.bytes);
    return out.getBuffer(true);
  }
}

