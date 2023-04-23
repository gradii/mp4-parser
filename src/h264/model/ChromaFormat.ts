/**
 * Chroma format enum
 */
export class ChromaFormat {
  public static MONOCHROME: ChromaFormat = new ChromaFormat(0, 0, 0);
  public static YUV_420: ChromaFormat = new ChromaFormat(1, 2, 2);
  public static YUV_422: ChromaFormat = new ChromaFormat(2, 2, 1);
  public static YUV_444: ChromaFormat = new ChromaFormat(3, 1, 1);

  public constructor(
    private id: number        = 0,
    private subWidth: number  = 0,
    private subHeight: number = 0
  ) {
  }

  public static fromId(id: number): ChromaFormat {
    if (id === ChromaFormat.MONOCHROME.id) {
      return ChromaFormat.MONOCHROME;
    } else if (id === ChromaFormat.YUV_420.id) {
      return ChromaFormat.YUV_420;
    } else if (id === ChromaFormat.YUV_422.id) {
      return ChromaFormat.YUV_422;
    } else if (id === ChromaFormat.YUV_444.id) {
      return ChromaFormat.YUV_444;
    }
    return null;
  }

  public getId(): number {
    return this.id;
  }

  public getSubWidth(): number {
    return this.subWidth;
  }

  public getSubHeight(): number {
    return this.subHeight;
  }

  /**
   *
   * @return {string}
   */
  public toString(): string {
    return `ChromaFormat{
 id=${this.id},
 subWidth=${this.subWidth},
 subHeight=${this.subHeight}}`;
  }
}
