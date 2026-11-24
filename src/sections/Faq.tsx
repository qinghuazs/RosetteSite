const QUESTIONS = [
  {
    q: '原来的 Markdown 要迁移吗？',
    a: '直接打开单篇文档或整个文件夹，文件照常保存在原来的位置。',
  },
  {
    q: '意外退出后，还能接着写吗？',
    a: '启用自动保存后，修改写回原文件。若有可恢复的草稿，重新打开文档时会提示。',
  },
  {
    q: '可以离线写作吗？',
    a: '写作、搜索和导出都可离线进行。检查应用更新时需要联网。',
  },
  {
    q: '怎么安装？',
    a: '点「获取 Mac 版」下载 .dmg，打开后把 Rosette 拖进「应用程序」。',
  },
]

/** 常见问题（Figma 优化版 73:540「使用与安装」） */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-16 lg:pt-[89px] lg:pb-[88px]">
      <div className="wrap flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <h2 id="faq-title" className="font-serif text-[clamp(34px,2.99vw,43px)] leading-[1.326] font-medium tracking-[-0.025em] text-heading">
          常见问题
        </h2>
        <dl className="border-t border-divider lg:w-[677px]">
          {QUESTIONS.map(({ q, a }) => (
            <div key={q} className="flex flex-col gap-[6px] border-b border-divider pt-[17px] pb-[18px] leading-[25px]">
              <dt className="text-[17px] font-bold text-ink">{q}</dt>
              <dd className="m-0 max-w-[660px] text-[15px] text-secondary">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
