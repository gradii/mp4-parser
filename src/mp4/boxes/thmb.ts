import { StreamInputBuffer } from '@gradii/stream-buffer';

export function thmb(buffer) {
  const stream = new StreamInputBuffer(buffer);

  const data = stream.read(buffer.length);

  const thmbBox = {
    data
  };

  return thmbBox;
}
