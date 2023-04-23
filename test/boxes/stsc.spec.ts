import { stsc } from '../../src/fmp4/boxes/stsc';
import * as dump from 'buffer-hexdump';

describe('stsc box parse', () => {
  it('parse box', () => {
    const stscDump = dump(stsc({
      version: 0,
      samples: [
        {first_chunk: 1, samples_per_chunk: 15, sample_desc_index: 1},
        {first_chunk: 59, samples_per_chunk: 13, sample_desc_index: 1}
      ]
    }));
    const expected = dump(Buffer.from(`
       00 00 00 28 73 74 73 63 00 00 00 00 00 00 00 02
       00 00 00 01 00 00 00 0f 00 00 00 01 00 00 00 3b
       00 00 00 0d 00 00 00 01
    `.replace(/\s/g, ''), 'hex'));

    expect(stscDump).toEqual(expected);
  });
});
