import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 版本清单 appcast.xml 放在仓库根目录，由 Rosette 代码仓库的 scripts/publish-release.sh 更新并签名。
// 应用每天从 https://getrosette.vercel.app/appcast.xml 读它，签名覆盖整个文件，差一个字节所有用户检查更新都会失败，
// 所以这里按原始字节放进构建结果，不经过任何处理。
const APPCAST = resolve(import.meta.dirname, 'appcast.xml')

const RELEASES_PAGE = 'https://github.com/qinghuazs/RosetteSite/releases'

// 从清单里取最新的版本（清单里最上面的 <item>），网页上的下载按钮直接指向它的安装包；
// 发新版时发布脚本改了清单并推送，Vercel 重新构建，按钮就跟着换，不用另外改网页。
function latestRelease(xml: string) {
  const item = xml.match(/<item>([\s\S]*?)<\/item>/)?.[1]
  if (!item) return null
  const version = item.match(/<sparkle:shortVersionString>([^<]+)</)?.[1]
  const enclosure = item.match(/<enclosure\b[^>]*>/)?.[0] ?? ''
  const url = enclosure.match(/\burl="([^"]+)"/)?.[1]
  const length = Number(enclosure.match(/\blength="(\d+)"/)?.[1] ?? 0)
  if (!version || !url) return null
  return { version, url, length }
}

function appcast(): Plugin {
  return {
    name: 'rosette-appcast',
    config() {
      const release = latestRelease(readFileSync(APPCAST, 'utf8'))
      return {
        define: {
          __ROSETTE_RELEASE__: JSON.stringify({ releasesPage: RELEASES_PAGE, latest: release }),
        },
      }
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'appcast.xml', source: readFileSync(APPCAST) })
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), appcast()],
})
