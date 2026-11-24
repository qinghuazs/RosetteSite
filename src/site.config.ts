// 网站上用到的链接都从这里取。下载地址来自版本清单（见 vite.config.ts），发新版不用改这里。

const release = __ROSETTE_RELEASE__

export const site = {
  /** GitHub 上的版本发布页，所有安装包都在这里 */
  releasesPage: release.releasesPage,
  /** 最新版本，例如 1.0.0；清单里还没有版本时为 null */
  version: release.latest?.version ?? null,
  /** “获取 Mac 版”：直接下载最新的 dmg；还没有版本时退到版本发布页 */
  downloadUrl: release.latest?.url ?? release.releasesPage,
  /** 下载按钮的提示文字 */
  downloadTitle: release.latest
    ? `下载 Rosette ${release.latest.version}（${(release.latest.length / 1024 / 1024).toFixed(1)} MB）`
    : '前往版本发布页',
} as const
