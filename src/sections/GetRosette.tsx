import appIcon from '../assets/app-icon.png'
import { PrimaryButton } from '../components/ui'
import { site } from '../site.config'

/** 获取 Rosette（Figma 44:376） */
export function GetRosette() {
  return (
    <section id="download" aria-labelledby="download-title" className="wrap">
      <div className="flex flex-col items-center gap-3 rounded-[15px] bg-wash-cta px-6 py-10 text-center sm:px-[50px]">
        <img src={appIcon} alt="" width={91} height={91} className="size-[91px]" />
        <h2 id="download-title" className="font-serif text-[clamp(34px,2.92vw,42px)] leading-[1.31] font-medium tracking-[-0.025em] text-heading">
          获取 Rosette
        </h2>
        <p className="text-[15px] leading-[25px] text-pretty text-text sm:text-[16px]">
          macOS 13 或更高版本，支持 Apple 芯片和 Intel 芯片。
        </p>
        <div className="pt-[10px]">
          <PrimaryButton href={site.releasesPage}>查看发布版本</PrimaryButton>
        </div>
      </div>
    </section>
  )
}
