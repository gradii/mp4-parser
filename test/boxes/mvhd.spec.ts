import { mvhd } from '../../src/fmp4/boxes/mvhd';
import * as dump from 'buffer-hexdump';

describe('mvhd box parse', () => {
  it('parse box', () => {
    const mvhdDump = dump(mvhd({
      version          : 0,
      creationTime     : 0,
      modificationTime : 0,
      timescale        : 0x000003E8,
      duration         : 0x00007B60,
      rate             : 1,
      volume           : 1,
      previewTime      : 0,
      previewDuration  : 0,
      posterTime       : 0,
      selectionTime    : 0,
      selectionDuration: 0,
      currentTime      : 0,
      nextTrackId      : 0x00000003
    }));
    const expected = dump(Buffer.from(`
      00 00 00 6C 6D 76 68 64 00 00 00 00 00 00 00 00  
      00 00 00 00 00 00 03 E8 00 00 7B 60 00 01 00 00  
      01 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00  
      00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00  
      00 00 00 00 00 00 00 00 00 00 00 00 40 00 00 00  
      00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  
      00 00 00 00 00 00 00 00 00 00 00 03              
    `.replace(/\s/g, ''), 'hex'));

    expect(mvhdDump).toEqual(expected);
  });
});
