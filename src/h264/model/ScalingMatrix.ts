/* Generated from Java with JSweet 2.3.0-SNAPSHOT - http://www.jsweet.org */
import { ScalingList } from './ScalingList';

export class ScalingMatrix {
  public ScalingList4x4: ScalingList[] = [];
  public ScalingList8x8: ScalingList[] = [];

  /**
   *
   * @return {string}
   */
  public toString(): string {
    return `ScalingMatrix{ScalingList4x4=[${this.ScalingList4x4.join(', ')}]
, ScalingList8x8=[${this.ScalingList8x8.join(', ')}]
}`;
  }
}

