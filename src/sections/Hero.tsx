import { EditorMock } from '../components/EditorMock'
import { Brand, OutlineButton, PrimaryButton } from '../components/ui'
import { site } from '../site.config'

/** 网站导航 + 开篇 + 编辑器示意（Figma 44:279「首屏 / 落笔见章法」） */
export function Hero() {
  return (
    <header id="top" className="pb-[2px]">
      <div className="wrap flex h-[78px] items-center justify-between border-b border-line-nav">
        <Brand href="#top" />
        <nav aria-label="页面导航" className="hidden items-center gap-[30px] text-[14px] leading-5 font-medium text-text sm:flex">
          <a href="#files" className="transition-colors hover:text-accent">
            功能
          </a>
          <a href="#faq" className="transition-colors hover:text-accent">
            常见问题
          </a>
        </nav>
        <OutlineButton href={site.downloadUrl} title={site.downloadTitle}>
          获取 Mac 版
        </OutlineButton>
      </div>

      <div className="wrap flex flex-col items-center gap-[15px] pt-[34px] text-center">
        <h1 className="font-serif text-[clamp(52px,5.7vw,82px)] leading-[1.305] font-medium tracking-[-0.034em] text-heading">
          落笔见章法。
        </h1>
        <p className="max-w-[36em] text-[16px] leading-6 text-pretty text-text sm:text-[17px]">
          Rosette 是 Mac 上的本地 Markdown 编辑器。
          <br className="sm:hidden" />
          边写边预览，光标所及即见原文。
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-[10px]">
          <PrimaryButton href={site.downloadUrl} title={site.downloadTitle}>
            获取 Mac 版
          </PrimaryButton>
          <span className="text-[13px] leading-[19px] text-text-2">macOS 13 或更高版本</span>
        </div>
      </div>

      <div id="preview" className="wrap mt-[35px] rounded-2xl bg-wash-hero px-3 pt-3 pb-4 sm:px-6 sm:pt-[28px] sm:pb-[33px]">
        <div className="mock-stage">
          <EditorMock />
        </div>
      </div>
    </header>
  )
}
