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
