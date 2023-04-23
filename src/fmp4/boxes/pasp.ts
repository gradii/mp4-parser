import { StreamOutputBuffer } from '@gradii/stream-buffer';
import { generateBox } from '../utils/generateBox';

/**
 * 45ED80        Pixel Aspect Ratio (16 bytes)
 * 45ED80         Header (8 bytes)
 * 45ED80          Size:                          16 (0x00000010)
 * 45ED84          Name:                          pasp
 * 45ED88         hSpacing:                       1 (0x00000001)
 * 45ED8C         vSpacing:                       1 (0x00000001)
 */
/**
 *
 * @param hSpacing
 * @param vSpacing
 */
export function pasp({
  hSpacing = 0x00000001,
  vSpacing = 0x00000001
} = {}) {
  let stream = new StreamOutputBuffer(0x10);

  stream.writeUInt32BE(hSpacing);
  stream.writeUInt32BE(vSpacing);

  return generateBox('pasp', stream.getBuffer());
}
