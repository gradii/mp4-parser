const mp4BoxTree = {
  ftyp: {
    compatibleBrands: ['mp41', 'mp42', 'isom'],
    majorBrand      : 'mp42',
    minorVersion    : 1
  },
  moov: {
    audioTrak: {
      edts: {
        elst: {
          entries: [
            {
              mediaRateFraction: 0,
              mediaRateInteger : 1,
              mediaTime        : 0,
              segmentDuration  : 108108
            }
          ],
          flags  : 0,
          version: 0
        }
      },
      mdia: {
        hdlr: {
          flags       : 0,
          handlerType : 'soun',
          handlerType2: '    ',
          name        : 'Core Media Audio',
          version     : 0
        },
        mdhd: {
          creationTime    : 3629786880,
          duration        : 219136,
          flags           : 0,
          languageString  : 'zho',
          modificationTime: 3629786881,
          timescale       : 48000,
          version         : 0
        },
        minf: {
          dinf: {
            dref: {
              flags  : 0,
              url    : [
                {
                  flags  : 1,
                  version: 0
                }
              ],
              version: 0
            }
          },
          smhd: {
            data   : [0, 0, 0, 0],
            flags  : 0,
            version: 0
          },
          stbl: {
            stco: {
              flags  : 0,
              samples: [
                40805,
                41081,
                70535,
                127784,
                157924,
                348361,
                565900,
                815799,
                1010411

              ],
              version: 0
            },
            stsc: {
              flags  : 0,
              samples: [
                {
                  first_chunk      : 1,
                  sample_desc_index: 1,
                  samples_per_chunk: 46
                },
                {
                  first_chunk      : 3,
                  sample_desc_index: 1,
                  samples_per_chunk: 24
                },
                {
                  first_chunk      : 4,
                  sample_desc_index: 1,
                  samples_per_chunk: 23
                },
                {
                  first_chunk      : 5,
                  sample_desc_index: 1,
                  samples_per_chunk: 24
                },
                {
                  first_chunk      : 6,
                  sample_desc_index: 1,
                  samples_per_chunk: 23
                },
                {
                  first_chunk      : 7,
                  sample_desc_index: 1,
                  samples_per_chunk: 24
                },
                {
                  first_chunk      : 8,
                  sample_desc_index: 1,
                  samples_per_chunk: 1
                },
                {
                  first_chunk      : 9,
                  sample_desc_index: 1,
                  samples_per_chunk: 3
                }
              ],
              version: 0
            },
            stsd: {
              flags  : 0,
              mp4a   : [
                {
                  channelCount      : 2,
                  dataReferenceIndex: 1,
                  esds              : {
                    ESDescrTag: {
                      DecSpecificDescrTag  : {
                        audioConfig: [17, 144],
                        size       : 7
                      },
                      DecoderConfigDescrTag: {
                        avgBitrate          : 256000,
                        bufferSize          : 6144,
                        maxBitrate          : 256000,
                        objectTypeIndication: 64,
                        size                : 25,
                        streamType          : 21,
                        upStream            : 0
                      },
                      ESID                 : 0,
                      size                 : 39,
                      streamPriority       : 0
                    },
                    flags     : 0,
                    version   : 0
                  },
                  sampleRate        : 48000,
                  sampleSize        : 16
                }
              ],
              version: 0
            },
            stsz: {
              flags      : 0,
              sampleSize : 0,
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
                469,
                800,
                810,
                800,
                803,
                798,
                817,
                950,
                880,
                804,
                820,
                800,
                808,
                818,
                826,
                804,
                813,
                808,
                812,
                844,
                788,
                789,
                848,
                848,
                801,
                811,
                807,
                813,
                843,
                806,
                811,
                801,
                821,
                800,
                798,
                874,
                879,
                838,
                813,
                810,
                801,
                797,
                808,
                811,
                800,
                804,
                790,
                814,
                806,
                808,
                808,
                808,
                801,
                805,
                810,
                809,
                794,
                806,
                809,
                798,
                804,
                805,
                808,
                812,
                800,
                814,
                804,
                796,
                803,
                806,
                802,
                798,
                810,
                813,
                800,
                811,
                815,
                798,
                801,
                784,
                800,
                799,
                809,
                802,
                781,
                803,
                801,
                795,
                811,
                815,
                795,
                803,
                811,
                819,
                810,
                811,
                806,
                805,
                806,
                804,
                799,
                815,
                800,
                804,
                834,
                818,
                797,
                822,
                805,
                825,
                803,
                807,
                805,
                815,
                804,
                813,
                804,
                809,
                802,
                809,
                809,
                811,
                801,
                806,
                799,
                810,
                805,
                808,
                811,
                802,
                803,
                801,
                800,
                805,
                793,
                811,
                826,
                802,
                791,
                808,
                809,
                804,
                809,
                797,
                797,
                812,
                794,
                819,
                811,
                733,
                235
              ],
              version    : 0
            },
            stts: {
              flags  : 0,
              samples: [
                {
                  sample_count: 214,
                  sample_delta: 1024
                }
              ],
              version: 0
            }
          }
        }
      },
      tkhd: {
        alternateGroup  : 0,
        creationTime    : 3629786880,
        duration        : 108108,
        flags           : 1,
        height          : 0,
        layer           : 0,
        matrix          : [65536, 0, 0, 0, 65536, 0, 0, 0, 1073741824],
        modificationTime: 3629786881,
        trackId         : 1,
        version         : 0,
        volume          : 256,
        width           : 0
      }
    },
    mvhd     : {
      creationTime    : 3629786880,
      duration        : 108108,
      flags           : 0,
      matrix          : [65536, 0, 0, 0, 65536, 0, 0, 0, 1073741824],
      modificationTime: 3629786881,
      nextTrackId     : 3,
      rate            : 65536,
      timescale       : 24000,
      version         : 0,
      volume          : 1
    },
    udta     : {
      thmb: {
        data: 0
      }
    },
    videoTrak: {
      edts: {
        elst: {
          entries: [
            {
              mediaRateFraction: 0,
              mediaRateInteger : 1,
              mediaTime        : 0,
              segmentDuration  : 108108
            }
          ],
          flags  : 0,
          version: 0
        }
      },
      mdia: {
        hdlr: {
          flags       : 0,
          handlerType : 'vide',
          handlerType2: '    ',
          name        : 'Core Media Video',
          version     : 0
        },
        mdhd: {
          creationTime    : 3629786880,
          duration        : 108108,
          flags           : 0,
          languageString  : 'und',
          modificationTime: 3629786881,
          timescale       : 24000,
          version         : 0
        },
        minf: {
          dinf: {
            dref: {
              flags  : 0,
              url    : [
                {
                  flags  : 1,
                  version: 0
                }
              ],
              version: 0
            }
          },
          stbl: {
            sdtp: {
              flags      : 0,
              samplesFlag: [
                {
                  dependsOn    : 2,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 2,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 2,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 2,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                },
                {
                  dependsOn    : 1,
                  hasRedundancy: 0,
                  isDepended   : 0,
                  isLeading    : 0
                }
              ],
              version    : 0
            },
            stco: {
              flags  : 0,
              samples: [
                90042,
                146301,
                177208,
                366972,
                585203,
                816618,
                1012190,
                1309250
              ],
              version: 0
            },
            stsc: {
              flags  : 0,
              samples: [
                {
                  first_chunk      : 1,
                  sample_desc_index: 1,
                  samples_per_chunk: 12
                },
                {
                  first_chunk      : 7,
                  sample_desc_index: 1,
                  samples_per_chunk: 23
                },
                {
                  first_chunk      : 8,
                  sample_desc_index: 1,
                  samples_per_chunk: 13
                }
              ],
              version: 0
            },
            stsd: {
              avc1   : [
                {
                  avcC              : {
                    AVCLevelIndication  : 31,
                    AVCProfileIndication: 100,
                    PPS                 : [40, 238, 31, 44],
                    SPS                 : [
                      39,
                      100,
                      0,
                      31,
                      172,
                      19,
                      22,
                      192,
                      240,
                      17,
                      126,
                      240,
                      22,
                      160,
                      32,
                      32,
                      38,
                      6,
                      0,
                      11,
                      184,
                      0,
                      2,
                      238,
                      11,
                      222,
                      248,
                      62,
                      17,
                      8,
                      220
                    ],
                    configurationVersion: 1,
                    lengthSizeMinusOne  : 3,
                    profileCompatibility: 0
                  },
                  compressorname    : '                                ',
                  dataReferenceIndex: 1,
                  depth             : 24,
                  frameCount        : 1,
                  height            : 540,
                  horizresolution   : 4718592,
                  vertresolution    : 4718592,
                  width             : 960
                }
              ],
              flags  : 0,
              version: 0
            },
            stss: {
              flags        : 0,
              sampleNumbers: [
                1,
                27,
                57,
                87
              ],
              version      : 0
            },
            stsz: {
              flags      : 0,
              sampleSize : 0,
              sampleSizes: [
                21218,
                1850,
                989,
                2915,
                2335,
                1389,
                1420,
                1127,
                1002,
                1444,
                1077,
                976,
                945,
                1028,
                960,
                946,
                946,
                1002,
                965,
                953,
                955,
                962,
                986,
                975,
                986,
                784,
                38945,
                6552,
                13507,
                14639,
                13756,
                16620,
                15495,
                15784,
                17409,
                16676,
                17588,
                15612,
                17393,
                14527,
                13306,
                18083,
                18003,
                15582,
                18073,
                18323,
                16959,
                15479,
                18097,
                17909,
                2610,
                15177,
                22192,
                23698,
                27226,
                30529,
                40314,
                8505,
                12577,
                11762,
                18672,
                13558,
                17094,
                13974,
                17406,
                21987,
                20521,
                19243,
                11304,
                11686,
                13122,
                15226,
                10437,
                18211,
                1414,
                16930,
                11793,
                10305,
                9811,
                16500,
                12456,
                12100,
                10839,
                13143,
                15792,
                10348,
                40177,
                7404,
                7088,
                10135,
                11259,
                10861,
                10888,
                18634,
                10535,
                7142,
                11745,
                8679,
                9931,
                1980,
                17185,
                16627,
                9430,
                14712,
                10542,
                12848,
                13364,
                11635
              ],
              version    : 0
            },
            stts: {
              flags  : 0,
              samples: [
                {
                  sample_count: 108,
                  sample_delta: 1001
                }
              ],
              version: 0
            }
          },
          vmhd: {
            flags       : 1,
            graphicsmode: 0,
            opcolor     : [0, 0, 0],
            version     : 0
          }
        }
      },
      tkhd: {
        alternateGroup  : 0,
        creationTime    : 3629786880,
        duration        : 108108,
        flags           : 1,
        height          : 35389440,
        layer           : 0,
        matrix          : [65536, 0, 0, 0, 65536, 0, 0, 0, 1073741824],
        modificationTime: 3629786881,
        trackId         : 2,
        version         : 0,
        volume          : 0,
        width           : 62914560
      }
    }
  }
};

export default mp4BoxTree;
