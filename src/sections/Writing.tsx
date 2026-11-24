import { Fragment, useState } from 'react'
import fileIcon from '../assets/icons/file-15.svg'
import arrowIcon from '../assets/icons/arrow.svg'
import { Segmented } from '../components/ui'

type View = 'flow' | 'table' | 'math'

const VIEWS: { value: View; label: string }[] = [
  { value: 'flow', label: '流程图' },
  { value: 'table', label: '表格' },
  { value: 'math', label: '公式' },
]

const CONTENT: Record<View, { title: string; desc: string }> = {
  flow: { title: '请求限流流程', desc: '为搜索和导出接口设置独立的请求上限。' },
  table: { title: '接口配额', desc: '用表格把每个接口的配额和等待时间排在一起。' },
  math: { title: '平均请求速率', desc: '用观测时长和请求总量计算每秒请求数。' },
}

const STEPS = ['接收请求', '检查配额', '返回结果']

const QUOTAS = [
  { api: 'GET /v1/search', quota: '60 次', wait: '60 秒' },
  { api: 'POST /v1/export', quota: '10 次', wait: '60 秒' },
]

/** 表格的三列：桌面上按设计稿的列宽，窄屏按比例 */
const tableCols = 'grid grid-cols-[1.5fr_1fr_1fr] gap-x-2 pr-[14px] pl-3 sm:grid-cols-[232px_151px_158px] sm:gap-x-0'

function FlowView() {
  return (
    <div className="flex w-full flex-col gap-[9px]">
      <p className="text-[12px] leading-[18px] text-muted">Mermaid</p>
      <div className="flex items-center gap-2 sm:gap-[13px]">
        {STEPS.map((step, i) => (
          <Fragment key={step}>
            {i > 0 && <img src={arrowIcon} alt="" width={20} height={20} className="shrink-0" />}
            <span className="min-w-0 flex-1 rounded-[7px] border border-divider bg-wash-strong px-1 py-[13px] text-center text-[14px] leading-[23px] font-medium whitespace-nowrap text-accent sm:px-[9px] sm:text-[15px] xl:w-[134px] xl:flex-none">
              {step}
            </span>
          </Fragment>
        ))}
      </div>
      <p className="flex flex-wrap gap-x-[10px] rounded-[6px] bg-wash px-[11px] py-2 text-[12px] leading-[18px]">
        <span className="text-text">超出配额时</span>
        <span className="font-mono text-accent">HTTP/1.1 429 Too Many Requests</span>
      </p>
    </div>
  )
}

function TableView() {
  return (
    <div role="table" aria-label="接口配额" className="w-full overflow-hidden rounded-[6px] border border-divider text-[13px] leading-5 text-heading">
      <div role="row" className={`${tableCols} h-[37px] items-center bg-wash-strong font-bold`}>
        <span role="columnheader">接口</span>
        <span role="columnheader">每分钟配额</span>
        <span role="columnheader">重试等待</span>
      </div>
      {QUOTAS.map((row, i) => (
        <div key={row.api} role="row" className={`${tableCols} h-[39px] items-center ${i > 0 ? 'border-t border-divider' : ''}`}>
          <span role="cell" className="font-mono whitespace-nowrap">
            {row.api}
          </span>
          <span role="cell">{row.quota}</span>
          <span role="cell">{row.wait}</span>
        </div>
      ))}
    </div>
  )
}

function MathView() {
  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-[7px] bg-wash px-4 py-[11px]">
      <div className="flex items-center gap-3 font-serif font-normal text-heading" role="img" aria-label="r 等于 N 除以 Δt">
        <span className="text-[32px] leading-[35px]">r =</span>
        <span className="flex flex-col items-center gap-px">
          <span className="text-[26px] leading-[28px]">N</span>
          <span className="h-px w-16 bg-heading" />
          <span className="text-[26px] leading-[30px]">Δt</span>
        </span>
      </div>
      <p className="text-center text-[13px] leading-5 text-text">N 为请求总数，Δt 为观测时长（秒）。</p>
    </div>
  )
}

/** 技术写作示例（Figma 组件「官网 / 技术写作演示」，View = Flow / Table / Math） */
function WritingDemo() {
  const [view, setView] = useState<View>('flow')
  const { title, desc } = CONTENT[view]

  return (
    <div className="flex w-full flex-col gap-3 rounded-[10px] border border-divider bg-card px-4 py-[19px] sm:px-[28px] xl:order-1 xl:h-[368px] xl:w-[641px] xl:shrink-0">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <span className="flex items-center gap-[7px]">
          <img src={fileIcon} alt="" width={15} height={15} className="shrink-0" />
          <span className="text-[13px] leading-5 font-medium whitespace-nowrap text-accent">接口限流方案.md</span>
        </span>
        <Segmented label="排版示例" options={VIEWS} value={view} onChange={setView} selectedWeight="font-bold" itemPadding="px-[9px] sm:px-3" />
      </div>
      <div className="h-px bg-divider" />
      <div className="flex flex-col items-start gap-[9px] xl:h-[209px]">
        <p className="text-[24px] leading-[33px] font-bold text-heading sm:text-[27px] sm:leading-9">{title}</p>
        <p className="text-[14px] leading-[21px] text-text">{desc}</p>
        {view === 'flow' && <FlowView />}
        {view === 'table' && <TableView />}
        {view === 'math' && <MathView />}
      </div>
      <div className="h-px bg-divider" />
      <div className="flex items-center justify-between text-[12px] leading-[18px]">
        <span className="text-text">导出格式</span>
        <span className="font-medium text-accent">PDF / HTML</span>
      </div>
    </div>
  )
}

/** 技术写作与导出（Figma 53:327「功能 / 成篇自可寄」） */
export function Writing() {
  return (
    <section id="writing" aria-labelledby="writing-title" className="wrap">
      <div className="flex flex-col gap-8 rounded-[15px] bg-band px-3 py-8 sm:px-8 sm:py-12 xl:flex-row xl:items-center xl:justify-between xl:gap-8 xl:px-[48px] xl:py-[65px]">
        <div className="flex flex-col gap-[17px] xl:order-2 xl:w-[440px] xl:shrink-0">
          <h2 id="writing-title" className="font-serif text-[clamp(38px,3.4vw,49px)] leading-[1.327] font-medium tracking-[-0.012em] text-band-heading">
            成篇自可寄
          </h2>
          <p className="max-w-[424px] text-[16px] leading-[31px] text-band-text sm:text-[17px]">
            代码块有语法高亮，表格可以直接编辑。
            <br className="hidden sm:inline" />
            Mermaid 流程图和数学公式随文排版。
          </p>
          <p className="max-w-[424px] text-[16px] leading-[31px] text-band-text sm:text-[17px]">
            成稿可导出为 PDF 或单个 HTML 文件。
            <br className="hidden sm:inline" />
            原来的 .md 可以接着写。
          </p>
        </div>
        <WritingDemo />
      </div>
    </section>
  )
}
