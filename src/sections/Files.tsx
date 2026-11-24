import fileIcon from '../assets/icons/file.svg'
import file14Icon from '../assets/icons/file-14.svg'
import folderIcon from '../assets/icons/folder.svg'
import folder19Icon from '../assets/icons/folder-19.svg'
import checkIcon from '../assets/icons/check.svg'
import searchIcon from '../assets/icons/search.svg'

/** Figma 组件「纸面版 / 文件行」 */
function FileRow({ name, kind }: { name: string; kind: string }) {
  return (
    <div className="flex items-start justify-between gap-4 px-3 py-[10px]">
      <span className="flex min-w-0 items-center gap-[9px]">
        <img src={fileIcon} alt="" width={16} height={16} className="shrink-0" />
        <span className="truncate text-[15px] leading-[23px] font-medium text-heading">{name}</span>
      </span>
      <span className="shrink-0 text-[13px] leading-5 text-text">{kind}</span>
    </div>
  )
}

/** 本地文件夹示例（Figma 53:304） */
function FolderCard() {
  return (
    <div className="flex flex-col gap-[7px] rounded-[10px] border border-divider bg-card px-3 py-[18px] sm:px-[19px]">
      <div className="flex items-center justify-between gap-4 pt-[2px] pb-2">
        <span className="flex items-center gap-[9px]">
          <img src={folder19Icon} alt="" width={19} height={19} className="shrink-0" />
          <span className="text-[16px] leading-[25px] font-bold text-heading">项目文档</span>
        </span>
        <span className="truncate text-[13px] leading-5 text-text">~/Documents/项目文档</span>
      </div>
      <div className="h-px bg-divider" />
      <div className="flex flex-col gap-[2px]">
        <div className="rounded-[7px] bg-selection">
          <FileRow name="接口限流方案.md" kind="Markdown" />
        </div>
        <FileRow name="发布检查清单.md" kind="Markdown" />
        <div className="flex items-center justify-between gap-4 px-3 py-[10px]">
          <span className="flex items-center gap-[9px]">
            <img src={folderIcon} alt="" width={16} height={16} className="shrink-0" />
            <span className="text-[15px] leading-[23px] font-medium text-heading">assets</span>
          </span>
          <span className="text-[13px] leading-5 text-text">附件文件夹</span>
        </div>
      </div>
      <div className="h-px bg-divider" />
      <div className="flex items-center gap-[7px] pt-[3px] pl-3">
        <img src={checkIcon} alt="" width={15} height={15} className="shrink-0" />
        <span className="text-[13px] leading-5 text-text">已保存到本地</span>
      </div>
    </div>
  )
}

/** 文件夹全文搜索示例（Figma 61:464） */
function SearchCard() {
  return (
    <div className="flex flex-col gap-2 rounded-[10px] border border-divider bg-card px-3 py-[14px] sm:px-[18px]">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[14px] leading-[21px] font-medium text-heading">文件夹全文搜索</span>
        <span className="text-[12px] leading-[18px] text-muted">1 处匹配</span>
      </div>
      <div className="flex items-center gap-2 rounded-[6px] bg-wash px-[9px] py-[6px]">
        <img src={searchIcon} alt="" width={15} height={15} className="shrink-0" />
        <span className="text-[14px] leading-[21px] text-heading">自动保存</span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-[3px] text-[13px] leading-5">
        <span className="flex items-center gap-[6px]">
          <img src={file14Icon} alt="" width={14} height={14} className="shrink-0" />
          <span className="font-medium text-accent">发布检查清单.md</span>
        </span>
        <span className="text-text">
          检查<mark className="rounded-[2px] bg-highlight px-[2px] text-heading">自动保存</mark>与异常恢复流程。
        </span>
      </div>
    </div>
  )
}

/** 本地文件（Figma 53:295「文件与导航」） */
export function Files() {
  return (
    <section id="files" aria-labelledby="files-title" className="pt-16 pb-16 lg:pt-[63px] lg:pb-[86px]">
      <div className="wrap flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-[17px] lg:w-[463px] lg:shrink-0">
          <h2 id="files-title" className="font-serif text-[clamp(38px,3.4vw,49px)] leading-[1.327] font-medium tracking-[-0.012em] text-heading">
            文稿有归处
          </h2>
          <p className="max-w-[450px] text-[16px] leading-[31px] text-text sm:text-[17px]">
            正文以 .md 保存在你的文件夹，图片也可随文档存放。
            <br className="hidden sm:inline" />
            用访达整理文件，或用 Git 管理版本。
          </p>
          <div className="flex flex-col gap-2 pt-[5px]">
            <h3 className="text-[15px] leading-[23px] font-bold text-accent">在文件夹里全文搜索</h3>
            <p className="max-w-[453px] text-[16px] leading-[31px] text-text sm:text-[17px]">
              按文件名快速打开，全文搜索找段落，大纲跳到章节。
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 lg:max-w-[584px] lg:min-w-0 lg:py-[5px]">
          <FolderCard />
          <SearchCard />
        </div>
      </div>
    </section>
  )
}
