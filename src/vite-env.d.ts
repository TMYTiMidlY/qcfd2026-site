/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PHONE_ZY: string
  readonly VITE_PHONE_WJC: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
