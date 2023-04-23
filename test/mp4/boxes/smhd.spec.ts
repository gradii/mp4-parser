import { smhd } from '../../../src/mp4/boxes';

describe('smhd box', () => {
  it('should get the smhd box tree', () => {
    // prettier-ignore
    const smhdBody = new Buffer([
      0x00, 0x00, 0x00, 0x00,  // version + flags
      0x00, 0x00, 0x00, 0x00,  // data
    ]);

    expect(smhd(smhdBody)).toEqual({
      flags  : 0,
      version: 0,
      balance: 0,
    });
  });
});
