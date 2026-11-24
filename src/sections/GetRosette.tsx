import appIcon from '../assets/app-icon.png'
import { PrimaryButton } from '../components/ui'
import { site } from '../site.config'

/** 获取 Rosette（Figma 53:373） */
export function GetRosette() {
  return (
    <section id="download" aria-labelledby="download-title" className="wrap">
      <div className="flex flex-col items-start gap-6 rounded-[14px] border border-line-cta bg-wash-cta px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:pr-[42px] sm:pl-[38px] lg:min-h-[174px] lg:py-6">
        <div className="flex items-center gap-4 sm:gap-[19px]">
          <img src={appIcon} alt="" width={75} height={75} className="size-16 shrink-0 sm:size-[75px]" />
          <div className="flex flex-col gap-[5px]">
            <h2 id="download-title" className="font-serif text-[clamp(30px,2.57vw,37px)] leading-[1.324] font-medium tracking-[-0.014em] text-heading-deep">
              获取 Rosette
            </h2>
            <p className="text-[15px] leading-6 text-pretty text-text">macOS 13 或更高版本，支持 Apple 芯片和 Intel 芯片。</p>
          </div>
        </div>
        <PrimaryButton href={site.releasesPage} className="shrink-0">
          查看发布版本
        </PrimaryButton>
      </div>
    </section>
  )
}
