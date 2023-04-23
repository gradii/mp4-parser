import { StreamInputBuffer } from '@gradii/stream-buffer';

export function btrt(data: Buffer) {
  let stream = new StreamInputBuffer(data);
  const bufferSizeDB = stream.readUInt32BE();
  const maxBitrate = stream.readUInt32BE();
  const avgBitrate = stream.readUInt32BE();

  return {
    bufferSizeDB,
    maxBitrate,
    avgBitrate
  };
}
