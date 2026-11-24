import { useLayoutEffect, useRef, useState } from 'react'
import fileIcon from '../assets/icons/file-15.svg'
import { Segmented } from '../components/ui'
import { armOnFirstView, motion } from '../components/motion'

type Mode = 'normal' | 'focused'

const MODES: { value: Mode; label: string }[] = [
  { value: 'normal', label: '普通' },
  { value: 'focused', label: '专注' },
]

/**
 * 专注写作示例（Figma 组件「官网 / 专注写作演示」，Mode = Normal / Focused）：专注时淡化光标所在段落以外的内容。
 * 默认就是设计稿的「专注」；卡片还在视野之外时先换成「普通」，第一次滚进视野后再切到「专注」，让人亲眼看到其他段落变淡。
 * 访客自己点过就不再自动切换；系统开了「减弱动态效果」时不做这一步。
 */
function FocusDemo() {
  const [mode, setMode] = useState<Mode>('focused')
  const cardRef = useRef<HTMLDivElement>(null)
  const touched = useRef(false)
  const focused = mode === 'focused'
  const others = `transition-colors duration-700 ease-out ${focused ? 'text-faded' : ''}`

  useLayoutEffect(() => {
    const card = cardRef.current
    if (!card) return
    let timer: number | undefined
    const stop = armOnFirstView(card, 0.6, () => {
      timer = window.setTimeout(() => {
        if (!touched.current) setMode('focused')
      }, 700)
    })
    if (!stop) return
    setMode('normal')
    return () => {
      stop()
      window.clearTimeout(timer)
    }
  }, [])

  const choose = (next: Mode) => {
    touched.current = true
    setMode(next)
  }

  return (
    <div ref={cardRef} data-reveal style={motion(120)} className="flex w-full flex-col gap-3 rounded-[12px] border border-divider bg-card px-4 py-[18px] sm:px-[25px] xl:h-[266px] xl:w-[628px] xl:shrink-0">
      <div className="flex items-center justify-between gap-4">
        <span className="flex min-w-0 items-center gap-[7px]">
          <img src={fileIcon} alt="" width={15} height={15} className="shrink-0" />
          <span className="truncate text-[13px] leading-5 text-text">接口限流方案.md</span>
        </span>
        <Segmented label="写作模式" options={MODES} value={mode} onChange={choose} />
      </div>
      <div className="h-px bg-divider" />
      <div className="flex flex-col gap-[11px] pt-[3px] pl-[6px]">
        <p className={`text-[25px] leading-[38px] font-bold ${others} ${focused ? '' : 'text-heading'}`}>接口限流方案</p>
        <p className={`text-[15px] leading-[23px] ${others} ${focused ? '' : 'text-text'}`}>为搜索和导出接口设置独立的请求上限。</p>
        <p className="text-[16px] leading-6 font-medium text-heading">
          超出上限时，返回 429
          <span className="text-caret" aria-hidden="true" />
          ，并告知客户端等待时间。
        </p>
        <p className={`text-[15px] leading-[23px] ${others} ${focused ? '' : 'text-text'}`}>
          客户端按 Retry-After 的提示等待，再发起请求。
        </p>
      </div>
    </div>
  )
}

/** 专注写作（Figma 61:438「功能 / 专注写作」） */
export function Focus() {
  return (
    <section id="focus" aria-labelledby="focus-title" className="pt-16 pb-6 xl:pt-[81px]">
      <div className="wrap flex flex-col-reverse gap-10 xl:flex-row xl:items-center xl:justify-between xl:gap-12">
        <FocusDemo />
        <div data-reveal className="flex flex-col gap-[14px] xl:w-[440px] xl:shrink-0">
          <h2 id="focus-title" className="font-serif text-[clamp(38px,3.4vw,49px)] leading-[1.347] font-medium tracking-[-0.012em] text-heading">
            余墨淡如烟
          </h2>
          <p className="max-w-[429px] text-[16px] leading-[26px] text-text sm:text-[17px]">专注模式淡化其他段落，把注意力留给正在写的这一段。</p>
          <p className="max-w-[429px] text-[16px] leading-6 text-text">开启打字机滚动，输入行始终留在窗口中部。</p>
        </div>
      </div>
    </section>
  )
}
