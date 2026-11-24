/// <reference types="vite/client" />

/** 构建时从 appcast.xml 读出的最新版本（vite.config.ts）；清单里还没有版本时 latest 为 null。 */
declare const __ROSETTE_RELEASE__: {
  releasesPage: string
  latest: { version: string; url: string; length: number } | null
}
