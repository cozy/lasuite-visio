/// <reference types="vite/client" />
interface ImportMetaEnv {
  // Twake override
  readonly VITE_BRIDGE_TARGET_ORIGIN_ALLOWLIST?: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
