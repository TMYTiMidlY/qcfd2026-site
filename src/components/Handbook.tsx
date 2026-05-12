import { FileText, Download, Lock, ExternalLink } from 'lucide-react'

type ItemKind = 'pdf' | 'wechat' | 'mixed'

const items: {
  title: string
  desc: string
  available: boolean
  kind: ItemKind
  url?: string
}[] = [
  {
    title: '会议手册',
    desc: '议程、嘉宾介绍、报告摘要、场地导览的完整 PDF 版本',
    available: false,
    kind: 'pdf',
  },
  {
    title: '会议通知',
    desc: '中国力学学会用印的正式通知，可用于参会代表所在单位的差旅、注册费报销凭证',
    available: false,
    kind: 'pdf',
  },
  {
    title: '第二轮通知',
    desc: '会议组织机构、特邀嘉宾、报告专家（持续更新中）、注册细则与联系方式（由组委会通过微信公众号文章发布）',
    available: true,
    kind: 'wechat',
    url: 'https://mp.weixin.qq.com/s/8Tnf3EMgEu-ugjtzciO9Ow',
  },
]

const buttonLabel: Record<ItemKind, { label: string; Icon: typeof Download }> = {
  pdf: { label: '下载 PDF', Icon: Download },
  wechat: { label: '前往公众号', Icon: ExternalLink },
  mixed: { label: '即将发布', Icon: Download },
}

export function Handbook() {
  return (
    <section id="handbook" className="section-pad bg-section-alt">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">资料下载</span>
          <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
            <a href="#handbook" className="hover:text-primary/80 transition">会议手册与资料</a>
          </h2>
          <p className="mt-3 text-fg-soft">
            正式资料将在会议召开前一周通过本页面与微信公众号同步发布，敬请期待。
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((item) => {
            const { label, Icon: BtnIcon } = buttonLabel[item.kind]
            return (
              <div
                key={item.title}
                className="card-surface flex h-full flex-col gap-4 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="size-6" />
                  </div>
                  {item.available ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                      已发布
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2.5 py-1 text-[11px] font-medium text-warning">
                      <Lock className="size-3" />
                      即将发布
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
                  <p className="mt-2 text-sm text-fg-soft">{item.desc}</p>
                </div>
                {item.available && item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-primary bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90"
                  >
                    <BtnIcon className="size-4" />
                    {label}
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-bg-alt px-4 py-2.5 text-sm text-fg-muted disabled:cursor-not-allowed"
                  >
                    <BtnIcon className="size-4" />
                    {label}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
