import { getSamplesOffset } from '../../../../src/mp4/utils/getSamplesOffset';

describe('getSamplesOffset', () => {
  it('should get samples offset', () => {
    const stscBoxSamplesPerChunkArray = [
      1,
      1,
      2,
      2,
      2,
      1,
      2,
      2,
      2,
      1,
      2,
      2,
      1,
      2,
      2,
    ];

    const stszBox = {
      flags      : 0,
      sampleSize : 0,
      sampleSizes: [
        371,
        372,
        371,
        372,
        371,
        544,
        420,
        419,
        419,
        383,
        365,
        363,
        388,
        370,
        354,
        382,
        337,
        425,
        378,
        358,
        387,
        346,
        445,
        372,
        366,
      ],
    };

    expect(getSamplesOffset(stszBox, stscBoxSamplesPerChunkArray)).toEqual([
      371,
      372,
      371,
      743,
      371,
      915,
      420,
      839,
      419,
      383,
      748,
      363,
      751,
      370,
      724,
      382,
      337,
      762,
      378,
      736,
      387,
      346,
      791,
      372,
      738,
    ]);
  });

  it('should get samples offset2', () => {
    const stscBoxSamplesPerChunkArray = [46, 16];

    const stszBox = {
      sampleSizes: [
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        35,
        452,
        328,
        339,
        341,
        339,
        376,
        376,
        365,
        365,
        371,
        461,
        460,
        476,
        465,
        467,
      ],
    };

    expect(getSamplesOffset(stszBox, stscBoxSamplesPerChunkArray)).toEqual([
      6,
      12,
      18,
      24,
      30,
      36,
      42,
      48,
      54,
      60,
      66,
      72,
      78,
      84,
      90,
      96,
      102,
      108,
      114,
      120,
      126,
      132,
      138,
      144,
      150,
      156,
      162,
      168,
      174,
      180,
      186,
      192,
      198,
      204,
      210,
      216,
      222,
      228,
      234,
      240,
      246,
      252,
      258,
      264,
      270,
      276,
      6,
      41,
      493,
      821,
      1160,
      1501,
      1840,
      2216,
      2592,
      2957,
      3322,
      3693,
      4154,
      4614,
      5090,
      5555,
    ]);
  });
});
