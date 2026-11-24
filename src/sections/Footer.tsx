import { Brand, OutlineButton } from '../components/ui'
import { site } from '../site.config'

type FooterLink = { label: string; href: string; title?: string }

/** 页脚的一列链接；width 是设计稿里这一列在桌面上的宽度 */
function FooterLinks({ title, links, width }: { title: string; links: FooterLink[]; width: string }) {
  return (
    <nav aria-label={title} className={`flex flex-col gap-[14px] ${width}`}>
      <h2 className="text-[15px] leading-[23px] font-bold text-heading">{title}</h2>
      <ul className="flex flex-col gap-[10px]">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} title={link.title} className="block w-fit text-[14px] leading-5 font-medium text-secondary transition-colors hover:text-accent">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** 页脚（Figma 48:388） */
export function Footer() {
  return (
    <footer className="wrap mt-[58px] border-t border-line">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 pt-8 pb-11 lg:flex lg:items-start lg:justify-between">
        <div className="col-span-2 flex flex-col gap-[10px] lg:w-[406px]">
          <Brand />
          <p className="text-[14px] leading-[21px] text-text">Mac 上的本地 Markdown 编辑器。</p>
        </div>
        <FooterLinks
          title="产品"
          width="lg:w-[160px]"
          links={[
            { label: '界面预览', href: '#preview' },
            { label: '本地文件', href: '#files' },
            { label: '技术写作', href: '#writing' },
          ]}
        />
        <FooterLinks
          title="下载与帮助"
          width="lg:w-[175px]"
          links={[
            { label: '获取 Mac 版', href: site.downloadUrl, title: site.downloadTitle },
            { label: '版本发布', href: site.releasesPage },
            { label: '常见问题', href: '#faq' },
          ]}
        />
        <div className="col-span-2 lg:col-span-1">
          <OutlineButton href="#top">返回顶部</OutlineButton>
        </div>
      </div>
    </footer>
  )
}
