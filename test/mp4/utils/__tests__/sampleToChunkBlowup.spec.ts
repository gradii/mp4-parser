import { blowupSampleToChunk } from '../../../../src/mp4/utils/getPerChunkArray';

describe('sampleToChunkBlowup', () => {
  it('should get per chunk array', () => {
    const stscBox = {
      samples: [
        {
          first_chunk      : 1,
          samples_per_chunk: 1,
        },
      ],
    };

    expect(blowupSampleToChunk(stscBox.samples, 50)).toEqual([
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
    ]);
  });

  it('shuold get per chunk array2', () => {
    const stscBox = {
      samples: [
        {
          first_chunk      : 1,
          samples_per_chunk: 2,
        },
      ],
    };

    expect(blowupSampleToChunk(stscBox.samples, 50)).toEqual([
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2
    ]);
  });

  it('shuold get per chunk array3', () => {
    const stscBox = {
      samples: [
        {
          first_chunk      : 1,
          samples_per_chunk: 2,
        },
        {
          first_chunk      : 2,
          samples_per_chunk: 2,
        },
        {
          first_chunk      : 3,
          samples_per_chunk: 2,
        },
        {
          first_chunk      : 5,
          samples_per_chunk: 2,
        },
        {
          first_chunk      : 6,
          samples_per_chunk: 1,
        },
        {
          first_chunk      : 8,
          samples_per_chunk: 2,
        },
        {
          first_chunk      : 9,
          samples_per_chunk: 2,
        },
        {
          first_chunk      : 11,
          samples_per_chunk: 2,
        },
      ],
    };

    expect(blowupSampleToChunk(stscBox.samples, 30)).toEqual([
      2,
      2,
      2,
      2,
      2,
      1,
      1,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2
    ]);
  });
});
