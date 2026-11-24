import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import windowControls from '../assets/icons/mock-window-controls.svg'
import sidebarIcon from '../assets/icons/mock-sidebar.svg'
import searchIcon from '../assets/icons/mock-search.svg'
import folderIcon from '../assets/icons/mock-folder.svg'
import fileIcon from '../assets/icons/mock-file.svg'
import checkIcon from '../assets/icons/mock-check.svg'
import './EditorMock.css'

type View = 'live' | 'source'
/** 光标在哪一行：加粗的那一行，或下面「超限响应」标题 */
type CursorLine = 'rule' | 'heading'

const FILES = [
  { name: '项目文档', icon: folderIcon },
  { name: '接口限流方案.md', icon: fileIcon, current: true },
  { name: '发布检查清单.md', icon: fileIcon },
  { name: '故障排查.md', icon: fileIcon },
  { name: '随手记', icon: folderIcon },
]

function Mark({ children }: { children: ReactNode }) {
  return <span className="mock-mark">{children}</span>
}

function Caret() {
  return <span className="mock-caret" aria-hidden="true" />
}

/**
 * 即时预览：排好版的正文，只有光标所在的那一行显示 Markdown 标记。
 * 光标离开加粗那一行时 ** 收起，进到标题行时左侧挂出 ##（与应用的即时预览一致）。
 */
function LiveView({ cursor }: { cursor: CursorLine }) {
  return (
    <div className="mock-live" data-cursor={cursor}>
      <div className="mock-head">
        <p className="mock-h1">接口限流方案</p>
        <p className="mock-meta">项目文档 · 今天 10:24 更新</p>
      </div>
      <p className="mock-p">为搜索和导出接口设置独立的请求上限。</p>
      <div className="mock-block">
        <p className="mock-h2">限流规则</p>
        <p className="mock-cursor-line">
          <Mark>**</Mark>
          <strong>超出上限</strong>
          <Mark>**</Mark>
          <span className="mock-caret-at-rule">
            <Caret />
          </span>
          时，返回 429，并告知客户端等待时间。
        </p>
      </div>
      <div className="mock-block">
        <p className="mock-h2 mock-heading-line">
          <span className="mock-hang" aria-hidden="true">
            ##
          </span>
          超限响应
          <span className="mock-caret-at-heading">
            <Caret />
          </span>
        </p>
        <div className="mock-code">
          <p className="mock-code-lang">HTTP</p>
          <p className="mock-code-line">
            <span className="mock-ln">1</span>
            <span>HTTP/1.1 429 Too Many Requests</span>
          </p>
          <p className="mock-code-line">
            <span className="mock-ln">2</span>
            <span>Retry-After: 60</span>
          </p>
        </div>
      </div>
    </div>
  )
}

/** 源码：同一篇文档的 Markdown 原文 */
const SOURCE_LINES: ReactNode[] = [
  <><Mark>#</Mark> <b>接口限流方案</b></>,
  '',
  '为搜索和导出接口设置独立的请求上限。',
  '',
  <><Mark>##</Mark> <b>限流规则</b></>,
  '',
  <><Mark>**</Mark><b>超出上限</b><Mark>**</Mark><Caret />时，返回 429，并告知客户端等待时间。</>,
  '',
  <><Mark>##</Mark> <b>超限响应</b></>,
  '',
  <Mark>```http</Mark>,
  'HTTP/1.1 429 Too Many Requests',
  'Retry-After: 60',
  <Mark>```</Mark>,
]

function SourceView() {
  return (
    <ol className="mock-source">
      {SOURCE_LINES.map((line, i) => (
        <li key={i}>
          <span className="mock-ln">{i + 1}</span>
          <span className="mock-src">{line}</span>
        </li>
      ))}
    </ol>
  )
}

/** 打开页面时光标跳行的时刻（毫秒）：标题落墨约 1.1 秒放完，紧接着动 */
const MOVE_AT = 1300

