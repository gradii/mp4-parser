import { StreamInputBuffer } from '@gradii/stream-buffer';

export function sdtp(data: Buffer) {
  const stream = new StreamInputBuffer(data);

  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);

  const samplesFlag = [];

  for (let i = stream.position; i < data.length; i++) {
    const tmpByte = stream.readUInt8();
    samplesFlag.push({
      isLeading    : tmpByte >> 6,
      dependsOn    : (tmpByte >> 4) & 0x3,
      isDepended   : (tmpByte >> 2) & 0x3,
      hasRedundancy: tmpByte & 0x3
    });
  }

  const sdtpBox = {
    version,
    flags,
    samplesFlag
  };

  return sdtpBox;
}
