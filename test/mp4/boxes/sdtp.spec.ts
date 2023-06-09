import { sdtp } from '../../../src/mp4/boxes';

describe('sdtp box', () => {
  it('should get the sdtp box tree', () => {
    // prettier-ignore
    const sdtpBody = new Buffer([
      0x00, 0x00, 0x00, 0x00,  // version + flags
      0x20, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x20, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x20, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x20, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x20, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
      0x10, 0x10, 0x10, 0x10,
    ]);

    expect(sdtp(sdtpBody)).toEqual({
      flags      : 0,
      version    : 0,
      samplesFlag: [
        {
          dependsOn    : 2,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 2,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 2,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 2,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 2,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
        {
          dependsOn    : 1,
          hasRedundancy: 0,
          isDepended   : 0,
          isLeading    : 0,
        },
      ],
    });
  });
});
