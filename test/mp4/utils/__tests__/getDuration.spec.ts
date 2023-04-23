import { getDuration } from '../../../../src/mp4/utils/getDuration';

describe('getDuration', () => {
  it('should get video duration from stts box1', () => {
    const sttsBox1 = {
      samples: [
        {
          sample_count: 5,
          sample_delta: 1024,
        },
      ],
    };

    expect(getDuration(sttsBox1, 5)).toBe(1024 * 5);
  });

  it('should get video duration from stts box2', () => {
    const sttsBox2 = {
      samples: [
        {
          sample_count: 5,
          sample_delta: 1024,
        },
        {
          sample_count: 2,
          sample_delta: 512,
        },
      ],
    };

    expect(getDuration(sttsBox2, 7)).toBe(5 * 1024 + 2 * 512);
  });
});
