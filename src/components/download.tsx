import { useEffect, useState, type MouseEvent } from 'react'
import { site } from '../site.config'

/**
 * 手机、平板打不开 dmg（Figma「手机 390 · 首屏」）：在这些设备上，所有「获取 Mac 版」都改为复制官网链接，
 * 并在底部提示「发到 Mac 上打开」。按设备判断，不按窗口宽度——Mac 上把窗口拉窄仍然直接下载。
 */
export function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  if (/iPhone|iPod|Android|HarmonyOS|Mobile/i.test(ua)) return true
  // iPadOS 的 Safari 默认报成 Mac，用触点数区分
  return /Macintosh/.test(ua) && navigator.maxTouchPoints > 1
}

const TOAST_EVENT = 'rosette:toast'

function toast(message: string) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }))
}

async function copyHomepage() {
  try {
    await navigator.clipboard.writeText(site.homepage)
    toast('已复制链接，发到 Mac 上打开即可下载')
  } catch {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Rosette', url: site.homepage })
      } catch {
        // 用户取消了分享，不用提示
      }
    } else {
      toast('复制失败，请在 Mac 上打开 getrosette.vercel.app')
    }
  }
}

/** 下载按钮在当前设备上的行为：Mac 上直接下载最新的 dmg，手机上复制官网链接 */
export function useDownload() {
  const [mobile] = useState(isMobileDevice)
  if (!mobile) {
    return { mobile, label: '获取 Mac 版', href: site.downloadUrl, title: site.downloadTitle, onClick: undefined }
  }
  return {
    mobile,
    label: '复制下载链接',
    href: site.homepage,
    title: undefined,
    onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      void copyHomepage()
    },
  }
}

/** 页面底部的提示条，显示 2 秒（Figma「点击后：已复制提示」）；升起出现，退场比进场快 */
export function Toast() {
  const [toastState, setToastState] = useState<{ message: string; id: number; leaving: boolean } | null>(null)
  useEffect(() => {
    let hideTimer: number | undefined
    let removeTimer: number | undefined
    let id = 0
    const show = (event: Event) => {
      window.clearTimeout(hideTimer)
      window.clearTimeout(removeTimer)
      id += 1
      setToastState({ message: (event as CustomEvent<string>).detail, id, leaving: false })
      hideTimer = window.setTimeout(() => {
        setToastState((current) => (current ? { ...current, leaving: true } : current))
        removeTimer = window.setTimeout(() => setToastState(null), 150)
      }, 2000)
    }
    window.addEventListener(TOAST_EVENT, show)
    return () => {
      window.removeEventListener(TOAST_EVENT, show)
      window.clearTimeout(hideTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      {toastState && (
        <span
          key={toastState.id}
          className={`${toastState.leaving ? 'toast-out' : 'toast-in'} rounded-full bg-band px-[14px] py-[9px] text-[13px] leading-5 font-medium text-band-heading shadow-[0_8px_24px_rgba(24,58,42,0.25)]`}
        >
          {toastState.message}
        </span>
      )}
    </div>
  )
}
