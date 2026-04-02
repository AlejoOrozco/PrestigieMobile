/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly WHATSAPP_PHONE_E164?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
