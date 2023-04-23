import { ExtensionDescriptor } from './ExtensionDescriptor';
import { BaseDescriptor } from './BaseDescriptor';
import { ESDescriptor } from './ESDescriptor';
import { StreamInputBuffer } from '@gradii/stream-buffer';


/* class tag values of 14496-1
 0x00 Forbidden
 0x01 ObjectDescrTag
 0x02 InitialObjectDescrTag
 0x03 ES_DescrTag
 0x04 DecoderConfigDescrTag
 0x05 DecSpecificInfoTag
 0x06 SLConfigDescrTag
 0x07 ContentIdentDescrTag
 0x08 SupplContentIdentDescrTag
 0x09 IPI_DescrPointerTag
 0x0A IPMP_DescrPointerTag
 0x0B IPMP_DescrTag
 0x0C QoS_DescrTag
 0x0D RegistrationDescrTag
 0x0E ES_ID_IncTag
 0x0F ES_ID_RefTag
 0x10 MP4_IOD_Tag
 0x11 MP4_OD_Tag
 0x12 IPL_DescrPointerRefTag
 0x13 ExtensionProfileLevelDescrTag
 0x14 profileLevelIndicationIndexDescrTag
 0x15-0x3F Reserved for ISO use
 0x40 ContentClassificationDescrTag
 0x41 KeyWordDescrTag
 0x42 RatingDescrTag
 0x43 LanguageDescrTag
 0x44 ShortTextualDescrTag
 0x45 ExpandedTextualDescrTag
 0x46 ContentCreatorNameDescrTag
 0x47 ContentCreationDateDescrTag
 0x48 OCICreatorNameDescrTag
 0x49 OCICreationDateDescrTag
 0x4A SmpteCameraPositionDescrTag
 0x4B SegmentDescrTag
 0x4C MediaTimeDescrTag
 0x4D-0x5F Reserved for ISO use (OCI extensions)
 0x60 IPMP_ToolsListDescrTag
 0x61 IPMP_ToolTag
 0x62 M4MuxTimingDescrTag
 0x63 M4MuxCodeTableDescrTag
 0x64 ExtSLConfigDescrTag
 0x65 M4MuxBufferSizeDescrTag
 0x66 M4MuxIdentDescrTag
 0x67 DependencyPointerTag
 0x68 DependencyMarkerTag
 0x69 M4MuxChannelDescrTag
 0x6A-0xBF Reserved for ISO use
 0xC0-0xFE User private
 0xFF Forbidden
 */

/* objectTypeIndication as of 14496-1
 0x00 Forbidden
 0x01 Systems ISO/IEC 14496-1 a
 0x02 Systems ISO/IEC 14496-1 b
 0x03 Interaction Stream
 0x04 Systems ISO/IEC 14496-1 Extended BIFS Configuration c
 0x05 Systems ISO/IEC 14496-1 AFX d
 0x06 Font Data Stream
 0x07 Synthesized Texture Stream
 0x08 Streaming Text Stream
 0x09-0x1F reserved for ISO use
 0x20 Visual ISO/IEC 14496-2 e
 0x21 Visual ITU-T Recommendation H.264 | ISO/IEC 14496-10 f
 0x22 Parameter Sets for ITU-T Recommendation H.264 | ISO/IEC 14496-10 f
 0x23-0x3F reserved for ISO use
 0x40 Audio ISO/IEC 14496-3 g
 0x41-0x5F reserved for ISO use
 0x60 Visual ISO/IEC 13818-2 Simple Profile
 0x61 Visual ISO/IEC 13818-2 Main Profile
 0x62 Visual ISO/IEC 13818-2 SNR Profile
 0x63 Visual ISO/IEC 13818-2 Spatial Profile
 0x64 Visual ISO/IEC 13818-2 High Profile
 0x65 Visual ISO/IEC 13818-2 422 Profile
 0x66 Audio ISO/IEC 13818-7 Main Profile
 0x67 Audio ISO/IEC 13818-7 LowComplexity Profile
 0x68 Audio ISO/IEC 13818-7 Scaleable Sampling Rate Profile
 0x69 Audio ISO/IEC 13818-3
 0x6A Visual ISO/IEC 11172-2
 0x6B Audio ISO/IEC 11172-3
 0x6C Visual ISO/IEC 10918-1
 0x6D reserved for registration authority
 0x6E Visual ISO/IEC 15444-1
 0x6F - 0x9F reserved for ISO use
 0xA0 - 0xBF reserved for registration authority i
 0xC0 - 0xE0 user private
 0xE1 reserved for registration authority i
 0xE2 - 0xFE user private
 0xFF no object type specified h
 */
export abstract class InitialObjectDescriptor extends BaseDescriptor {
  urlFlag: number = 0;
  includeInlineProfileLevelFlag: number = 0;
  urlLength: number = 0;
  urlString: string;
  oDProfileLevelIndication: number = 0;
  sceneProfileLevelIndication: number = 0;
  audioProfileLevelIndication: number = 0;
  visualProfileLevelIndication: number = 0;
  graphicsProfileLevelIndication: number = 0;
  esDescriptors: Array<ESDescriptor> = <any>([]);
  extensionDescriptors: Array<ExtensionDescriptor> = <any>([]);
  unknownDescriptors: Array<BaseDescriptor> = <any>([]);
  /*private*/
  objectDescriptorId: number = 0;

  /**
   *
   * @param {Buffer} bb
   */
  public parseDetail(bb: StreamInputBuffer) {
    let data: number = bb.readUInt16BE();
    this.objectDescriptorId = (data & 65472) >> 6;
    this.urlFlag = (data & 63) >> 5;
    this.includeInlineProfileLevelFlag = (data & 31) >> 4;
    let sizeLeft: number = this.getSize() - 2;
    if (this.urlFlag === 1) {
      this.urlLength = bb.readUInt8();
      this.urlString = bb.readString(this.urlLength);
      sizeLeft = sizeLeft - (1 + this.urlLength);
    } else {
      this.oDProfileLevelIndication = bb.readUInt8();
      this.sceneProfileLevelIndication = bb.readUInt8();
      this.audioProfileLevelIndication = bb.readUInt8();
      this.visualProfileLevelIndication = bb.readUInt8();
      this.graphicsProfileLevelIndication = bb.readUInt8();
      sizeLeft = sizeLeft - 5;
      if (sizeLeft > 2) {
        throw new Error(`Another Descriptor is not support`);
        // let descriptor: BaseDescriptor = ObjectDescriptorFactory.createFrom(-1, bb);
        // sizeLeft = sizeLeft - descriptor.getSize();
        // if (descriptor != null && descriptor instanceof <any>ESDescriptor) {
        //   /* add */
        //   (this.esDescriptors.push(<ESDescriptor>descriptor) > 0);
        // } else {
        //   /* add */
        //   (this.unknownDescriptors.push(descriptor) > 0);
        // }
      }
    }
    if (sizeLeft > 2) {
      throw new Error(`Another Descriptor is not support`);
      // let descriptor: BaseDescriptor = ObjectDescriptorFactory.createFrom(-1, bb);
      // if (descriptor != null && descriptor instanceof <any>ExtensionDescriptor) {
      //   /* add */
      //   (this.extensionDescriptors.push(<ExtensionDescriptor>descriptor) > 0);
      // } else {
      //   /* add */
      //   (this.unknownDescriptors.push(descriptor) > 0);
      // }
    }
  }
}
