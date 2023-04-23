import { generateBox } from '../utils/generateBox';

export function url() {
  // prettier-ignore
  return generateBox('url ', new Buffer([0x00, 0x00, 0x00, 0x01]));
}
