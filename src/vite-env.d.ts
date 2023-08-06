/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASEURL: string
  readonly VITE_APP_LIKE_CLAUSE: string;
  readonly VITE_APP_MAP_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}