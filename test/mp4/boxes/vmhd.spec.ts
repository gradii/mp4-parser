import { vmhd } from '../../../src/mp4/boxes';

describe('vmhd box', () => {
  it('should get the vmhd box tree', () => {
    // prettier-ignore
    const vmhdBody = new Buffer([
      0x00, 0x00, 0x00, 0x01,  // version + flags
      0x00, 0x00,              // graphicsmode
      0x00, 0x00, 0x00, 0x00,  // opcolor
      0x00, 0x00,
    ]);

    expect(vmhd(vmhdBody)).toEqual({
      flags       : 1,
      version     : 0,
      graphicsmode: 0,
      opcolor     : [0, 0, 0],
    });
  });
});
