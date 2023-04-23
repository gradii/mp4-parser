import { tkhd } from '../../src/fmp4/boxes/tkhd';
import * as dump from 'buffer-hexdump';
import { DateHelper } from '../../src/util/date-helper';

describe('tkhd box parse', () => {
  it('parse video box', () => {
    const tkhdDump = dump(tkhd({
      version          : 0,
      flags            : 1,
      creation_time    : DateHelper.convertDate(new Date('2019-11-27T03:51:18.000Z')),
      modification_time: DateHelper.convertDate(new Date('2019-11-27T03:51:18.000Z')),
      trackId          : 1,
      duration         : 29433,
      layer            : 0,
      alternate_group  : 0,
      volume           : 0,
      width            : 424,
      height           : 792
    }));
    const expected = dump(Buffer.from(`
      00 00 00 5C 74 6B 68 64 00 00 00 01 DA 03 A3 36
      DA 03 A3 36 00 00 00 01 00 00 00 00 00 00 72 F9
      00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
      00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00
      00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00
      40 00 00 00 01 A8 00 00 03 18 00 00               
    `.replace(/\s/g, ''), 'hex'));

    expect(tkhdDump).toEqual(expected);
  });

  it('parse box createtime zero', () => {
    const mvhdDump = dump(tkhd({
      version          : 0x00,
      flags            : 0x000003,
      creation_time    : 0x00000000,
      modification_time: 0x00000000,
      trackId          : 0x00000001,
      duration         : 29434,
      layer            : 0,
      alternate_group  : 0,
      volume           : 0,
      width            : 424,
      height           : 792
    }));
    const expected = dump(Buffer.from(`
      00 00 00 5C 74 6B 68 64 00 00 00 03 00 00 00 00
      00 00 00 00 00 00 00 01 00 00 00 00 00 00 72 FA
      00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
      00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00
      00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00
      40 00 00 00 01 A8 00 00 03 18 00 00
    `.replace(/\s/g, ''), 'hex'));

    expect(mvhdDump).toEqual(expected);
  });


  it('parse video box', () => {
    const mvhdDump = dump(tkhd({
      version          : 0x00,
      flags            : 0x000003,
      creation_time    : 0x00000000,
      modification_time: 0x00000000,
      trackId          : 0x00000002,
      duration         : 31584,
      layer            : 0,
      alternate_group  : 1,
      volume           : 256,
      width            : 0,
      height           : 0
    }));
    const expected = dump(Buffer.from(`
      00 00 00 5C 74 6B 68 64 00 00 00 03 00 00 00 00
      00 00 00 00 00 00 00 02 00 00 00 00 00 00 7B 60
      00 00 00 00 00 00 00 00 00 00 00 01 01 00 00 00
      00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00
      00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00
      40 00 00 00 00 00 00 00 00 00 00 00             
    `.replace(/\s/g, ''), 'hex'));

    expect(mvhdDump).toEqual(expected);
  });
});
