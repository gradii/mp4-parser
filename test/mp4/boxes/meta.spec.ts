import { meta } from '../../../src/mp4/boxes';

describe('meta box', () => {
  it('should get the meta box tree', () => {
    // prettier-ignore
    const metaBody = new Buffer([
      0x00, 0x00, 0x00, 0x00,  // version + flags

      // ignore
      // hdlr
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x21,
      0x68, 0x64, 0x6c, 0x72,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x6d, 0x64, 0x69, 0x72,
      0x61, 0x70, 0x70, 0x6c,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00,

      // ilst
      0x00, 0x00, 0x00, 0x42,
      0x69, 0x6c, 0x73, 0x74,
      0x00, 0x00, 0x00, 0x3a,
      0xa9, 0x74, 0x6f, 0x6f,
      0x00, 0x00, 0x00, 0x32,
      0x64, 0x61, 0x74, 0x61,
      0x00, 0x00, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x00,
      0x77, 0x77, 0x77, 0x2e,
      0x61, 0x6c, 0x69, 0x79,
      0x75, 0x6e, 0x2e, 0x63,
      0x6f, 0x6d, 0x20, 0x2d,
      0x20, 0x4d, 0x65, 0x64,
      0x69, 0x61, 0x20, 0x54,
      0x72, 0x61, 0x6e, 0x73,
      0x63, 0x6f, 0x64, 0x69,
      0x63, 0x67,
    ]);

    expect(meta(metaBody)).toEqual({
      flags  : 0,
      version: 0,
    });
  });
});
