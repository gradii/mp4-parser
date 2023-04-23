import { audioData, videoData } from '../__mocks__/data';
import { FMP4Generator } from '../../src/fmp4/fmp4Generator';

describe('fmp4Generator', () => {
  it('should generator ftyp buffer', () => {
    // prettier-ignore
    expect(FMP4Generator.ftyp()).toEqual(new Buffer([
      0x00, 0x00, 0x00, 0x18,   // size
      0x66, 0x74, 0x79, 0x70,   // ftyp
      0x69, 0x73, 0x6F, 0x6D,   // major_brand: isom
      0x00, 0x00, 0x00, 0x01,   // minor_version: 0x01
      0x69, 0x73, 0x6F, 0x6D,   // isom
      0x61, 0x76, 0x63, 0x31,   // avc1
    ]));
  });

  it('should generator audio moov buffer size', () => {
    expect(FMP4Generator.moov(audioData, 'audio')).toMatchSnapshot('audio moov');
  });

  it('should generator video moov buffer size', () => {
    expect(FMP4Generator.moov(videoData, 'video')).toMatchSnapshot('video moov');
  });

  it('should generator moof buffer size', () => {
    expect(FMP4Generator.moof(audioData)).toMatchSnapshot('moof buffer');
  });

  // xit('should generator mdat buffer size', () => {
  //   expect(FMP4Generator.mdat(audioData)).toMatchSnapshot('mdat buffer');
  // });
});
