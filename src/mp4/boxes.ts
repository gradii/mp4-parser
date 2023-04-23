import { avc1 } from './boxes/avc1';
import { avcC } from './boxes/avcC';
import { btrt } from './boxes/btrt';
import { co64 } from './boxes/co64';
import { ctts } from './boxes/ctts';
import { dref } from './boxes/dref';
import { elst } from './boxes/elst';
import { esds } from './boxes/esds';
import { ftyp } from './boxes/ftyp';
import { hdlr } from './boxes/hdlr';
import { iods } from './boxes/iods';
import { mdat } from './boxes/mdat';
import { mdhd } from './boxes/mdhd';
import { meta } from './boxes/meta';
import { mp4a } from './boxes/mp4a';
import { mvhd } from './boxes/mvhd';
import { pasp } from './boxes/pasp';
import { sdtp } from './boxes/sdtp';
import { smhd } from './boxes/smhd';
import { stco } from './boxes/stco';
import { stsc } from './boxes/stsc';
import { stsd } from './boxes/stsd';
import { stss } from './boxes/stss';
import { stsz } from './boxes/stsz';
import { stts } from './boxes/stts';
import { thmb } from './boxes/thmb';
import { tkhd } from './boxes/tkhd';
import { udta } from './boxes/udta';
import { url } from './boxes/url';
import { vmhd } from './boxes/vmhd';
import { PRIVATE_BOXES } from './private-boxes';

export {
  avc1,
  avcC,
  btrt,
  co64,
  ctts,
  dref,
  elst,
  esds,
  ftyp,
  hdlr,
  iods,
  mdat,
  mdhd,
  meta,
  mp4a,
  mvhd,
  pasp,
  sdtp,
  smhd,
  stco,
  stsc,
  stsd,
  stss,
  stsz,
  stts,
  thmb,
  tkhd,
  udta,
  url,
  vmhd
};


export const Boxes: any = PRIVATE_BOXES;

PRIVATE_BOXES['avc1'] = avc1;
PRIVATE_BOXES['avcC'] = avcC;
PRIVATE_BOXES['btrt'] = btrt;
PRIVATE_BOXES['co64'] = co64;
PRIVATE_BOXES['ctts'] = ctts;
PRIVATE_BOXES['dref'] = dref;
PRIVATE_BOXES['elst'] = elst;
PRIVATE_BOXES['esds'] = esds;
PRIVATE_BOXES['ftyp'] = ftyp;
PRIVATE_BOXES['hdlr'] = hdlr;
PRIVATE_BOXES['iods'] = iods;
PRIVATE_BOXES['mdat'] = mdat;
PRIVATE_BOXES['mdhd'] = mdhd;
PRIVATE_BOXES['meta'] = meta;
PRIVATE_BOXES['mp4a'] = mp4a;
PRIVATE_BOXES['mvhd'] = mvhd;
PRIVATE_BOXES['pasp'] = pasp;
PRIVATE_BOXES['sdtp'] = sdtp;
PRIVATE_BOXES['smhd'] = smhd;
PRIVATE_BOXES['stco'] = stco;
PRIVATE_BOXES['stsc'] = stsc;
PRIVATE_BOXES['stsd'] = stsd;
PRIVATE_BOXES['stss'] = stss;
PRIVATE_BOXES['stsz'] = stsz;
PRIVATE_BOXES['stts'] = stts;
PRIVATE_BOXES['thmb'] = thmb;
PRIVATE_BOXES['tkhd'] = tkhd;
PRIVATE_BOXES['udta'] = udta;
PRIVATE_BOXES['url '] = url;
PRIVATE_BOXES['vmhd'] = vmhd;
