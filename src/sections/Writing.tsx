import { Fragment } from 'react'
import fileIcon from '../assets/icons/file.svg'
import exportIcon from '../assets/icons/export.svg'
import arrowIcon from '../assets/icons/arrow.svg'

const STEPS = ['接收请求', '检查配额', '返回结果']

/** 技术写作与导出（Figma 44:325「功能 / 成篇自可寄」） */
export function Writing() {
  return (
    <section id="writing" aria-labelledby="writing-title" className="bg-wash-band py-16 lg:py-[81px]">
      <div className="wrap flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        {/* 示例文档：窄屏时排在文字下面 */}
        <div className="order-2 flex w-full flex-col gap-5 rounded-[13px] border border-line bg-card px-4 py-6 sm:px-[31px] sm:py-[27px] lg:order-1 lg:max-w-[641px] lg:min-w-0">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2">
              <img src={fileIcon} alt="" width={16} height={16} className="shrink-0" />
              <span className="text-[14px] leading-[22px] font-medium text-accent-ink">接口限流方案.md</span>
            </span>
            <span className="flex items-center gap-2">
              <img src={exportIcon} alt="" width={15} height={15} className="shrink-0" />
              <span className="text-[13px] leading-5 text-accent-ink">PDF / HTML</span>
            </span>
          </div>
          <div className="h-px bg-line" />
          <div className="flex flex-col gap-3">
            <p className="text-[24px] leading-[33px] font-bold text-heading sm:text-[28px] sm:leading-[37px]">请求限流流程</p>
            <p className="text-[15px] leading-[23px] text-text">为搜索和导出接口设置独立的请求上限。</p>
          </div>
          <div className="flex flex-col gap-[9px] pt-[2px]">
            <p className="text-[13px] leading-5 text-text">Mermaid</p>
            <div className="flex items-center gap-2 sm:gap-[13px]">
              {STEPS.map((step, i) => (
                <Fragment key={step}>
                  {i > 0 && <img src={arrowIcon} alt="" width={20} height={20} className="shrink-0" />}
                  <span className="min-w-0 flex-1 rounded-[7px] border border-line bg-wash-step px-1 py-[13px] text-center text-[14px] leading-[23px] font-medium whitespace-nowrap text-accent-ink sm:px-[9px] sm:text-[15px] xl:w-[134px] xl:flex-none">
                    {step}
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
          <p className="flex flex-wrap gap-x-[10px] rounded-[7px] bg-wash-code px-[14px] py-3 text-[13px] leading-5">
            <span className="text-text">超出配额时</span>
            <span className="font-mono text-accent-ink">HTTP/1.1 429 Too Many Requests</span>
          </p>
        </div>

        <div className="order-1 flex flex-col gap-[19px] lg:order-2 lg:w-[455px] lg:shrink-0">
          <h2 id="writing-title" className="font-serif text-[clamp(38px,3.62vw,52px)] leading-[1.327] font-medium tracking-[-0.025em] text-heading">
            成篇自可寄。
          </h2>
          <p className="max-w-[450px] text-[16px] leading-[31px] text-text sm:text-[17px]">
            代码块有语法高亮，表格可以直接编辑。
            <br className="hidden sm:inline" />
            Mermaid 流程图和数学公式随文排版。
          </p>
          <p className="max-w-[450px] text-[16px] leading-[31px] text-text sm:text-[17px]">
            成稿可导出为 PDF 或单个 HTML 文件。
            <br className="hidden sm:inline" />
            原来的 .md 可以接着写。
          </p>
        </div>
      </div>
    </section>
  )
}
