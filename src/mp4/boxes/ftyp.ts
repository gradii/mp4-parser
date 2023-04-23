import { StreamInputBuffer } from '@gradii/stream-buffer';

export function ftyp(data: Buffer) {
  const stream = new StreamInputBuffer(data);
  const majorBrand = stream.readString(4, 'binary');
  const minorVersion = stream.readUInt32BE();
  const compatibleBrands = [];

  for (let i = stream.getOffset(); i < data.length; i += 4) {
    compatibleBrands.push(stream.readString(4, 'binary'));
  }

  const ftypBox = {
    majorBrand,
    minorVersion,
    compatibleBrands
  };

  return ftypBox;
}
