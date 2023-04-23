import { BitStreamInputBuffer } from '@gradii/stream-buffer';

export class SEIMessage {
  public constructor(bsr: BitStreamInputBuffer) {
    let payloadType: number = 0;
    let ff_byte: number;
    while (((ff_byte = bsr.readNBit(8)) === 255)) {
      {
        payloadType += 255;
      }
    }
    let last_payload_type_byte: number = (<number>bsr.readNBit(8) | 0);
    payloadType += last_payload_type_byte;
    let payloadSize: number = 0;
    while (((ff_byte = bsr.readNBit(8)) === 255)) {
      {
        payloadSize += 255;
      }
    }
    let last_payload_size_byte: number = (<number>bsr.readNBit(8) | 0);
    payloadSize += last_payload_size_byte;
    console.error('payloadType ' + payloadType);
  }
}

