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
 * 打字演示：加粗那一行的 Markdown 原文按这个节奏敲出来。
 * 中文按输入法整词上屏，英文、数字和符号逐个敲；数字是距上一下的毫秒数。连起来就是
 * 「**超出上限**时，返回 429，并告知客户端等待时间。」
 */
const KEYS: [string, number][] = [
  ['*', 0],
  ['*', 110],
  ['超出', 380],
  ['上限', 300],
  ['*', 340],
  ['*', 110],
  ['时，', 440],
  ['返回', 300],
  [' ', 170],
  ['4', 110],
  ['2', 90],
  ['9', 100],
  ['，', 260],
  ['并告知', 330],
  ['客户端', 300],
  ['等待时间', 340],
  ['。', 260],
]

/** 已敲出的原文拆成：开头的 **、加粗的字、结尾的 *（或 **）、后面的正文 */
function parseRule(typed: number) {
  const src = KEYS.slice(0, typed)
    .map(([key]) => key)
    .join('')
  const body = src.slice(2)
  const close = body.indexOf('**')
  const closed = close >= 0
  return {
    open: src.slice(0, 2),
    bold: closed ? body.slice(0, close) : body.replace(/\*$/, ''),
    closed,
    tail: closed ? '**' : body.endsWith('*') ? '*' : '',
    rest: closed ? body.slice(close + 2) : '',
  }
}

/**
 * 加粗那一行。即时预览里 ** 闭合之前是普通字，闭合的一刻变粗。
 * 光标：设计稿的静态画面停在 ** 后面；打字演示时跟着输入走到行尾。
 * 打字演示时垫一层看不见的整行原文占住高度：手机上这一行会折成两行，不垫的话打到一半下面的内容会被往下推。
 */
function RuleLine({ typed, caretAtEnd }: { typed: number; caretAtEnd: boolean }) {
  const { open, bold, closed, tail, rest } = parseRule(typed)
  const caret = (
    <span className="mock-caret-at-rule">
      <Caret />
    </span>
  )
  return (
    <p className="mock-cursor-line">
      {caretAtEnd ? (
        <span className="mock-ghost" aria-hidden="true">
          <Mark>**</Mark>
          <strong className="mock-bold is-closed">超出上限</strong>
          <Mark>**</Mark>
          时，返回 429，并告知客户端等待时间。
          <Caret />
        </span>
      ) : null}
      <span>
        {open ? <Mark>{open}</Mark> : null}
        <strong className={closed ? 'mock-bold is-closed' : 'mock-bold'}>{bold}</strong>
        {tail ? <Mark>{tail}</Mark> : null}
        {caretAtEnd ? null : caret}
        {rest}
        {caretAtEnd ? caret : null}
      </span>
    </p>
  )
}

/**
 * 即时预览：排好版的正文，只有光标所在的那一行显示 Markdown 标记。
 * 光标离开加粗那一行时 ** 收起，进到标题行时左侧挂出 ##（与应用的即时预览一致）。
 */
