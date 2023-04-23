import * as dump from 'buffer-hexdump';
import { edts } from '../../src/fmp4/boxes/edts';
import { elst } from '../../src/fmp4/boxes/elst';

describe('edts box parse', () => {
  it('parse box', () => {
    const mvhdDump = dump(edts(
      {
        elsts: [
          elst(
            {
              version: 0x00,
              flag   : 0x000000,
              entries: [
                {duration: 0x000072FA, mediaTime: 0, mediaRate: 1.000}
              ]
            })
        ]
      }
    ));
    const expected = dump(Buffer.from(`
      00 00 00 24 65 64 74 73 00 00 00 1C 65 6C 73 74
      00 00 00 00 00 00 00 01 00 00 72 FA 00 00 00 00
      00 01 00 00
    `.replace(/\s/g, ''), 'hex'));

    expect(mvhdDump).toEqual(expected);
  });

  it('parse box', () => {
    const mvhdDump = dump(edts(
      {
        elsts: [
          elst(
            {
              version: 0x00,
              flag   : 0x000000,
              entries: [
                {duration: 0x00007B48, mediaTime: 0x00000400, mediaRate: 1.000}
              ]
            })
        ]
      }
    ));
    const expected = dump(Buffer.from(`
      00 00 00 24 65 64 74 73 00 00 00 1C 65 6C 73 74
      00 00 00 00 00 00 00 01 00 00 7B 48 00 00 04 00
      00 01 00 00
    `.replace(/\s/g, ''), 'hex'));

    expect(mvhdDump).toEqual(expected);
  });
});
