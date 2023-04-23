import { hdlr } from '../../src/fmp4/boxes/hdlr';
import * as dump from 'buffer-hexdump';

describe('hdlr box parse', () => {
  it('parse box', () => {
    const hdlrDump = dump(hdlr({
      version: 0,
      flags  : 0,
      type   : 'vide',
      name   : 'VideoHandler'
    }));
    const expected = dump(Buffer.from(`
      00 00 00 2D 68 64 6C 72 00 00 00 00 00 00 00 00
      76 69 64 65 00 00 00 00 00 00 00 00 00 00 00 00
      56 69 64 65 6F 48 61 6E 64 6C 65 72 00
    `.replace(/\s/g, ''), 'hex'));

    expect(hdlrDump).toEqual(expected);
  });

  it('parse sound box', () => {
    const hdlrDump = dump(hdlr({
      version: 0,
      flags  : 0,
      type   : 'soun',
      name   : 'SoundHandler'
    }));
    const expected = dump(Buffer.from(`
      00 00 00 2D 68 64 6C 72 00 00 00 00 00 00 00 00
      73 6F 75 6E 00 00 00 00 00 00 00 00 00 00 00 00
      53 6F 75 6E 64 48 61 6E 64 6C 65 72 00            
    `.replace(/\s/g, ''), 'hex'));

    expect(hdlrDump).toEqual(expected);
  });
});
