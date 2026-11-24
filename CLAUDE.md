# CLAUDE.md

Rosette 的发布仓库兼官网，说明见 README.md。应用代码在旁边的 ../Rosette（私有仓库 qinghuazs/Resotte）。

- 回复、代码注释用中文；页面只有中文
- **不要手工改 `appcast.xml`，也不要移动它**：它带 Sparkle 签名，由 ../Rosette/scripts/publish-release.sh 按仓库根目录这个路径更新；改了构建配置要按 README 核对 `dist/appcast.xml` 与源文件逐字节一致、签名校验通过
- 版式以 Figma「Rosette 官网 · 桌面设计稿」（E0q2KIc87foDgm8rb4SUdA，「完整官网 · 优化版」画板 73:459；「纸面精修版」53:278 和「A 纸面版」44:278 是旧稿）为准；颜色只用 `src/styles.css` 里的语义变量（与 Figma 变量 `Color/*` 同名），示意窗口的配色在 `EditorMock.css`（深色取应用 web/src/editor.css 的深色变量）
- 产品描述要和应用实际功能一致（核对 ../Rosette/docs/需求文档.md）
- 改完跑 `npm run build`，并在 1440 与 390 宽度截图检查；1440 宽时整页高 3543，与设计稿一致；专注写作、技术写作两块在 1280 以上才左右并排（卡片定宽，更窄放不下）
- 提交邮箱用 qinghuazangshui@gmail.com（已设为仓库配置）
- 暂时不加价格、收费相关的信息；网站暂时不做深色版（2026-11-24 用户定）
- 动效：首屏窗口里光标往返（演示「光标所及即见原文」）是唯一的「表演」，其余动效只说明状态变化（专注卡片首次进入视野自动切到专注、切换按钮选中块滑动、切换视图淡入、提示条进出）。不加每个区块的滚动淡入。缓动用 cubic-bezier(0.16, 1, 0.3, 1)，退场快于进场；每个动效都有 prefers-reduced-motion 的替代（不循环、不位移，只留透明度）。循环在窗口不可见、页面隐藏或切到源码视图时暂停
