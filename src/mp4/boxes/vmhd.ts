import { StreamInputBuffer } from '@gradii/stream-buffer';

export function vmhd(buffer) {
  const stream = new StreamInputBuffer(buffer);

  const version = stream.readUInt8();
  const flags = stream.readUIntBE(3);
  const graphicsmode = stream.readUInt16BE();
  const opcolor = new Array(3).fill(stream.readUInt16BE());

  const vmhdBox = {
    version,
    flags,
    graphicsmode,
    opcolor
  };

  return vmhdBox;
}
