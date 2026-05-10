import { FileText, Download, Lock } from 'lucide-react'

const items = [
  {
    title: '会议手册',
    desc: '议程、嘉宾介绍、报告摘要、场地导览的完整 PDF 版本',
    available: false,
  },
  {
    title: '第二轮通知',
    desc: '组织机构、特邀嘉宾、注册细则与联系方式',
    available: false,
  },
  {
    title: '参会指南',
    desc: '签到、用餐、交通班车与现场支持信息',
    available: false,
  },
]

export function Handbook() {
  return (
    <section id="handbook" className="section-pad bg-section-alt">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">资料下载</span>
          <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
            会议手册与资料
          </h2>
          <p className="mt-3 text-fg-soft">
            正式资料将在会议召开前一周通过本页面与邮件同步发布，敬请期待。
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="card-surface flex h-full flex-col gap-4 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="size-6" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2.5 py-1 text-[11px] font-medium text-warning">
                  <Lock className="size-3" />
                  即将发布
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
                <p className="mt-2 text-sm text-fg-soft">{item.desc}</p>
              </div>
              <button
                type="button"
                disabled={!item.available}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-fg-muted disabled:cursor-not-allowed"
              >
                <Download className="size-4" />
                下载 PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
