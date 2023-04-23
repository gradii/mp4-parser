import { CAVLCWriter } from '../../stream/CAVLCWriter';
import { CAVLCReader } from '../../stream/CAVLCReader';

export class ScalingList {
  public scalingList: number[];
  public useDefaultScalingMatrixFlag: boolean = false;

  public static read(is: CAVLCReader, sizeOfScalingList: number): ScalingList {
    let sl: ScalingList = new ScalingList();
    sl.scalingList = new Array(sizeOfScalingList);
    let lastScale: number = 8;
    let nextScale: number = 8;
    for (let j: number = 0; j < sizeOfScalingList; j++) {
      {
        if (nextScale !== 0) {
          let deltaScale: number = is.readSE();
          nextScale = (lastScale + deltaScale + 256) % 256;
          sl.useDefaultScalingMatrixFlag = (j === 0 && nextScale === 0);
        }
        sl.scalingList[j] = nextScale === 0 ? lastScale : nextScale;
        lastScale = sl.scalingList[j];
      }
    }
    return sl;
  }

  public write(out: CAVLCWriter) {
    if (this.useDefaultScalingMatrixFlag) {
      out.writeSE(0);
      return;
    }
    let lastScale: number = 8;
    let nextScale: number = 8;
    for (let j: number = 0; j < this.scalingList.length; j++) {
      {
        if (nextScale !== 0) {
          let deltaScale: number = this.scalingList[j] - lastScale - 256;
          out.writeSE(deltaScale);
        }
        lastScale = this.scalingList[j];
      }
    }
  }

  public toString(): string {
    return `ScalingList{scalingList=${this.scalingList}, useDefaultScalingMatrixFlag=${this.useDefaultScalingMatrixFlag}}`;
  }
}


