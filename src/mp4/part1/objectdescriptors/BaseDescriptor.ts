import { StreamInputBuffer, StreamOutputBuffer } from '@gradii/stream-buffer';

/**
 *
 */
export abstract class BaseDescriptor {
  tag: number;

  sizeOfInstance: number;

  sizeBytes: number;

  public constructor() {
    if (this.tag === undefined) this.tag = 0;
    if (this.sizeOfInstance === undefined) this.sizeOfInstance = 0;
    if (this.sizeBytes === undefined) this.sizeBytes = 0;
  }

  public getTag(): number {
    return this.tag;
  }

  public writeSize(bb: StreamOutputBuffer, size: number) {
    let pos: number = bb.position;
    let i: number = 0;
    while ((size > 0 || i < this.sizeBytes)) {
      i++;
      if (size > 0) {
        bb.put(pos + this.getSizeSize() - i, (<number>(size & 0x7f) | 0));
      } else {
        bb.put(pos + this.getSizeSize() - i, (<number>(0x80) | 0));
      }
      size >>>= 7;
    }
    (<Buffer>bb).position(pos + this.getSizeSize());
  }

  public getSizeSize(): number {
    let size: number = this.getContentSize();
    let i: number = 0;
    while ((size > 0 || i < this.sizeBytes)) {
      size >>>= 7;
      i++;
    }
    return i;
  }

  public getSize(): number {
    return this.getContentSize() + this.getSizeSize() + 1;
  }

  public parse(tag: number, bb: Buffer) {
    this.tag = tag;
    let i: number = 0;
    let tmp: number = bb.readUInt8();
    i++;
    this.sizeOfInstance = tmp & 127;
    while ((tmp >>> 7 === 1)) {
      tmp = bb.readUInt8();
      i++;
      this.sizeOfInstance = this.sizeOfInstance << 7 | tmp & 127;
    }
    this.sizeBytes = i;
    let detailSource: Buffer = bb.slice();
    (<Buffer>detailSource).limit(this.sizeOfInstance);
    this.parseDetail(detailSource);
    (<Buffer>bb).position(bb.position() + this.sizeOfInstance);
  }

  public abstract parseDetail(bb: StreamInputBuffer);

  public abstract serialize(): Buffer;

  abstract getContentSize(): number;


}

