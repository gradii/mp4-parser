import { dinf } from '../../src/fmp4/boxes/dinf';
import * as dump from 'buffer-hexdump';
import { url } from '../../src/fmp4/boxes/url';
import { dref } from '../../src/fmp4/boxes/dref';

describe('dinf box parse', () => {
  it('parse box', () => {
    const dinfDump = dump(dinf(dref({entries: [url()]})));
    const expected = dump(Buffer.from(`
      00 00 00 24 64 69 6E 66 00 00 00 1C 64 72 65 66
      00 00 00 00 00 00 00 01 00 00 00 0C 75 72 6C 20
      00 00 00 01                                           
    `.replace(/\s/g, ''), 'hex'));

    expect(dinfDump).toEqual(expected);
  });
});
