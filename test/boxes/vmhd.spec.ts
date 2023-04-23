import { vmhd } from '../../src/fmp4/boxes/vmhd';
import * as dump from 'buffer-hexdump';

describe('vmhd box parse', () => {
  it('parse box', () => {
    const vmhdDump = dump(vmhd({
      version     : 0,
      graphicsmode: 0,
      opcolor     : [0, 0, 0]
    }));
    const expected = dump(Buffer.from(`
      00 00 00 14 76 6D 68 64 00 00 00 01 00 00 00 00
      00 00 00 00                                         
    `.replace(/\s/g, ''), 'hex'));

    expect(vmhdDump).toEqual(expected);
  });
});
