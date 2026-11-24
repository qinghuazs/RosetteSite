import { useLayoutEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from 'react'
import appIcon from '../assets/app-icon.png'

/** 应用图标 + “Rosette”字样（Figma 组件「Rosette / 品牌」） */
export function Brand({ href }: { href?: string }) {
  const content = (
    <>
      <img src={appIcon} alt="" width={36} height={36} className="size-9 shrink-0" />
      <span className="text-[23px] leading-[30px] font-bold tracking-[-0.02em] text-ink">Rosette</span>
    </>
  )
  if (!href) return <div className="flex items-center gap-2">{content}</div>
  return (
    <a href={href} className="flex items-center gap-2 rounded-md" aria-label="Rosette 首页">
      {content}
    </a>
  )
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }

const buttonBase =
  'inline-flex items-center justify-center whitespace-nowrap rounded-[10px] px-[19px] text-[15px] leading-[23px] font-bold transition-colors'

/** 松绿实心按钮（Figma「按钮 / 松绿」） */
export function PrimaryButton({ className = '', ...props }: LinkProps) {
  return <a className={`${buttonBase} bg-accent py-[13px] text-white hover:bg-accent-hover ${className}`} {...props} />
}

/** 深色底上的按钮（Figma「按钮 / 浅色」） */
export function LightButton({ className = '', ...props }: LinkProps) {
  return <a className={`${buttonBase} bg-button-light py-[13px] text-forest hover:bg-band-heading ${className}`} {...props} />
}

/** 描边按钮（Figma「按钮 / 描边」） */
export function OutlineButton({ className = '', ...props }: LinkProps) {
  return (
    <a
      className={`${buttonBase} border border-border-strong py-[9px] text-accent hover:border-accent/45 hover:bg-accent/5 ${className}`}
      {...props}
    />
  )
}

/**
 * 示例卡片右上角的切换按钮（Figma「写作视图」「查看不同排版示例」）。
 * 两处的差别只在选中项的字重（专注写作 Medium，技术写作 Bold）。每一项高 30、左右 12（技术写作在手机上收成 9，免得挤掉文件名）。
 * 选中项下面垫一块白底加细阴影，切换时滑到新选项上，一眼看得出是开关。
 */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  selectedWeight = 'font-medium',
  itemPadding = 'px-3',
}: {
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  selectedWeight?: 'font-medium' | 'font-bold'
  itemPadding?: 'px-3' | 'px-[9px] sm:px-3'
}) {
  const groupRef = useRef<HTMLDivElement>(null)
  const [pill, setPill] = useState<{ left: number; width: number; instant: boolean } | null>(null)
  const measuredValue = useRef<T | null>(null)

  // 在绘制前量好选中项的位置；只有换了选项才滑过去，字体加载完、窗口变化导致的重新测量直接到位
  useLayoutEffect(() => {
    const group = groupRef.current
    if (!group) return
    const measure = (instant: boolean) => {
      const selected = group.querySelector<HTMLElement>('button[aria-pressed="true"]')
      if (!selected) return
      const left = selected.offsetLeft
      const width = selected.offsetWidth
      // 位置没变就不更新：尺寸监听建立时会立刻回调一次，不能打断正在进行的滑动
      setPill((prev) => (prev && prev.left === left && prev.width === width ? prev : { left, width, instant }))
    }
    measure(measuredValue.current === null || measuredValue.current === value)
    measuredValue.current = value
    const observer = new ResizeObserver(() => measure(true))
    group.querySelectorAll('button').forEach((button) => observer.observe(button))
    return () => observer.disconnect()
  }, [value])

  const pillLook = 'bg-paper shadow-[0_1px_3px_rgba(24,58,42,0.16)]'
  return (
    <div ref={groupRef} role="group" aria-label={label} className="relative flex shrink-0 items-center gap-[2px] rounded-[7px] bg-wash-strong p-[3px]">
      {pill && (
        <span aria-hidden="true" className={`segment-pill absolute top-[3px] bottom-[3px] rounded-[5px] ${pillLook}`} style={{ left: pill.left, width: pill.width, transition: pill.instant ? 'none' : undefined }} />
      )}
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={`relative rounded-[5px] ${itemPadding} py-[5px] text-[13px] leading-5 whitespace-nowrap transition-colors ${
              selected ? `${selectedWeight} text-heading ${pill ? '' : pillLook}` : 'cursor-pointer text-text hover:bg-paper/40 hover:text-heading'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
