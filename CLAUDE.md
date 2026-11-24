# CLAUDE.md

Rosette 的发布仓库兼官网，说明见 README.md。应用代码在旁边的 ../Rosette（私有仓库 qinghuazs/Resotte）。

- 回复、代码注释用中文；页面只有中文
- **不要手工改 `appcast.xml`，也不要移动它**：它带 Sparkle 签名，由 ../Rosette/scripts/publish-release.sh 按仓库根目录这个路径更新；改了构建配置要按 README 核对 `dist/appcast.xml` 与源文件逐字节一致、签名校验通过
- 版式以 Figma「Rosette 官网 · 桌面设计稿」（E0q2KIc87foDgm8rb4SUdA，「完整官网 · 优化版」画板 73:459；「纸面精修版」53:278 和「A 纸面版」44:278 是旧稿）为准；颜色只用 `src/styles.css` 里的语义变量（与 Figma 变量 `Color/*` 同名），示意窗口的配色在 `EditorMock.css`（深色取应用 web/src/editor.css 的深色变量）
- 产品描述要和应用实际功能一致（核对 ../Rosette/docs/需求文档.md）
- 改完跑 `npm run build`，并在 1440 与 390 宽度截图检查；1440 宽时整页高 3543，与设计稿一致；专注写作、技术写作两块在 1280 以上才左右并排（卡片定宽，更窄放不下）
- 提交邮箱用 qinghuazangshui@gmail.com（已设为仓库配置）
- 暂时不加价格、收费相关的信息；网站暂时不做深色版（2026-11-24 用户定）
- 动效（第一版太轻、用户感觉不到；第二版加了打字和整页入场，关键动作被拖到第 10 秒左右；第三版按 GPT 审核收敛到现在这样）：首屏只有两件事——标题逐字落墨（约 1.1 秒），随后窗口里光标从加粗那一行跳到「超限响应」标题一次（`**` 收起、`##` 挂出），打开页面约 1.3 秒时播，播完停住，不循环、不打字；副标题、按钮、窗口直接显示。往下滚：只有示例卡片（带 `data-reveal`）第一次进入视野时升起；专注卡片切一次专注、搜索命中刷一次黄底（armOnFirstView，按 intersectionRatio 判断露出比例，打开页面时就在视野里的卡片保持静态）。文字、问答、下载区、页脚直接显示。点击反馈：切换按钮选中块滑动、切换视图 220ms 淡入、实心按钮悬停抬起 1px、提示条进出。缓动用 cubic-bezier(0.16, 1, 0.3, 1)，退场快于进场，动画用 fill-mode backwards（播完不占 transform）；演示不得引起布局位移。每个动效都有 prefers-reduced-motion 的替代：不隐藏、不位移、不自动演示，直接是设计稿的静态画面
