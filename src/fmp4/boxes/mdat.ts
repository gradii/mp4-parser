import { generateBox } from '../utils/generateBox';

export function mdat(data: Buffer) {
  return generateBox('mdat', data);
}
