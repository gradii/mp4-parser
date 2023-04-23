import { StreamInputBuffer, StreamOutputBuffer } from '@gradii/stream-buffer';


export class StreamHelper {

  public static writeUInt24(bb: StreamOutputBuffer, i: number) {
    i = i & 0xffffff;
    bb.writeUInt16BE(i >>> 8);
    bb.writeUInt8(i);
  }

  public static writeUInt48(bb: StreamOutputBuffer, l: number) {
    bb.writeUInt16BE((l / Math.pow(2, 32)) | 0);
    bb.writeUInt32BE(l & 0xffffffff);

  }

  public static writeFixedPoint1616(sb: StreamOutputBuffer, v: number) {
    const result = (v * 0x10000);
    sb.writeUInt32BE(result);
  }

  public static writeFixedPoint0230(sb: StreamOutputBuffer, v: number) {
    const result = (v * 0x40000000) | 0;
    sb.writeUInt32BE(result);
  }

  public static writeFixedPoint88(sb: StreamOutputBuffer, v: number) {
    const result = (v * 0x100);
    sb.writeUInt8(((result & 0xFF00) >> 8));
    sb.writeUInt8(((result & 0x00FF)));
  }

  public static writeIso639(bb: StreamOutputBuffer, language: string) {
    if (/* getBytes */(language).split('').map(s => s.charCodeAt(0)).length !== 3) {
      throw new Error(`"${language}" language string isn't exactly 3 characters long!`);
    }
    let bits = 0;
    for (let i = 0; i < 3; i++) {
      bits += (/* getBytes */(language).split('').map(s => s.charCodeAt(0))[i] - 96) << (2 - i) * 5;
    }
    bb.writeUInt16BE(bits);
  }


  public static readFixedPoint1616(bb: StreamInputBuffer): number {
    return bb.readUInt32BE() / 0x10000;
  }

  public static readFixedPoint0230(bb: StreamInputBuffer): number {
    return bb.readUInt32BE() / (1 << 30);
  }

  public static readFixedPoint88(bb: StreamInputBuffer): number {
    return bb.readUInt16BE() / 256;
  }

  public static readIso639(bb: StreamInputBuffer): string {
    const bits: number = bb.readUInt16BE();
    let result = '';
    for (let i = 0; i < 3; i++) {
      const c: number = (bits >> (2 - i) * 5) & 31;
      result += String.fromCharCode((c + 96));
    }
    return result;
  }

  public static read4cc(bb: StreamInputBuffer): string {
    const codeBytes: Buffer = bb.read(4);
    try {
      return codeBytes.toString('ascii');
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public static readUInt48(byteBuffer: StreamInputBuffer): number {
    let result: number = (n => n < 0 ? Math.ceil(n) : Math.floor(n))(byteBuffer.readUInt16BE()) * Math.pow(2, 32);
    if (result < 0) {
      throw new Error('I don\'t know how to deal with UInt64! long is not sufficient and I don\'t want to use BigInt');
    }
    result += byteBuffer.readUInt32BE();
    return result;
  }

}
