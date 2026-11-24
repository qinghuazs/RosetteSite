import paper from '../assets/images/hero-paper.webp'
import { EditorMock } from '../components/EditorMock'
import { Brand, OutlineButton, PrimaryButton } from '../components/ui'
import { site } from '../site.config'

/** 网站导航 + 开篇 + 编辑器示意（Figma 53:279「首屏 / 落笔见章法」） */
export function Hero() {
  return (
    <header id="top" className="pb-[14px]">
      <div className="wrap flex h-[78px] items-center justify-between border-b border-line-nav">
        <Brand href="#top" />
        <nav aria-label="页面导航" className="hidden items-center gap-[30px] text-[14px] leading-5 font-medium text-text sm:flex">
          <a href="#focus" className="transition-colors hover:text-accent">
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

      <div className="wrap flex flex-col items-center gap-[13px] pt-[35px] text-center">
        <h1 className="font-serif text-[clamp(60px,6.18vw,89px)] leading-[1.236] font-medium tracking-[-0.012em] text-heading-deep">
          落笔见章法
        </h1>
        <p className="text-[16px] leading-[26px] text-text-hero sm:text-[17px]">
          Mac 上的本地 Markdown 编辑器。
          <br />
          边写边预览，文稿就留在你的文件夹。
        </p>
        <div className="flex flex-col items-center gap-[7px] pt-[6px]">
          <PrimaryButton href={site.downloadUrl} title={site.downloadTitle}>
            获取 Mac 版
          </PrimaryButton>
          <span className="text-[13px] leading-[19px] text-text-2">macOS 13 或更高版本</span>
        </div>
      </div>

      {/* 未涂布纸的底衬，编辑器示意摆在中间 */}
      <div
        id="preview"
        className="wrap relative mt-[44px] overflow-hidden rounded-[14px] border border-line-hero px-3 pt-4 pb-4 sm:px-6 sm:pt-[27px] sm:pb-[26.62px]"
      >
        <img src={paper} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full object-cover" />
        <div className="mock-stage relative">
          <EditorMock />
        </div>
      </div>
    </header>
  )
}