/**
 * 首屏的核心动画，只做一次：光标从加粗那一行跳到下面「超限响应」标题，** 收起、标题左侧挂出 ##，演示「光标所及即见原文」，然后停住。
 * 两行都完整露出、页面在前台、处于即时预览时才播；打开页面时就看得到的话在 MOVE_AT 播，滚到这里才看到的话露出后 0.6 秒播。
 * 系统开了「减弱动态效果」就停在设计稿的静态画面。
 */
function useCursorDemo(root: RefObject<HTMLDivElement | null>, active: boolean) {
  const [cursor, setCursor] = useState<CursorLine>('rule')
  const played = useRef(false)
  useEffect(() => {
    const el = root.current
    if (!active || !el || played.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lines = [...el.querySelectorAll('.mock-cursor-line, .mock-heading-line')]
    const shown = new Map<Element, boolean>()
    let timer: number | undefined
    const stop = () => {
      window.clearTimeout(timer)
      io.disconnect()
      document.removeEventListener('visibilitychange', schedule)
    }
    function schedule() {
      window.clearTimeout(timer)
      const ready = lines.every((line) => shown.get(line)) && !document.hidden
      if (!ready) return
      timer = window.setTimeout(() => {
        played.current = true
        setCursor('heading')
        stop()
      }, Math.max(600, MOVE_AT - performance.now()))
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) shown.set(entry.target, entry.intersectionRatio >= 0.99)
        schedule()
      },
      { threshold: [0, 0.99] },
    )
    lines.forEach((line) => io.observe(line))
    document.addEventListener('visibilitychange', schedule)
    return stop
  }, [root, active])
  return cursor
}

/** 首屏的编辑器示意：可以在即时预览和源码之间切换，也可以看深色外观 */
export function EditorMock() {
  const [view, setView] = useState<View>('live')
  const [dark, setDark] = useState(false)
  // 只有访客切换过视图，新内容才淡入；首次打开直接显示
  const [switched, setSwitched] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const cursor = useCursorDemo(rootRef, view === 'live')

  return (
    <div ref={rootRef} className="mock" data-theme={dark ? 'dark' : 'light'} role="group" aria-label="Rosette 编辑器界面示意">
      <div className="mock-toolbar">
        <div className="mock-title">
          <img className="mock-controls" src={windowControls} alt="" />
          <img className="mock-icon" src={sidebarIcon} alt="" />
          <span className="mock-filename">接口限流方案.md</span>
        </div>
        <div className="mock-views">
          <button type="button" aria-pressed={view === 'live'} onClick={() => { setSwitched(true); setView('live') }}>
            即时预览
          </button>
          <button type="button" aria-pressed={view === 'source'} onClick={() => { setSwitched(true); setView('source') }}>
            源码
          </button>
          <button type="button" aria-pressed={dark} onClick={() => setDark((d) => !d)}>
            深色外观
          </button>
        </div>
      </div>

      <div className="mock-body">
        <div className="mock-sidebar">
          <div className="mock-tabs">
            <span className="is-on">文件</span>
            <span>大纲</span>
          </div>
          <div className="mock-search">
            <img className="mock-icon" src={searchIcon} alt="" />
            <span>搜索文档</span>
          </div>
          <ul className="mock-list">
            {FILES.map((file) => (
              <li key={file.name} className={file.current ? 'mock-row is-on' : 'mock-row'}>
                <img className="mock-icon" src={file.icon} alt="" />
                <span>{file.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mock-doc">
          <div key={view} className={switched ? 'swap-in' : undefined}>
            {view === 'live' ? <LiveView cursor={cursor} /> : <SourceView />}
          </div>
        </div>
      </div>

      <div className="mock-status">
        <span className="mock-status-path">~/Documents/项目文档</span>
        <span className="mock-saved">
          <img className="mock-icon" src={checkIcon} alt="" />
          已保存到本地
        </span>
      </div>
    </div>
  )
}
