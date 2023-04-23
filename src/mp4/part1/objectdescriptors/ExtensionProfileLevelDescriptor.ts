import { BaseDescriptor } from './BaseDescriptor';
import { StreamInputBuffer } from '@gradii/stream-buffer';

/**
 * abstract class ExtensionDescriptor extends BaseDescriptor
 * : bit(8) tag = ExtensionProfileLevelDescrTag, ExtDescrTagStartRange ..
 * ExtDescrTagEndRange {
 * // empty. To be filled by classes extending this class.
 * }
 * @class
 * @extends BaseDescriptor
 */
export class ExtensionProfileLevelDescriptor extends BaseDescriptor {
  tag = 19;

  bytes: number[];

  /**
   *
   * @param {Buffer} bb
   */
  public parseDetail(bb: StreamInputBuffer) {
    if (this.getSize() > 0) {
      return bb.read(this.getSize());
    }
  }

  /**
   *
   * @return {Buffer}
   */
  public serialize(): Buffer {
    throw new Error('Not Implemented');
  }

  /**
   *
   * @return {number}
   */
  getContentSize(): number {
    throw new Error('Not Implemented');
  }

}
