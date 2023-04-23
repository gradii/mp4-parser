import { generateBox } from '../../src/fmp4/utils/generateBox';

describe('generateBox', () => {
  it('shuold generate box', () => {
    const content = new Buffer([1, 2, 3, 4, 5, 6, 7, 8]);
    // prettier-ignore
    expect(generateBox('mvhd', content)).toEqual(new Buffer([
      0x00, 0x00, 0x00, 0x10,
      0x6d, 0x76, 0x68, 0x64,
      0x01, 0x02, 0x03, 0x04,
      0x05, 0x06, 0x07, 0x08
    ]));
  });
});
