import { StreamInputBuffer } from '@gradii/stream-buffer';
import { PRIVATE_BOXES as Boxes } from './private-boxes';
import { Mp4BoxRangeError } from './mp4-box-range-error';

const CONTAINER_BOXES = ['moov', 'trak', 'edts', 'mdia', 'minf', 'dinf', 'stbl'];
const SPECIAL_BOXES = ['udta', 'free'];

export class Mp4Box {
  size: number;
  type: string;
  start: number;
  box: { [key: string]: any };
  data;

  constructor() {
    this.size = 0;
    this.type = '';
    this.start = 0;
    this.box = {};
  }

  readSize(stream: StreamInputBuffer) {
    this.start = stream.position;
    this.size = stream.readUInt32BE();
  }

  readType(stream: StreamInputBuffer) {
    this.type = stream.readString(4, 'binary');

    // 一个 box 的 size 只可能大于等于 8
    // 如果从 readSize 中解析出来的 mdat size 为 1，则表明此视频比较大，需要 type 后的 8 个字节来计算实际大小
    if (this.size === 1) {
      this.size = stream.readUInt32BE() * Math.pow(2, 32);
      this.size |= stream.readUInt32BE();
    }
  }

  readBody(stream: StreamInputBuffer) {
    this.data = stream.buffer.slice(stream.position, this.size + this.start);
    if (
      CONTAINER_BOXES.find(item => item === this.type) ||
      SPECIAL_BOXES.find(item => item === this.type)
    ) {
      if (stream.getLength() < this.size + this.start) {
        const currentSize = stream.getLength() - this.start;
        stream.skip(this.size);
        throw new Mp4BoxRangeError({
          boxSize    : this.size,
          boxType    : this.type,
          currentSize: currentSize,
        });
      }

      this.parserContainerBox();
    } else {
      if (!Boxes[this.type]) {
        this.box = {};
      } else {
        this.box = {
          ...this.box,
          ...Boxes[this.type](this.data),
        };
      }
    }

    stream.skip(this.data.length);
  }

  parserContainerBox() {
    const stream = new StreamInputBuffer(this.data);
    const size = stream.buffer.length;
    while (stream.position < size) {
      const Box = new Mp4Box();
      Box.readSize(stream);
      Box.readType(stream);
      Box.readBody(stream);

      if (Box.type === 'trak' && Box.box.mdia && Box.box.mdia.hdlr) {
        const handlerType = Box.box.mdia.hdlr.handlerType;
        if (handlerType === 'vide') {
          this.box.videoTrak = Box.box;
        } else if (handlerType === 'soun') {
          this.box.audioTrak = Box.box;
        } else {
          this.box[`${handlerType}Trak`] = Box.box;
        }
      } else {
        this.box[Box.type] = Box.box;
      }
    }
  }
}
