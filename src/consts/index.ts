import gereja from "assets/icons/GEREJA.png";
import jalanKota from "assets/icons/JALAN KOTA.png";
import jalanNegara from "assets/icons/JALAN NEGARA.png";
import jalanPropinsi from "assets/icons/JALAN PROPINSI.png";
import wifi from "assets/icons/1001 WIFI.png";
import bank from "assets/icons/BANK.png";
import jembatan from "assets/icons/JEMBATAN.png";
import lampuJalan from "assets/icons/LAMPU JALAN.png";
import menaraTelekomunikasi from "assets/icons/MENARA TELEKOMUNIKASI.png";
import mesjid from "assets/icons/MESJID.png";
import pemkot from "assets/icons/PERKANTORAN PEMKOT BITUNG.png";
import pemprov from "assets/icons/PERKANTORAN PEMPROV SULUT.png";
import sabodam from "assets/icons/SABODAM.png";
import saluranAlur from "assets/icons/SALURAN ALUR.png";
import saluranOutlet from "assets/icons/SALURAN OUTLET.png";
import terminal from "assets/icons/TERMINAL.png";
import rumahTinggal from "assets/icons/RUMAH TINGGAL.png";
import rukoToko from "assets/icons/TOKO-RUKO.png";

export const mapIcons = [
  {
    name: "GEREJA",
    icon: gereja,
  },
  {
    name: "JALAN KOTA",
    icon: jalanKota,
  },
  {
    name: "JALAN NEGARA",
    icon: jalanNegara,
  },
  {
    name: "JALAN PROPINSI",
    icon: jalanPropinsi,
  },
  {
    name: "1001 WIFI",
    icon: wifi,
  },
  {
    name: "BANK",
    icon: bank,
  },
  {
    name: "jembatan",
    icon: jembatan,
  },
  {
    name: "lampu jalan",
    icon: lampuJalan,
  },
  {
    name: "menara telekomunikasi",
    icon: menaraTelekomunikasi,
  },
  {
    name: "mesjid",
    icon: mesjid,
  },
  {
    name: "PERKANTORAN PEMKOT BITUNG",
    icon: pemkot,
  },
  {
    name: "PERKANTORAN PEMPROV SULUT",
    icon: pemprov,
  },
  {
    name: "SABODAM",
    icon: sabodam,
  },
  {
    name: "SALURAN ALUR",
    icon: saluranAlur,
  },
  {
    name: "SALURAN OUTLET",
    icon: saluranOutlet,
  },
  {
    name: "terminal",
    icon: terminal,
  },
  {
    name: "rumah tinggal",
    icon: rumahTinggal,
  },
  {
    name: "toko/ruko",
    icon: rukoToko,
  },
];

import {
  IMAGE_MIME_TYPE,
  MIME_TYPES,
  MS_EXCEL_MIME_TYPE,
  MS_POWERPOINT_MIME_TYPE,
  MS_WORD_MIME_TYPE,
} from "@mantine/dropzone";
import mapboxgl from "mapbox-gl";

export const mimeFileType = {
  "application/pdf": "PDF",
  "image/jpeg": "Gambar",
  "image/png": "Gambar",
  "image/webp": "Gambar",
};

export const likeClause = import.meta.env.VITE_APP_LIKE_CLAUSE;
export const baseURL = import.meta.env.VITE_APP_BASEURL;

export const acceptedMimes = [
  ...IMAGE_MIME_TYPE,
  MIME_TYPES.pdf,
  ...MS_EXCEL_MIME_TYPE,
  ...MS_EXCEL_MIME_TYPE,
  ...MS_POWERPOINT_MIME_TYPE,
  ...MS_WORD_MIME_TYPE,
].join(",");

export const landuseColors: mapboxgl.Expression = [
  'match',
  ['get', 'POLA_RUANG'],
  'Cagar Alam', '#16a085',
  'Global Hub Port (Terminal-1) Bitung', '#3498db',
  'Global Hub Port (Terminal-1) P.Lembeh', '#2980b9',
  'Global Hub Port (Terminal-2)', '#2980b9',
  'Holding Zone', '#f1c40f',
  'Kawasan Hutan Lindung', '#2ecc71',
  'Kawasan Hutan Rakyat', '#27ae60',
  'Kawasan Hutan Wisata', '#78e08f',
  'Kawasan Industri', '#82ccdd',
  'Kawasan Pantai Berhutan Bakau', '#079992',
  'Kawasan Wilayah Pesisir dan Pulau Kecil', '#00a8ff',
  'Pariwisata', '#fbc531',
  'Pelabuhan/Terminal Khusus', '#00b894',
  'Pelayanan Umum', '#d63031',
  'Pendidikan', '#ff4757',
  'Perdagangan dan Jasa', '#2d3436',
  'Perkantoran', '#EA2027',
  'Pertahanan dan Keamanan', '#009432',
  'Pertambangan', '#3d3d3d',
  'Pertanian/Perkebunan', '#32ff7e',
  'Perumahan', '#7d5fff',
  'Resapan Air', '#7efff5',
  'RTH', '#7158e2',
  'Sempadan Sungai dan Pantai', '#18dcff',
  'Suaka Alam Laut', '#17c0eb',
  'Terminal', '#ff793f',
  'TWA Batu Angus', '#33d9b2',
  'TWA Batu Putih', '#34ace0',
  '#ff5252'
]