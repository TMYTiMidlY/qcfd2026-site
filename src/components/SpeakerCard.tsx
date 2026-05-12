import { useState } from 'react'
import { Quote, Building2, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Speaker } from '@/data/speakers'
import { speakers } from '@/data/speakers'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

const accentClasses = {
  primary: 'from-primary/20 to-accent/20 text-primary',
  secondary: 'from-secondary/20 to-primary/20 text-secondary',
} as const

type InitialAvatarProps = {
  name: string
  size?: number
  accent?: 'primary' | 'secondary'
  className?: string
}

export function InitialAvatar({
  name,
  size = 56,
  accent = 'primary',
  className,
}: InitialAvatarProps) {
  const initial = name.trim().charAt(0)
  return (
    <span
      className={cn(
        'grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-semibold ring-1 ring-black/5',
        accentClasses[accent],
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden
    >
      {initial}
    </span>
  )
}

type PhotoProps = {
  src?: string
  name: string
  className?: string
}

function Photo({ src, name, className }: PhotoProps) {
  if (!src) {
    return (
      <div
        className={cn(
          'flex h-full w-full flex-col items-center justify-center gap-2 bg-bg-alt/80 text-fg-muted',
          className,
        )}
        aria-hidden
      >
        <UserRound
          className="size-1/3 opacity-60"
          strokeWidth={1.25}
        />
        <span className="rounded-full border border-black/10 bg-white/70 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-fg-muted">
          照片待更新
        </span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={`${name} 的照片`}
      loading="lazy"
      decoding="async"
      className={cn(
        'h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]',
        className,
      )}
    />
  )
}

export function SpeakerCard({
  speaker,
  onOpen,
}: {
  speaker: Speaker
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group card-surface flex h-full flex-col overflow-hidden text-left transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(3,105,161,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-alt">
        <Photo src={speaker.photo} name={speaker.name} />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent"
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="text-base font-semibold text-fg sm:text-lg">{speaker.name}</h3>
        <p className="mt-1 text-[11px] font-medium text-primary sm:text-xs">{speaker.title}</p>
        <p className="mt-1 inline-flex items-start gap-1.5 text-[11px] text-fg-muted sm:text-xs">
          <Building2 className="mt-0.5 size-3 shrink-0" />
          <span className="line-clamp-2">{speaker.affiliation}</span>
        </p>
        {speaker.topic ? (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-fg-soft sm:mt-4 sm:text-sm">
            {speaker.topic}
          </p>
        ) : null}
        <span className="mt-auto pt-3 text-[11px] font-medium text-primary opacity-70 transition group-hover:opacity-100 sm:pt-4 sm:text-xs">
          查看简介与摘要 →
        </span>
      </div>
    </button>
  )
}

export function SpeakerGrid() {
  const [active, setActive] = useState<Speaker | null>(null)

  return (
    <section id="speakers" className="section-pad bg-section-alt">
      <div className="container-page">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow-en">Distinguished Speakers</span>
            <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
              <a href="#speakers" className="hover:text-primary/80 transition">特邀报告讲者</a>
            </h2>
            <p className="mt-3 max-w-2xl text-fg-soft">
              来自高校、科研院所与产业界的专家学者，分享流体力学量子计算的前沿算法、硬件实现与产业化进展。点击头像查看报告题目、简介与摘要。
            </p>
          </div>
          <span className="text-xs text-fg-muted">报告人持续更新中</span>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {speakers.map((s) => (
            <SpeakerCard
              key={s.id}
              speaker={s}
              onOpen={() => setActive(s)}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-2xl card-surface text-fg">
          {active ? (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4 pr-8">
                  {active.photo ? (
                    <img
                      src={active.photo}
                      alt={`${active.name} 的照片`}
                      className="size-20 shrink-0 rounded-2xl object-cover object-top ring-1 ring-black/5"
                    />
                  ) : (
                    <div className="flex size-20 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl bg-bg-alt/80 text-fg-muted ring-1 ring-black/5">
                      <UserRound className="size-7 opacity-60" strokeWidth={1.25} />
                      <span className="text-[10px] tracking-wider text-fg-muted">
                        待更新
                      </span>
                    </div>
                  )}
                  <div className="text-left">
                    <DialogTitle className="text-2xl font-semibold text-fg">
                      {active.name}
                    </DialogTitle>
                    <DialogDescription asChild>
                      <p className="mt-1 text-sm text-primary">
                        {active.title}
                        <span className="mt-0.5 block text-xs text-fg-muted">
                          {active.affiliation}
                        </span>
                      </p>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 text-sm leading-relaxed text-fg-soft">
                {active.topic ? (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                      报告题目
                    </h4>
                    <p className="text-base font-medium text-fg">
                      {active.topic}
                    </p>
                  </div>
                ) : null}
                {active.bio ? (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                      报告人简介
                    </h4>
                    <p>{active.bio}</p>
                  </div>
                ) : null}
                {active.abstract ? (
                  <div>
                    <h4 className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                      <Quote className="size-3" /> 报告摘要
                    </h4>
                    <p className="rounded-xl border border-black/5 bg-bg-alt/60 p-4">
                      {active.abstract}
                    </p>
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
