/**
 * mp4 box out of range error
 */
export class Mp4BoxRangeError extends RangeError {
  constructor({
    boxSize,
    boxType,
    currentSize,
  }) {
    super(`box: ${boxType} out of range, current size is ${currentSize}, box size is ${boxSize}`);
  }

}
