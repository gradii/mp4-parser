import { avcC } from '../../src/fmp4/boxes/avcC';


it('parse avc1 box', () => {
  expect(avcC(
    {
      configurationVersion : 0x01,
      AVCProfileIndication : 0x4d,
      profileCompatibility : 0x40,
      AVCLevelIndication   : 0x1e,
      lengthSizeMinusOne   : 0x3,
      sequenceParameterSets: [
        new Buffer([1, 2, 3, 4, 5, 6, 7, 8])
      ],// sequenceParameterSets
      pictureParameterSets : [
        new Buffer([11, 12, 13, 14, 15, 16, 17, 18])
      ]// pictureParameterSets

    })).toEqual(new Buffer([
    0, 0, 0, 35, 97, 118, 99, 67, 1, 77, 64, 30, 255, 225, 0, 8,
    1, 2, 3, 4, 5, 6, 7, 8, 1, 0, 8, 11, 12, 13, 14, 15,
    16, 17, 18,
  ]));
});
