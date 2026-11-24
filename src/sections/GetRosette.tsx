import appIcon from '../assets/app-icon.png'
import { useDownload } from '../components/download'
import { LightButton } from '../components/ui'
import { site } from '../site.config'

/** 获取 Rosette（Figma 优化版 73:553，深色收尾） */
export function GetRosette() {
  const download = useDownload()
  return (
    <section id="download" aria-labelledby="download-title" className="wrap">
      <div className="flex flex-col items-start gap-6 rounded-[14px] bg-band px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:pr-[42px] sm:pl-[38px] lg:min-h-[174px] lg:py-6">
        <div className="flex items-center gap-4 sm:gap-[19px]">
          <img src={appIcon} alt="" width={75} height={75} className="size-16 shrink-0 sm:size-[75px]" />
          <div className="flex flex-col gap-[5px]">
            <h2 id="download-title" className="font-serif text-[clamp(30px,2.57vw,37px)] leading-[1.324] font-medium tracking-[-0.014em] text-band-heading">
              获取 Rosette
            </h2>
            <p className="text-[15px] leading-6 text-pretty text-band-text">macOS 13 或更高版本，支持 Apple 芯片和 Intel 芯片。</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-[9px] sm:items-end">
          <LightButton href={download.href} title={download.title} onClick={download.onClick}>
            {download.label}
          </LightButton>
          <p className="flex flex-wrap gap-x-[6px] text-[13px] leading-5 whitespace-nowrap text-band-text">
            {site.releaseLine && (
              <>
                <span>{site.releaseLine}</span>
                <span aria-hidden="true">·</span>
              </>
            )}
            <a href={site.releasesPage} className="font-medium text-band-heading underline underline-offset-2 hover:text-white">
              所有版本与更新记录
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
