# Rosette

Rosette 是 macOS 上的本地 Markdown 编辑器。

这个仓库用来发布 Rosette：

- **安装包**在 [Releases](https://github.com/qinghuazs/RosetteSite/releases)。下载 `Rosette-<版本>.dmg`，打开后把 Rosette 拖进“应用程序”文件夹。
- **`appcast.xml`** 是应用内更新用的版本清单，由 Vercel 发布在 <https://getrosette.vercel.app/appcast.xml>（推送到 main 自动部署）。清单带 EdDSA 签名，改动后必须重新签名，否则所有用户检查更新都会失败，所以不要手工编辑，由发布脚本更新。

系统要求：macOS 13 或更高版本，Apple 芯片或 Intel 芯片。
