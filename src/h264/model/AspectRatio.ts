/**
 * Aspect ratio
 * <p>
 * dynamic enum</p>
 *
 */

export const AspectRatio_Extended_SAR = 0xff;

export class AspectRatio {
  public static Extended_SAR: AspectRatio = new AspectRatio(0xff);

  constructor(private value: number = 0) {
  }

  public static fromValue(value: number): AspectRatio {
    if (value === AspectRatio.Extended_SAR.value) {
      return AspectRatio.Extended_SAR;
    }
    return new AspectRatio(value);
  }

  public toString(): string {
    return `AspectRatio{value=${this.value}}`;
  }
}
