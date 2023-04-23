import { ftyp } from '../../src/fmp4/boxes/ftyp';
import * as dump from 'buffer-hexdump';

describe('test ftyc box', () => {
  it('ftyp box generate', () => {

    const ftypDump = dump(ftyp({
      majorBrand      : 'mp42',
      minorVersion    : 0x00000001,
      compatibleBrands: [
        'isom', 'mp41', 'mp42'
      ]
    }));

    const expected = dump(Buffer.from([
      0x00, 0x00, 0x00, 0x1c, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x32, 0x00, 0x00, 0x00, 0x01,
      0x69, 0x73, 0x6f, 0x6d, 0x6d, 0x70, 0x34, 0x31, 0x6d, 0x70, 0x34, 0x32
    ]));

    expect(ftypDump).toEqual(expected);
  });
});
