import { StreamInputBuffer } from '@gradii/stream-buffer';
import { Mp4Box } from './mp4Box';
import { Mp4BoxRangeError } from './mp4-box-range-error';

export class MP4Parse {
  buffer;
  stream;
  mp4BoxTreeObject;

  constructor(buffer: Buffer) {
    this.buffer = buffer;
    this.stream = new StreamInputBuffer(buffer);
    this.mp4BoxTreeObject = {};
    this.init();
  }

  init() {
    this.parse();
  }

  parse() {
    while (this.stream.position < this.buffer.length - 8) { //至少要有8字节来读头部
      const mp4Box = new Mp4Box();
      //partial parse current is not support, if the content is not complete, it will throw error
      mp4Box.readSize(this.stream);
      mp4Box.readType(this.stream);
      try {
        mp4Box.readBody(this.stream);
      } catch (e) {
        if (e instanceof Mp4BoxRangeError) {
        } else {
          throw e;
        }
      }
      this.mp4BoxTreeObject[mp4Box.type] = mp4Box.box;
      this.mp4BoxTreeObject[mp4Box.type].size = mp4Box.size;
    }
  }

  compatibleParse() {

  }
}
