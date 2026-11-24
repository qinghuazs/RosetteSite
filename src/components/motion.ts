import { useEffect, type CSSProperties } from 'react'

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** 动效的延迟（和升起的距离），写成 CSS 变量交给 styles.css 里的动画用 */
export function motion(delayMs: number, rise?: number): CSSProperties {
  return { '--d': `${delayMs}ms`, ...(rise === undefined ? {} : { '--rise': `${rise}px` }) } as CSSProperties
}

/**
 * 示例卡片「第一次看到时演示一遍」。
 * 打开页面时卡片就在视野里（例如从锚点进来），或系统开了「减弱动态效果」，返回 null，卡片保持设计稿的静态画面；
 * 否则在卡片露出 threshold 时调用 onView 一次，返回取消监听的函数。
 */
export function armOnFirstView(el: HTMLElement, threshold: number, onView: () => void): (() => void) | null {
  if (prefersReducedMotion()) return null
  const box = el.getBoundingClientRect()
  if (box.top < window.innerHeight && box.bottom > 0) return null
  const io = new IntersectionObserver(
    ([entry]) => {
      // 不能只看 isIntersecting：卡片刚露出一角（还没到 threshold）时也会回调一次
      if (entry.intersectionRatio < threshold) return
      io.disconnect()
      onView()
    },
    { threshold },
  )
  io.observe(el)
  return () => io.disconnect()
}

/**
 * 示例卡片第一次进入视野时升起：带 data-reveal 的元素进入视野后加上 data-revealed，动画写在 styles.css。
 * 「减弱动态效果」下 CSS 不隐藏也不动画，这里照常打标记，免得中途改了系统设置后内容藏着出不来。
 */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-revealed', '')
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
