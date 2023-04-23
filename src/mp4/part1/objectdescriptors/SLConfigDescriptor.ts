/**
 * class SLConfigDescriptor extends BaseDescriptor : bit(8) tag=SLConfigDescrTag {
 * bit(8) predefined;
 * if (predefined==0) {
 * bit(1) useAccessUnitStartFlag;
 * bit(1) useAccessUnitEndFlag;
 * bit(1) useRandomAccessPointFlag;
 * bit(1) hasRandomAccessUnitsOnlyFlag;
 * bit(1) usePaddingFlag;
 * bit(1) useTimeStampsFlag;
 * bit(1) useIdleFlag;
 * bit(1) durationFlag;
 * bit(32) timeStampResolution;
 * bit(32) OCRResolution;
 * bit(8) timeStampLength; // must be ≤ 64
 * bit(8) OCRLength; // must be ≤ 64
 * bit(8) AU_Length; // must be ≤ 32
 * bit(8) instantBitrateLength;
 * bit(4) degradationPriorityLength;
 * bit(5) AU_seqNumLength; // must be ≤ 16
 * bit(5) packetSeqNumLength; // must be ≤ 16
 * bit(2) reserved=0b11;
 * }
 * if (durationFlag) {
 * bit(32) timeScale;
 * bit(16) accessUnitDuration;
 * bit(16) compositionUnitDuration;
 * }
 * if (!useTimeStampsFlag) {
 * bit(timeStampLength) startDecodingTimeStamp;
 * bit(timeStampLength) startCompositionTimeStamp;
 * }
 * }
 * @class
 * @extends BaseDescriptor
 */
import { BaseDescriptor } from './BaseDescriptor';
import { StreamInputBuffer, StreamOutputBuffer } from '@gradii/stream-buffer';

export class SLConfigDescriptor extends BaseDescriptor {
  predefined: number;

  public constructor() {
    super();
    if (this.predefined === undefined) this.predefined = 0;
    this.tag = 6;
  }

  public getPredefined(): number {
    return this.predefined;
  }

  public setPredefined(predefined: number) {
    this.predefined = predefined;
  }

  /**
   *
   * @param {Buffer} bb
   */
  public parseDetail(bb: StreamInputBuffer) {
    this.predefined = bb.readUInt8();
  }

  getContentSize(): number {
    return 1;
  }

  public serialize(): Buffer {
    let out: StreamOutputBuffer = new StreamOutputBuffer(this.getSize());
    out.writeUInt8(6);
    this.writeSize(out, this.getContentSize());
    out.writeUInt8(this.predefined);
    return out.getBuffer(true);
  }
}

