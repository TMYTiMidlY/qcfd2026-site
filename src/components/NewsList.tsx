import { ArrowUpRight, Newspaper } from 'lucide-react'
import { news } from '@/data/news'

export function NewsList() {
  return (
    <section id="news" className="section-pad bg-section-alt">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">会议新闻</span>
          <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
            <a href="#news" className="hover:text-primary/80 transition">最新通知与往届回顾</a>
          </h2>
          <p className="mt-3 text-fg-soft">
            通过微信公众号同步发布大会通知，欢迎关注以获取最新动态。
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group card-surface flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:border-primary/40"
            >
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt=""
                  loading="lazy"
                  className="mask-fade-bottom-soft aspect-[16/10] w-full object-cover"
                />
              ) : null}
              <div className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between text-xs">
                  {item.tag ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
                      <Newspaper className="size-3" />
                      {item.tag}
                    </span>
                  ) : <span />}
                  <span className="text-fg-muted">{item.date}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-fg group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm text-fg-soft">
                  {item.excerpt}
                </p>
                <span className="mt-auto pt-5 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  阅读全文
                  <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
