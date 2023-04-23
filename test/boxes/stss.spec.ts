import { stss } from '../../src/fmp4/boxes/stss';
import * as dump from 'buffer-hexdump';

describe('stss box parse', () => {
  it('parse box', () => {
    const stssDump = dump(stss({
      version      : 0,
      sampleNumbers: [1, 251, 501, 751]
    }));
    const expected = dump(Buffer.from(`
       00 00 00 20 73 74 73 73 00 00 00 00 00 00 00 04
       00 00 00 01 00 00 00 fb 00 00 01 f5 00 00 02 ef
    `.replace(/\s/g, ''), 'hex'));

    expect(stssDump).toEqual(expected);
  });
});
