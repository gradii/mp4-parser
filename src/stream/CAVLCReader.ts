import { BitStreamInputBuffer, StreamInputBuffer } from '@gradii/stream-buffer';

export class CAVLCReader extends BitStreamInputBuffer {
  public constructor(is: StreamInputBuffer) {
    super(is);
  }

  public readUE(): number {
    let cnt: number = 0;
    while ((this.read1Bit() === 0)) {
      cnt++;
    }
    let res: number = 0;
    if (cnt > 0) {
      let val: number = this.readNBit(cnt);
      res = ((1 << cnt) - 1 + val) | 0;
    }
    return res;
  }

  public readSE(): number {
    let val: number = this.readUE();
    let sign: number = ((val & 1) << 1) - 1;
    val = ((val >> 1) + (val & 1)) * sign;
    return val;
  }

  public readU(i: number): number {
    return (this.readNBit(i) | 0);
  }

  public read(payloadSize: number): Buffer {
    let result: Buffer = new Buffer(payloadSize);
    for (let i: number = 0; i < payloadSize; i++) {
      {
        result.writeUInt8(this.readByte() | 0, i);
      }
    }
    return result;
  }

  public readAE(): boolean {
    throw new Error('Stan');
  }

  public readTE(max: number): number {
    if (max > 1) return this.readUE();
    return ~this.read1Bit() & 1;
  }

  public readAEI(): number {
    throw new Error('Stan');
  }

  public readME(): number {
    return this.readUE();
  }

  public readCE(bt: any): any {
    while (true) {
      {
        let bit: number = this.read1Bit();
        bt = bt.down(bit);
        if (bt == null) {
          throw new Error('Illegal code');
        }
        let i: any = bt.getValue();
        if (i != null) {
          return i;
        }
      }
    }
  }

  public readZeroBitCount(message: string): number {
    let count: number = 0;
    while ((this.read1Bit() === 0)) {
      count++;
    }
    return count;
  }

  public readTrailingBits() {
    this.read1Bit();
    this.readRemainingByte();
  }
}
