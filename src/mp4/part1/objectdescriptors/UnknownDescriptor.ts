import { BaseDescriptor } from './BaseDescriptor';
import { StreamInputBuffer } from '@gradii/stream-buffer';

export class UnknownDescriptor extends BaseDescriptor {

  /*private*/
  data: Buffer;

  /**
   *
   * @param {Buffer} bb
   */
  public parseDetail(bb: StreamInputBuffer) {
    this.data = bb.read(bb.getLength());
  }

  getContentSize(): number {
    return this.data.length;
  }

  serialize(): Buffer {
    return this.data;
  }
}
