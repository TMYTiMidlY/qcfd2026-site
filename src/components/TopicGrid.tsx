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
import { topics, type Topic } from '@/data/topics'
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
        <figure className="relative mb-10 overflow-hidden rounded-3xl">
          <img
            src="/generated/topics-banner.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[2/1] w-full object-cover sm:aspect-[3/1] md:aspect-[16/5]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-black/30"
            aria-hidden
          />
          <figcaption className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wider text-white/90 backdrop-blur-sm sm:px-3 sm:py-1 sm:text-xs">
              议题方向
            </span>
            <h2 className="mt-3 text-2xl font-bold text-white drop-shadow-lg sm:mt-4 sm:text-3xl lg:text-4xl">
              <a href="#topics" className="hover:text-primary transition">
                主要议题方向
              </a>
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-white/80 sm:mt-3 sm:text-sm">
              围绕量子算法、量子-经典混合方法、硬件实现与智能赋能等方向，汇聚本届
              14 位报告人的交叉研究成果
            </p>
          </figcaption>
        </figure>

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
                    {!isOpen && (
                      <p className="mt-1 text-[11px] text-fg-muted">
                        {t.speakers.length} 个相关报告
                      </p>
                    )}
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
                      <div className="mt-4">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                          相关报告
                        </p>
                        <div className="flex flex-wrap gap-2">
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
              </div>
            )
          })}
        </div>

        {/* Cross-cutting note */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/[0.04] p-4">
          <Layers className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm text-fg-soft">
            以上为本届会议的主要研讨方向，各方向之间互有交叉，分类仅供参考。完整报告列表详见
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
