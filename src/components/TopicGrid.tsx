import { useRef, useState } from 'react'
import {
  Atom,
  Brain,
  Cpu,
  Waves,
  Sigma,
  Network,
  Boxes,
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
  boxes: Boxes,
}

function getSpeaker(id: string) {
  return speakers.find((s) => s.id === id)
}

/** 议题详情：description + 讲者列表 + 关键技术词；桌面与移动端共用渲染。 */
function TopicDetail({ topic }: { topic: Topic }) {
  return (
    <>
      <p className="text-sm leading-relaxed text-fg-soft sm:text-[0.95rem] sm:leading-7">
        {topic.description}
      </p>

      <div className="mt-5 sm:mt-6">
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-primary">
          本届相关报告
        </p>
        <ul className="grid gap-2.5 lg:grid-cols-2 lg:gap-3">
          {topic.speakers.map((sp) => {
            const speaker = getSpeaker(sp.id)
            if (!speaker) return null
            return (
              <li
                key={sp.id}
                className="rounded-xl border border-black/5 bg-bg-alt/40 p-3 sm:p-3.5"
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <a
                    href="#speakers"
                    className="text-sm font-semibold text-fg transition hover:text-primary"
                  >
                    {speaker.name}
                  </a>
                  <span className="text-[11px] text-fg-muted">
                    {speaker.affiliation}
                  </span>
                </div>
                {speaker.topic && (
                  <p className="mt-1 text-xs italic text-fg-muted">
                    《{speaker.topic}》
                  </p>
                )}
                <p className="mt-1.5 text-xs leading-relaxed text-fg-soft">
                  {sp.note}
                </p>
              </li>
            )
          })}
        </ul>
      </div>

      {topic.keywords.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            关键技术词
          </p>
          <div className="flex flex-wrap gap-1.5">
            {topic.keywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center rounded-md border border-primary/15 bg-primary/[0.06] px-2 py-0.5 text-[11px] font-medium text-primary"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export function TopicGrid() {
  // 共享状态：桌面端永远是数字；移动端可为 null（全部折叠）
  const [selected, setSelected] = useState(0)
  const [openMobile, setOpenMobile] = useState<number | null>(null)
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const SelectedIcon = iconMap[topics[selected].icon]

  // 桌面端方向键 / Home / End 切换 selected（roving tabindex 模式）
  function handleNavKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    const max = topics.length - 1
    let next: number | null = null
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        next = selected === max ? 0 : selected + 1
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        next = selected === 0 ? max : selected - 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = max
        break
    }
    if (next !== null) {
      e.preventDefault()
      setSelected(next)
      navItemRefs.current[next]?.focus()
    }
  }

  return (
    <section id="topics" className="section-pad">
      <div className="container-page">
        <figure className="relative mb-10 overflow-hidden rounded-3xl">
          <img
            src="/generated/topics-banner.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[16/5] w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-black/30"
            aria-hidden
          />
          <figcaption className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
            <span className="hidden text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/85 drop-shadow md:block">
              Research Topics
            </span>
            <h2 className="text-2xl font-bold text-white drop-shadow-lg md:mt-3 md:text-3xl lg:text-4xl">
              <a href="#topics" className="hover:text-primary transition">
                主要议题方向
              </a>
            </h2>
            <p className="hidden max-w-xl text-sm leading-relaxed text-white/80 md:mt-3 md:block">
              围绕量子算法、量子-经典混合方法、硬件实现与智能赋能等方向，汇聚本届报告人的交叉研究成果
            </p>
          </figcaption>
        </figure>

        {/* 桌面端：vertical tabs（左侧 6 个方向 + 右侧详情） */}
        <div className="hidden lg:grid lg:grid-cols-[18rem_1fr] lg:gap-6">
          <nav
            className="self-start lg:sticky lg:top-20"
            aria-label="议题方向导航"
          >
            <ul className="space-y-1.5" onKeyDown={handleNavKeyDown}>
              {topics.map((t, idx) => {
                const Icon = iconMap[t.icon]
                const isActive = selected === idx
                return (
                  <li key={t.title}>
                    <button
                      ref={(el) => {
                        navItemRefs.current[idx] = el
                      }}
                      type="button"
                      id={`topic-nav-${idx}`}
                      onClick={() => setSelected(idx)}
                      aria-current={isActive ? 'true' : undefined}
                      aria-controls="topic-detail"
                      data-state={isActive ? 'active' : 'inactive'}
                      tabIndex={isActive ? 0 : -1}
                      className={cn(
                        'group flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
                        isActive
                          ? 'border-primary/40 bg-primary/[0.07] shadow-sm'
                          : 'border-transparent hover:border-black/5 hover:bg-bg-alt/60',
                      )}
                    >
                      <div
                        className={cn(
                          'grid size-9 shrink-0 place-items-center rounded-lg transition',
                          isActive
                            ? 'bg-primary text-white'
                            : 'bg-primary/10 text-primary group-hover:bg-primary/15',
                        )}
                      >
                        <Icon className="size-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            'text-sm font-semibold leading-snug transition',
                            isActive ? 'text-primary' : 'text-fg',
                          )}
                        >
                          {t.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-fg-muted">
                          {t.speakers.length} 位相关报告人
                        </p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div
            id="topic-detail"
            role="region"
            aria-labelledby={`topic-nav-${selected}`}
            className="card-surface p-6 lg:p-7"
          >
            <div className="mb-4 flex items-center gap-3 border-b border-black/5 pb-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-white">
                <SelectedIcon className="size-5.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wider text-fg-muted">
                  方向 {selected + 1} / {topics.length}
                </p>
                <h3 className="text-lg font-bold text-fg">
                  {topics[selected].title}
                </h3>
              </div>
            </div>
            <TopicDetail topic={topics[selected]} />
          </div>
        </div>

        {/* 移动端：原单列手风琴 */}
        <div className="space-y-3 lg:hidden">
          {topics.map((t, idx) => {
            const Icon = iconMap[t.icon]
            const isOpen = openMobile === idx
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
                  id={`topic-mobile-trigger-${idx}`}
                  aria-controls={`topic-mobile-panel-${idx}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpenMobile(isOpen ? null : idx)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/60 sm:px-6 sm:py-5"
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
                        {t.speakers.length} 位相关报告人 · 点击展开详情
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
                  id={`topic-mobile-panel-${idx}`}
                  role="region"
                  aria-labelledby={`topic-mobile-trigger-${idx}`}
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-black/5 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                      <TopicDetail topic={t} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Cross-cutting note */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl info-tint p-4">
          <Layers className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm text-fg-soft">
            以上为本届会议的主要研讨方向，各方向之间互有交叉，分类仅供参考。<a
              href="#speakers"
              className="font-medium text-primary hover:underline"
            >
              张镭
            </a>
            （UnitaryLab 量子科学计算平台）覆盖 PDE/ODE、数值线性代数、ML、优化全链路，作为基础设施横跨多方向。完整报告列表详见
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
