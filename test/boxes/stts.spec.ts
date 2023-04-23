import { stts } from '../../src/fmp4/boxes/stts';
import * as dump from 'buffer-hexdump';

describe('stts box parse', () => {
  it('parse box', () => {
    const sttsDump = dump(stts({
      version: 0,
      samples: [
        {sample_count: 882, sample_delta: 512},
        {sample_count: 1, sample_delta: 522}
      ]
    }));
    const expected = dump(Buffer.from(`
       00 00 00 20 73 74 74 73 00 00 00 00 00 00 00 02
       00 00 03 72 00 00 02 00 00 00 00 01 00 00 02 0a
    `.replace(/\s/g, ''), 'hex'));

    expect(sttsDump).toEqual(expected);
  });
});
