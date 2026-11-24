import type { AnchorHTMLAttributes, ReactNode } from 'react'
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

/** 描边按钮（Figma「按钮 / 描边」） */
export function OutlineButton({ className = '', ...props }: LinkProps) {
  return (
    <a
      className={`${buttonBase} border border-line-button py-[9px] text-accent hover:border-accent/45 hover:bg-accent/5 ${className}`}
      {...props}
    />
  )
}

/**
 * 示例卡片右上角的切换按钮（Figma「写作视图」「查看不同排版示例」）。
 * 两处的差别只在选中项的字重（专注写作 Medium，技术写作 Bold）和左右内边距（10 / 9，手机上 9 收成 7）。
 */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  selectedWeight = 'font-medium',
  itemPadding = 'px-[10px]',
}: {
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  selectedWeight?: 'font-medium' | 'font-bold'
  itemPadding?: 'px-[10px]' | 'px-[7px] sm:px-[9px]'
}) {
  return (
    <div role="group" aria-label={label} className="flex shrink-0 items-center gap-[2px] rounded-[7px] bg-segment p-[3px]">
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={`rounded-[5px] ${itemPadding} py-1 text-[13px] leading-5 whitespace-nowrap transition-colors ${
              selected ? `bg-segment-on ${selectedWeight} text-heading` : 'cursor-pointer text-text hover:text-heading'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
