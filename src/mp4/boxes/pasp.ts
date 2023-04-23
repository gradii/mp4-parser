import { StreamInputBuffer } from '@gradii/stream-buffer';

export function pasp(data: Buffer) {
  let stream = new StreamInputBuffer(data);
  this.content = stream.buffer.slice(0, this.size - 8);
  delete this.subBox;
  delete this.data;
  stream = null;
}
