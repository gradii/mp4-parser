import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

export function ftyp({
  majorBrand = 'isom', //isom
  minorVersion = 0x00000001,
  compatibleBrands = ['isom', 'avc1']
} = {}) {
  const stream = new StreamOutputBuffer();
  stream.writeString(majorBrand, 4, 'binary');
  stream.writeUInt32BE(minorVersion);
  compatibleBrands.forEach(it => {
    stream.writeString(it, 4, 'binary');
  });

  return generateBox('ftyp', stream.getBuffer());
}
