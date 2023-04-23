import { StreamInputBuffer } from '@gradii/stream-buffer';

export function elst(data: Buffer) {
  let stream = new StreamInputBuffer(data);
  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);
  const entryCount = stream.readUInt32BE();
  let entries = [];

  for (let i = 0; i < entryCount; ++i) {
    const segmentDuration = stream.readUInt32BE();
    let mediaTime = stream.readUInt32BE();

    // 0xffffffff -> -1
    if (mediaTime === 4294967295) {
      mediaTime = -1;
    }
    const mediaRateInteger = stream.readUInt16BE();
    const mediaRateFraction = stream.readUInt16BE();

    entries.push({
      segmentDuration,
      mediaTime,
      mediaRateInteger,
      mediaRateFraction
    });
  }

  const elstBox = {
    version,
    flags,
    entries
  };

  return elstBox;
}
