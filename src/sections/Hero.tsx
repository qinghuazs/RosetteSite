import paper from '../assets/images/hero-paper.webp'
import { EditorMock } from '../components/EditorMock'
import { Brand, OutlineButton, PrimaryButton } from '../components/ui'
import { useDownload } from '../components/download'

/** 网站导航 + 开篇 + 编辑器示意（Figma 优化版 73:460「首屏 / 落笔见章法」；手机见「手机 390 · 首屏」） */
export function Hero() {
  const download = useDownload()
  return (
    <header id="top" className="pb-[14px]">
      <div className="wrap flex h-[78px] items-center justify-between border-b border-divider">
        <Brand href="#top" />
        <nav aria-label="页面导航" className="hidden items-center gap-[30px] text-[14px] leading-5 font-medium text-text sm:flex">
          <a href="#focus" className="transition-colors hover:text-accent">
            功能
          </a>
          <a href="#faq" className="transition-colors hover:text-accent">
            常见问题
          </a>
        </nav>
        {download.mobile ? (
          <a href="#faq" className="text-[14px] leading-5 font-medium text-text transition-colors hover:text-accent sm:hidden">
            常见问题
          </a>
        ) : (
          <OutlineButton href={download.href} title={download.title}>
            {download.label}
          </OutlineButton>
        )}
      </div>

      <div className="wrap flex flex-col items-center gap-[13px] pt-[35px] text-center">
        <h1 className="font-serif text-[clamp(60px,6.18vw,89px)] leading-[1.236] font-medium tracking-[-0.012em] text-heading">
          落笔见章法
        </h1>
        <p className="text-[16px] leading-[26px] text-text sm:text-[17px]">
          Mac 上的本地 Markdown 编辑器。
          <br />
          边写边预览，光标所及即见原文。
        </p>
        <div className="flex flex-col items-center gap-[7px] pt-[6px]">
          <PrimaryButton href={download.href} title={download.title} onClick={download.onClick}>
            {download.label}
          </PrimaryButton>
          {download.mobile ? (
            <span className="text-[13px] leading-5 text-muted">
              Rosette 是 Mac 应用。
              <br />
              在 Mac 上打开本页即可下载，需要 macOS 13 或更高版本。
            </span>
          ) : (
            <span className="text-[13px] leading-[19px] text-secondary">macOS 13 或更高版本</span>
          )}
        </div>
      </div>

      {/* 未涂布纸的底衬，编辑器示意摆在中间 */}
      <div
        id="preview"
        className="wrap relative mt-[44px] overflow-hidden rounded-[14px] border border-divider px-3 pt-4 pb-4 sm:px-6 sm:pt-[27px] sm:pb-[26.62px]"
      >
        <img src={paper} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full object-cover" />
        <div className="mock-stage relative">
          <EditorMock />
        </div>
      </div>
    </header>
  )
}
