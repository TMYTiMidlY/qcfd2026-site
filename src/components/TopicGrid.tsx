import { useState } from 'react'
import {
  Atom,
  Brain,
  Cpu,
  Waves,
  Sigma,
  Network,
  ChevronDown,
  Layers,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { topics, crossCuttingSpeakers, type Topic } from '@/data/topics'
import { speakers } from '@/data/speakers'

const iconMap: Record<Topic['icon'], typeof Atom> = {
  atom: Atom,
  brain: Brain,
  cpu: Cpu,
  waves: Waves,
  sigma: Sigma,
  network: Network,
}

function speakerName(id: string) {
  return speakers.find((s) => s.id === id)?.name ?? id
}

export function TopicGrid() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="topics" className="section-pad">
      <div className="container-page">
        <figure className="relative -mx-4 mb-10 overflow-hidden rounded-3xl sm:-mx-6 md:mx-0">
          <img
            src="/generated/topics-banner.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[2/1] w-full object-cover sm:aspect-[3/1] md:aspect-[16/5]"
          />
          {/* Desktop: centered text overlay with scrim */}
          <div
            className="pointer-events-none absolute inset-0 hidden bg-black/30 md:block"
            aria-hidden
          />
          <figcaption className="absolute inset-0 hidden flex-col items-center justify-center text-center md:flex">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wider text-white/90 backdrop-blur-sm">
              议题方向
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white drop-shadow-lg lg:text-4xl">
              <a href="#topics" className="hover:text-primary transition">
                主要议题方向
              </a>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
              围绕量子算法、量子-经典混合方法、硬件实现与智能赋能等方向，汇聚本届
              14 位报告人的交叉研究成果
            </p>
          </figcaption>
        </figure>
        {/* Mobile: text below image */}
        <div className="mb-8 md:hidden">
          <span className="eyebrow">议题方向</span>
          <h2 className="mt-3 text-3xl font-bold text-fg">
            <a href="#topics" className="hover:text-primary/80 transition">
              主要议题方向
            </a>
          </h2>
          <p className="mt-3 text-fg-soft">
            围绕量子算法、混合方法、硬件实现与智能赋能等方向，汇聚交叉研究最新成果。
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {topics.map((t, idx) => {
            const Icon = iconMap[t.icon]
            const isOpen = open === idx
            return (
              <div
                key={t.title}
                className={cn(
                  'card-surface overflow-hidden transition-shadow',
                  isOpen && 'ring-1 ring-primary/30 shadow-lg shadow-primary/10',
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <div
                    className={cn(
                      'grid size-10 shrink-0 place-items-center rounded-xl transition sm:size-12',
                      isOpen
                        ? 'bg-primary text-white'
                        : 'bg-primary/10 text-primary',
                    )}
                  >
                    <Icon className="size-5 sm:size-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold leading-snug text-fg sm:text-lg">
                      {t.title}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      {t.speakers.map((sid) => (
                        <span
                          key={sid}
                          className="rounded-full bg-bg-alt px-2 py-0.5 text-[11px] text-fg-muted ring-1 ring-black/[0.06]"
                        >
                          {speakerName(sid)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      'size-5 shrink-0 text-fg-muted transition-transform',
                      isOpen && 'rotate-180 text-primary',
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-black/5 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                      <p className="text-sm leading-relaxed text-fg-soft">
                        {t.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {t.speakers.map((sid) => (
                          <a
                            key={sid}
                            href="#speakers"
                            className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-xs font-medium text-primary transition hover:bg-primary hover:text-white"
                          >
                            {speakerName(sid)}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Cross-cutting note */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/[0.04] p-4">
          <Layers className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm text-fg-soft">
            以上为本届会议的主要研讨方向，各方向之间互有交叉；
            {crossCuttingSpeakers.length > 0 ? (
              <>
                此外
                {crossCuttingSpeakers.map((sid) => speakerName(sid)).join('、')}
                等报告横跨多个方向，覆盖量子科学计算平台与工程应用全链路。
              </>
            ) : null}
            完整报告列表详见
            <a href="#speakers" className="ml-0.5 font-medium text-primary hover:underline">
              特邀报告讲者
            </a>
            与
            <a href="#schedule" className="ml-0.5 font-medium text-primary hover:underline">
              会议日程
            </a>
            。
          </p>
        </div>
      </div>
    </section>
  )
}
