import { Building2, ExternalLink, ImageOff } from 'lucide-react'
import { exhibitors, exhibitorLogo } from '@/data/exhibitors'

export function Exhibitors() {
  return (
    <section id="exhibitors" className="section-pad">
      <div className="container-page">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow-en">Exhibitors</span>
            <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
              <a href="#exhibitors" className="hover:text-primary/80 transition">参展单位</a>
            </h2>
            <p className="mt-3 max-w-xl text-fg-soft">
              以下为本届会议参展企业，展示量子计算产业近期进展与产品方案。
            </p>
          </div>
          <span className="text-xs text-fg-muted">{exhibitors.length} 家参展单位</span>
        </div>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2">
          {exhibitors.map((e) => {
            const logo = exhibitorLogo(e.id)
            return (
              <article
                key={e.id}
                className="group relative card-surface flex h-full flex-col overflow-hidden p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(8,145,178,0.4)]"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
                  aria-hidden
                />

                <div className="flex aspect-[16/5] w-full items-center justify-center overflow-hidden rounded-xl border border-black/5 bg-bg-alt/60 p-4">
                  {logo ? (
                    <img
                      src={logo}
                      alt={`${e.shortName ?? e.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-fg-muted">
                      <ImageOff className="size-6" aria-hidden />
                      <span className="text-xs">Logo 待补充</span>
                    </div>
                  )}
                </div>

                <h3 className="mt-5 text-lg font-semibold text-fg">
                  {e.name}
                </h3>
                {e.shortName ? (
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                    <Building2 className="size-3.5" />
                    {e.shortName}
                  </p>
                ) : null}

                <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-soft/90">
                  {e.description}
                </p>

                {e.url ? (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    访问官网
                    <ExternalLink className="size-3" />
                  </a>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
