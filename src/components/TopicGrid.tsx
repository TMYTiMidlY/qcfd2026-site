import { Atom, Brain, Cpu, Waves, Sigma, Network } from 'lucide-react'
import { topics, type Topic } from '@/data/topics'

const iconMap: Record<Topic['icon'], typeof Atom> = {
  atom: Atom,
  brain: Brain,
  cpu: Cpu,
  waves: Waves,
  sigma: Sigma,
  network: Network,
}

export function TopicGrid() {
  return (
    <section id="topics" className="section-pad">
      <div className="container-page">
        <figure className="relative -mx-4 mb-10 overflow-hidden rounded-3xl sm:-mx-6 md:mx-0">
          <img
            src="/generated/topics-banner.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[3/1] w-full object-cover md:aspect-[16/5]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-transparent"
            aria-hidden
          />
          <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-10 md:pb-8">
            <span className="eyebrow">议题方向</span>
            <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
              围绕六大方向 · 推动学科交叉
            </h2>
            <p className="mt-3 max-w-2xl text-fg-soft">
              会议聚焦量子算法、量子-经典混合方法、硬件实现以及智能赋能等核心议题，汇聚流体力学与量子计算交叉研究的最新成果。
            </p>
          </figcaption>
        </figure>

        <div className="mt-2 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((t, idx) => {
            const Icon = iconMap[t.icon]
            return (
              <div
                key={t.title}
                className="group relative card-surface transition hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary/20">
                      <Icon className="size-6" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] font-mono text-fg-muted">
                        0{idx + 1}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold leading-snug text-fg">
                        {t.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-fg-soft">
                    {t.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
