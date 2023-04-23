/**
 * A class responsible for outputting exp-Golumb values into binary stream
 *
 */
import { BitStreamOutputBuffer, StreamOutputBuffer } from '@gradii/stream-buffer';

export class CAVLCWriter extends BitStreamOutputBuffer {
  public constructor(out: StreamOutputBuffer) {
    super(out);
  }

  public writeU(value?: any, n?: any): any {
    return <any>this.writeNBit(value, n);
  }

  public writeUE(value: number) {
    let bits: number = 0;
    let cumul: number = 0;
    for (let i: number = 0; i < 52; i++) {
      if (value < cumul + (1 << i)) {
        bits = i;
        break;
      }
      cumul += (1 << i);
    }
    this.writeNBit(0, bits);
    this.write1Bit(1);
    this.writeNBit(value - cumul, bits);
  }

  public writeSE(value: number) {
    this.writeUE((value << 1) * (value < 0 ? -1 : 1) + (value > 0 ? 1 : 0));
  }

  public writeBool(value: boolean) {
    this.write1Bit(value ? 1 : 0);
  }

  public writeTrailingBits() {
    this.write1Bit(1);
    this.writeRemainingZero();
    this.flush();
  }

}

