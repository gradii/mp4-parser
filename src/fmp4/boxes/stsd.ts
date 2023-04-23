import { generateBox } from '../utils/generateBox';
import { StreamOutputBuffer } from '@gradii/stream-buffer';

/**
 *  // const {type} = data
 // let content
 // if (type === 'video') {
  //   content = avc1(data)
  // } else if (type === 'audio') {
  //   content = mp4a(data)
  // }
 // content = concatTypedArray(
 //   // prettier-ignore
 //   new Uint8Array([
 //     ...generateVersionAndFlags(0, 0), // version & flags
 //     0x00, 0x00, 0x00, 0x01 // entry_count
 //   ]),
 //   content
 // )
 * @param version
 * @param flags  * @param count
 * @param entries
 */
export function stsd({
  version = 0x00,
  flags = 0x000000,
  entries = []
}) {
  const stream = new StreamOutputBuffer();
  stream.writeUInt8(version);
  stream.writeUIntBE(flags, 3);
  stream.writeUInt32BE(entries.length);
  entries.forEach(it => {
    stream.write(it);
  });

  return generateBox('stsd', stream.getBuffer());
}
