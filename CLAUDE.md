# CLAUDE.md

Rosette 的发布仓库兼官网，说明见 README.md。应用代码在旁边的 ../Rosette（私有仓库 qinghuazs/Resotte）。

- 回复、代码注释用中文；页面只有中文
- **不要手工改 `appcast.xml`，也不要移动它**：它带 Sparkle 签名，由 ../Rosette/scripts/publish-release.sh 按仓库根目录这个路径更新；改了构建配置要按 README 核对 `dist/appcast.xml` 与源文件逐字节一致、签名校验通过
- 版式以 Figma「Rosette 官网 · 桌面设计稿」（E0q2KIc87foDgm8rb4SUdA，节点 44:278）为准；颜色只用 `src/styles.css` 里的语义变量，示意窗口的配色在 `EditorMock.css`（深色取应用 web/src/editor.css 的深色变量）
- 产品描述要和应用实际功能一致（核对 ../Rosette/docs/需求文档.md）
- 改完跑 `npm run build`，并在 1440 与 390 宽度截图检查；1440 宽时整页高 3180，与设计稿一致
- 提交邮箱用 qinghuazangshui@gmail.com（已设为仓库配置）