function LiveView({ cursor, typed, demo }: { cursor: CursorLine; typed: number; demo: boolean }) {
  return (
    <div className={typed < KEYS.length ? 'mock-live is-typing' : 'mock-live'} data-cursor={cursor}>
      <div className="mock-head">
        <p className="mock-h1">接口限流方案</p>
        <p className="mock-meta">项目文档 · 今天 10:24 更新</p>
      </div>
      <p className="mock-p">为搜索和导出接口设置独立的请求上限。</p>
      <div className="mock-block">
        <p className="mock-h2">限流规则</p>
        <RuleLine typed={typed} caretAtEnd={demo} />
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

/** 源码：同一篇文档的 Markdown 原文（第 7 行跟着打字演示走） */
function sourceLines(typed: number, caretAtEnd: boolean): ReactNode[] {
  const { open, bold, closed, tail, rest } = parseRule(typed)
  const rule = (
    <>
      {open ? <Mark>{open}</Mark> : null}
      {closed ? <b>{bold}</b> : bold}
      {tail ? <Mark>{tail}</Mark> : null}
      {caretAtEnd ? null : <Caret />}
      {rest}
      {caretAtEnd ? <Caret /> : null}
    </>
  )
  return SOURCE_LINES.map((line, i) => (i === 6 ? rule : line))
}

const SOURCE_LINES: ReactNode[] = [
  <><Mark>#</Mark> <b>接口限流方案</b></>,
  '',
  '为搜索和导出接口设置独立的请求上限。',
  '',
  <><Mark>##</Mark> <b>限流规则</b></>,
  '',
  null, // 加粗那一行，见 sourceLines
  '',
  <><Mark>##</Mark> <b>超限响应</b></>,
  '',
  <Mark>```http</Mark>,
  'HTTP/1.1 429 Too Many Requests',
  'Retry-After: 60',
  <Mark>```</Mark>,
]

function SourceView({ typed, demo }: { typed: number; demo: boolean }) {
  return (
    <ol className="mock-source">
      {sourceLines(typed, demo).map((line, i) => (
        <li key={i}>
          <span className="mock-ln">{i + 1}</span>
          <span className="mock-src">{line}</span>
        </li>
      ))}
    </ol>
  )
}

/** 首屏开场（标题落墨、窗口升起）大约 1.7 秒放完，打字从这之后开始 */
const TYPE_START = 1700

/**
 * 首屏的核心动画：先把加粗那一行敲出来，再让光标在这一行和「超限响应」标题之间往返，演示「光标所及即见原文」。
 * 只在窗口进入视野、页面在前台、处于即时预览时播放（打到一半切走，回来接着打）；
 * 系统开了「减弱动态效果」就直接停在设计稿的静态画面，不打字也不往返。
 */
function useEditorDemo(root: RefObject<HTMLDivElement | null>, active: boolean) {
  const [demo] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [typed, setTyped] = useState(demo ? 0 : KEYS.length)
  const [cursor, setCursor] = useState<CursorLine>('rule')
  const state = useRef({ typed: demo ? 0 : KEYS.length, cursor: 'rule' as CursorLine })
  useEffect(() => {
    const el = root.current
    if (!active || !el || !demo) return
    const s = state.current
    let visible = false
    let timer: number | undefined
    const schedule = () => {
      window.clearTimeout(timer)
      if (!visible || document.hidden) return
      if (s.typed < KEYS.length) {
        const delay = s.typed === 0 ? Math.max(700, TYPE_START - performance.now()) : KEYS[s.typed][1]
        timer = window.setTimeout(() => {
          s.typed += 1
          setTyped(s.typed)
          schedule()
        }, delay)
        return
      }
      // 停在加粗那一行久一些，让人看清 ** 标记
      timer = window.setTimeout(() => {
        s.cursor = s.cursor === 'rule' ? 'heading' : 'rule'
        setCursor(s.cursor)
        schedule()
      }, s.cursor === 'rule' ? 2800 : 2000)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.4
        schedule()
      },
      { threshold: [0, 0.4, 1] },
    )
    io.observe(el)
    document.addEventListener('visibilitychange', schedule)
    return () => {
      io.disconnect()
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', schedule)
    }
  }, [root, active, demo])
  return { demo, typed, cursor }
}

/** 首屏的编辑器示意：可以在即时预览和源码之间切换，也可以看深色外观 */
export function EditorMock() {
  const [view, setView] = useState<View>('live')
  const [dark, setDark] = useState(false)
  // 只有访客切换过视图，新内容才淡入；首次打开直接显示
  const [switched, setSwitched] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const { demo, typed, cursor } = useEditorDemo(rootRef, view === 'live')

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
            {view === 'live' ? <LiveView cursor={cursor} typed={typed} demo={demo} /> : <SourceView typed={typed} demo={demo} />}
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
