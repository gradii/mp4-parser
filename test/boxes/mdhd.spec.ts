import { mdhd } from '../../src/fmp4/boxes/mdhd';
import * as dump from 'buffer-hexdump';

describe('mdhd box parse', () => {
  it('parse box', () => {
    const mdhdDump = dump(mdhd({
      version          : 0,
      flags            : 0x000000,
      creation_time    : 0,
      modification_time: 0,
      timescale        : 15360,
      duration         : 452096,
      language         : 21956,
      quality          : 0
    }));
    const expected = dump(Buffer.from(`
      00 00 00 20 6D 64 68 64 00 00 00 00 00 00 00 00
      00 00 00 00 00 00 3C 00 00 06 E6 00 55 C4 00 00
    `.replace(/\s/g, ''), 'hex'));

    expect(mdhdDump).toEqual(expected);
  });
});
