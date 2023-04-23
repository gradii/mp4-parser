import { dref } from '../../src/fmp4/boxes/dref';
import * as dump from 'buffer-hexdump';
import { url } from '../../src/fmp4/boxes/url';

describe('dref box parse', () => {
  it('parse box', () => {
    const drefDump = dump(dref({
      version: 0,
      entries: [
        url()
      ]
    }));
    const expected = dump(Buffer.from(`
      00 00 00 1C 64 72 65 66 00 00 00 00 00 00 00 01 
      00 00 00 0C 75 72 6C 20 00 00 00 01                                  
    `.replace(/\s/g, ''), 'hex'));

    expect(drefDump).toEqual(expected);
  });
});
