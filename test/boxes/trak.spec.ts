import { trak } from '../../src/fmp4/boxes/trak';
import * as dump from 'buffer-hexdump';
import { tkhd } from '../../src/fmp4/boxes/tkhd';
import { mdia } from '../../src/fmp4/boxes/mdia';
import { mdhd } from '../../src/fmp4/boxes/mdhd';
import { hdlr } from '../../src/fmp4/boxes/hdlr';
import { minf } from '../../src/fmp4/boxes/minf';

describe('trak box parse', () => {
  it('parse box', () => {
    const trakDump = dump(
      trak([
        tkhd({
          version          : 0,
          flags            : 1,
          creation_time    : 0,
          modification_time: 0,
          trackId          : 1,
          duration         : 29433,
          layer            : 0,
          alternate_group  : 0,
          volume           : 0.000,
          width            : 424,
          height           : 792
        }), mdia(
          mdhd({
            creation_time    : 0,
            modification_time: 0,
            timescale        : 0,
            duration         : 0,
            language         : 0
          }),
          hdlr({
            type: 'vide',
            name: ''
          }),
          minf([])
        )]
      ));
    const expected = dump(Buffer.from(`
    0000 00b5 7472 616b 0000 005c 746b 6864
    0000 0001 0000 0000 0000 0000 0000 0001
    0000 0000 0000 72f9 0000 0000 0000 0000
    0000 0000 0000 0000 0001 0000 0000 0000
    0000 0000 0000 0000 0001 0000 0000 0000
    0000 0000 0000 0000 4000 0000 01a8 0000
    0318 0000 0000 0051 6d64 6961 0000 0020
    6d64 6864 0000 0000 0000 0000 0000 0000
    0000 0000 0000 0000 0000 0000 0000 0021
    6864 6c72 0000 0000 0000 0000 7669 6465
    0000 0000 0000 0000 0000 0000 0000 0000
    086d 696e 66                           
    `.replace(/\s/g, ''), 'hex'));

    expect(trakDump).toEqual(expected);
  });
});
