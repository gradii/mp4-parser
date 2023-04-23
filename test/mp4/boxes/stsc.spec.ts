import { stsc } from '../../../src/mp4/boxes';

describe('stsc box', () => {
  it('should get the stsc box tree', () => {
    // prettier-ignore
    const stscBody = new Buffer([
      0x00, 0x00, 0x00, 0x00,  // version + flags
      0x00, 0x00, 0x00, 0x01,  // entryCount
      0x00, 0x00, 0x00, 0x01,  // firstChunk
      0x00, 0x00, 0x00, 0x01,  // samplesPerChunk
      0x00, 0x00, 0x00, 0x01,  // sampleDescriptionIndex
    ]);
    expect(stsc(stscBody)).toEqual({
      flags  : 0,
      samples: [
        {
          first_chunk      : 1,
          sample_desc_index: 1,
          samples_per_chunk: 1,
        },
      ],
      version: 0,
    });
  });
});
