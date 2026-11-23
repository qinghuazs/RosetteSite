# Rosette

Rosette 是 macOS 上的本地 Markdown 编辑器。

这个仓库用来发布 Rosette：

- **安装包**在 [Releases](https://github.com/qinghuazs/RosetteSite/releases)。下载 `Rosette-<版本>.dmg`，打开后把 Rosette 拖进“应用程序”文件夹。
- **`appcast.xml`** 是应用内更新用的版本清单，经 GitHub Pages 发布在 <https://qinghuazs.github.io/RosetteSite/appcast.xml>。清单带 EdDSA 签名，改动后必须重新签名，否则所有用户检查更新都会失败，所以不要手工编辑，由发布脚本更新。

系统要求：macOS 13 或更高版本，Apple 芯片或 Intel 芯片。
