import { ftyp } from '../src/fmp4/boxes/ftyp';

describe('FMP4', () => {
  it('parse ftyp box', () => {
    expect(ftyp()).toEqual(Buffer.from([
      0x00, 0x00, 0x00, 0x18,
      0x66, 0x74, 0x79, 0x70, //ftyp
      0x69, 0x73, 0x6f, 0x6d, //isom
      0x00, 0x00, 0x00, 0x01, //1
      0x69, 0x73, 0x6f, 0x6d, //isom
      0x61, 0x76, 0x63, 0x31  //avc1
    ]));
  });


  //
  // it('parse avcC box', () => {
  //   expect(avcC()).toEqual(Buffer.from([]))
  // })
  // it('parse dinf box', () => {
  //   expect(dinf()).toEqual(Buffer.from([]))
  // })
  // it('parse esds box', () => {
  //   expect(esds()).toEqual(Buffer.from([]))
  // })
  // it('parse hdlr box', () => {
  //   expect(hdlr()).toEqual(Buffer.from([]))
  // })
  // it('parse mdat box', () => {
  //   expect(mdat()).toEqual(Buffer.from([]))
  // })
  // it('parse mdhd box', () => {
  //   expect(mdhd()).toEqual(Buffer.from([]))
  // })
  // it('parse mdia box', () => {
  //   expect(mdia()).toEqual(Buffer.from([]))
  // })
  // it('parse mfhd box', () => {
  //   expect(mfhd()).toEqual(Buffer.from([]))
  // })
  // it('parse minf box', () => {
  //   expect(minf()).toEqual(Buffer.from([]))
  // })
  // it('parse moof box', () => {
  //   expect(moof()).toEqual(Buffer.from([]))
  // })
  // it('parse moov box', () => {
  //   expect(moov()).toEqual(Buffer.from([]))
  // })
  // it('parse mp4a box', () => {
  //   expect(mp4a()).toEqual(Buffer.from([]))
  // })
  // it('parse mvex box', () => {
  //   expect(mvex()).toEqual(Buffer.from([]))
  // })
  // it('parse mvhd box', () => {
  //   expect(mvhd()).toEqual(Buffer.from([]))
  // })
  // it('parse sdtp box', () => {
  //   expect(sdtp()).toEqual(Buffer.from([]))
  // })
  // it('parse smhd box', () => {
  //   expect(smhd()).toEqual(Buffer.from([]))
  // })
  // it('parse stbl box', () => {
  //   expect(stbl()).toEqual(Buffer.from([]))
  // })
  // it('parse stco box', () => {
  //   expect(stco()).toEqual(Buffer.from([]))
  // })
  // it('parse stsc box', () => {
  //   expect(stsc()).toEqual(Buffer.from([]))
  // })
  // it('parse stsd box', () => {
  //   expect(stsd()).toEqual(Buffer.from([]))
  // })
  // it('parse stss box', () => {
  //   expect(stss()).toEqual(Buffer.from([]))
  // })
  // it('parse stsz box', () => {
  //   expect(stsz()).toEqual(Buffer.from([]))
  // })
  // it('parse stts box', () => {
  //   expect(stts()).toEqual(Buffer.from([]))
  // })
  // it('parse tfdt box', () => {
  //   expect(tfdt()).toEqual(Buffer.from([]))
  // })
  // it('parse tfhd box', () => {
  //   expect(tfhd()).toEqual(Buffer.from([]))
  // })
  // it('parse tfra box', () => {
  //   expect(tfra()).toEqual(Buffer.from([]))
  // })
  // it('parse tkhd box', () => {
  //   expect(tkhd()).toEqual(Buffer.from([]))
  // })
  // it('parse traf box', () => {
  //   expect(traf()).toEqual(Buffer.from([]))
  // })
  // it('parse trak box', () => {
  //   expect(trak()).toEqual(Buffer.from([]))
  // })
  // it('parse trex box', () => {
  //   expect(trex()).toEqual(Buffer.from([]))
  // })
  // it('parse trun box', () => {
  //   expect(trun()).toEqual(Buffer.from([]))
  // })
  // it('parse url box', () => {
  //   expect(url()).toEqual(Buffer.from([]))
  // })
  // it('parse vmhd box', () => {
  //   expect(vmhd()).toEqual(Buffer.from([]))
  // })
});
