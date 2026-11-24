# Rosette

Rosette 是 macOS 上的本地 Markdown 编辑器。

这个仓库用来发布 Rosette：

- **官网**：<https://getrosette.vercel.app>，源码就在这个仓库（见下面“官网”一节）。
- **安装包**在 [Releases](https://github.com/qinghuazs/RosetteSite/releases)。下载 `Rosette-<版本>.dmg`，打开后把 Rosette 拖进“应用程序”文件夹。
- **`appcast.xml`** 是应用内更新用的版本清单，由 Vercel 发布在 <https://getrosette.vercel.app/appcast.xml>（推送到 main 自动部署）。清单带 EdDSA 签名，改动后必须重新签名，否则所有用户检查更新都会失败，所以不要手工编辑，由 Rosette 代码仓库的 `scripts/publish-release.sh` 更新。

系统要求：macOS 13 或更高版本，Apple 芯片或 Intel 芯片。

## 官网

按 Figma「Rosette 官网 · 桌面设计稿」的「完整官网 · 纸面精修版」（文件 `E0q2KIc87foDgm8rb4SUdA`，节点 53:278）实现的单页静态网站，1440 宽时与设计稿逐像素对齐（整页 3513 高），窄屏改为单栏。三个示例可以点：首屏窗口切换即时预览 / 源码 / 深色外观，专注写作卡片切换普通 / 专注，技术写作卡片切换流程图 / 表格 / 公式（分别对应设计稿里的组件变体 61:395、62:420）。
技术栈与 MaClean 官网相同：Vite 8 + React 19 + TypeScript + Tailwind CSS v4，没有后端。

```bash
npm install
npm run dev       # 本地开发，http://localhost:5173
npm run build     # 类型检查 + 构建到 dist/
npm run preview   # 预览构建结果（含 appcast.xml）
```

### 结构

```
appcast.xml                  版本清单（留在仓库根目录，发布脚本按这个路径改）
vite.config.ts               构建；把 appcast.xml 原样放进 dist/，并从中读出最新版本
src/site.config.ts           下载地址、版本发布页
src/styles.css               设计变量（颜色、字体）与 Tailwind 主题
src/components/EditorMock.*  首屏的编辑器示意窗口（可切换即时预览 / 源码 / 深色外观）
src/components/ui.tsx        品牌、按钮、示例卡片的切换按钮
src/sections/                首屏、专注写作、本地文件、技术写作、常见问题、获取 Rosette、页脚
src/assets/                  应用图标（取自代码仓库 Support/Icon/AppIcon-1024.png）、设计稿导出的图标、
                             首屏纸纹底图（设计稿导出的 PNG 有 2.4 MB，按原分辨率转成 WebP，165 KB）
```

### 下载按钮跟着版本清单走

“获取 Mac 版”直接下载最新的 dmg。地址不是写死的：构建时从 `appcast.xml` 最上面的 `<item>` 读出版本和安装包地址（`vite.config.ts`）。
发新版时发布脚本先把 dmg 传到 Releases、再改清单并推送，Vercel 重新构建，按钮就指向新版本，网页不用另外改。清单里还没有版本时，按钮退到版本发布页。

### 版本清单必须原样发布

清单的签名覆盖整个文件，构建时按原始字节写进 `dist/appcast.xml`，不经过任何处理；`vercel.json` 给它设了 XML 类型、每次都向服务器确认。
改了构建配置后，用下面的命令确认构建结果里的清单没变、签名仍然有效：

```bash
npm run build && cmp appcast.xml dist/appcast.xml
../Rosette/.build/artifacts/sparkle/Sparkle/bin/sign_update --account rosette --verify dist/appcast.xml
```

### 字体

正文 Noto Sans SC（可变字体）、大标题 Noto Serif SC 500、代码 Roboto Mono，都用 @fontsource 随网站打包（国内访问不到 Google Fonts）。
中文按 unicode-range 分片，浏览器只下载页面用到的字（目前正文约 14 片、770 KB）；没加载完时先用苹方显示。

## 部署

Vercel 项目连着这个仓库，推送到 `main` 自动构建并部署正式环境（`vercel.json` 指定了 Vite、`npm ci`、`npm run build`、输出 `dist`），线上地址 <https://getrosette.vercel.app>。
构建失败时 Vercel 继续使用上一次成功的部署，版本清单不会中断。
