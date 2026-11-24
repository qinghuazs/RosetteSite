// 网站上用到的链接都从这里取。下载地址来自版本清单（见 vite.config.ts），发新版不用改这里。

const release = __ROSETTE_RELEASE__
const latest = release.latest

export const site = {
  /** 官网地址：手机上「复制下载链接」复制的就是它 */
  homepage: 'https://getrosette.vercel.app/',
  /** GitHub 上的版本发布页，所有安装包都在这里 */
  releasesPage: release.releasesPage,
  /** 最新版本，例如 1.0.0；清单里还没有版本时为 null */
  version: latest?.version ?? null,
  /** “获取 Mac 版”：直接下载最新的 dmg；还没有版本时退到版本发布页 */
  downloadUrl: latest?.url ?? release.releasesPage,
  /** 下载区按钮下面的一行，例如「1.0.0 · 9.4 MB」 */
  releaseLine: latest ? `${latest.version} · ${(latest.length / 1024 / 1024).toFixed(1)} MB` : null,
  /** 下载按钮的提示文字 */
  downloadTitle: latest
    ? `下载 Rosette ${latest.version}（${(latest.length / 1024 / 1024).toFixed(1)} MB）`
    : '前往版本发布页',
} as const
