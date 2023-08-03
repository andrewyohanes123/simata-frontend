import {
  IMAGE_MIME_TYPE,
  MIME_TYPES,
  MS_EXCEL_MIME_TYPE,
  MS_POWERPOINT_MIME_TYPE,
  MS_WORD_MIME_TYPE,
} from "@mantine/dropzone";

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
