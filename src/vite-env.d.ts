/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Preferido en Vercel (expuesto al cliente en build). */
  readonly VITE_WHATSAPP_PHONE_E164?: string
  readonly WHATSAPP_PHONE_E164?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
