import { useState } from 'react'
import { Quote, Building2 } from 'lucide-react'
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
  primary: 'from-primary/40 to-accent/40 text-primary',
  secondary: 'from-secondary/40 to-primary/40 text-secondary',
} as const

type AvatarProps = {
  name: string
  size?: number
  accent?: 'primary' | 'secondary'
}

export function Avatar({ name, size = 56, accent = 'primary' }: AvatarProps) {
  const initial = name.trim().charAt(0)
  return (
    <span
      className={cn(
        'grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-semibold text-fg ring-1 ring-white/10',
        accentClasses[accent],
      )}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden
    >
      {initial}
    </span>
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
      className="group card-surface flex h-full flex-col p-6 text-left transition hover:-translate-y-1 hover:border-primary/40 focus-visible:border-primary focus-visible:outline-none"
    >
      <div className="flex items-start gap-4">
        <Avatar name={speaker.name} size={56} />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-fg">{speaker.name}</h3>
          <p className="mt-1 text-xs text-primary">{speaker.title}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-fg-muted">
            <Building2 className="size-3" />
            {speaker.affiliation}
          </p>
        </div>
      </div>
      {speaker.topic ? (
        <p className="mt-5 line-clamp-3 text-sm font-medium leading-relaxed text-fg-soft group-hover:text-fg">
          {speaker.topic}
        </p>
      ) : null}
      <span className="mt-auto pt-5 text-xs font-medium text-primary opacity-80 transition group-hover:opacity-100">
        查看简介与摘要 →
      </span>
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
            <span className="eyebrow">报告专家</span>
            <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
              报告人阵容
            </h2>
            <p className="mt-3 max-w-2xl text-fg-soft">
              {speakers.length} 位来自高校、科研院所与产业界的专家，分享流体力学量子计算的前沿算法、硬件实现与产业化进展。
            </p>
          </div>
          <span className="text-xs text-fg-muted">报告人持续更新中</span>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  <Avatar name={active.name} size={64} />
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
                    <p className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
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
