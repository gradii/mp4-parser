import { stsd } from '../../src/fmp4/boxes/stsd';
import * as dump from 'buffer-hexdump';

describe('stsd box parse', () => {
  it('parse box', () => {
    const stsdDump = dump(stsd({
      version: 0,
      entries: [
        Buffer.from([1, 2, 3, 4])
      ]
    }));
    const expected = dump(Buffer.from(`
       00 00 00 14 73 74 73 64 00 00 00 00 00 00 00 01
       01 02 03 04
    `.replace(/\s/g, ''), 'hex'));

    expect(stsdDump).toEqual(expected);
  });
});
