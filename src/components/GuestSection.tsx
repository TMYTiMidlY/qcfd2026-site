import { Award } from 'lucide-react'
import { guests } from '@/data/speakers'
import { Avatar } from '@/components/SpeakerCard'

export function GuestSection() {
  return (
    <section id="guests" className="section-pad bg-section-alt">
      <div className="container-page">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">特邀嘉宾</span>
            <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
              院士级专家领衔
            </h2>
            <p className="mt-3 max-w-xl text-fg-soft">
              来自量子光学、流体力学与量子计算硬件研发一线的资深学者，分享前沿洞察与产业判断。
            </p>
          </div>
          <span className="text-xs text-fg-muted">嘉宾持续更新中</span>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {guests.map((g) => (
            <div
              key={g.id}
              className="group relative card-surface overflow-hidden p-7 transition hover:-translate-y-1 hover:border-primary/40"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                aria-hidden
              />
              <div className="flex items-center gap-4">
                <Avatar name={g.name} size={64} accent="secondary" />
                <div>
                  <h3 className="text-xl font-semibold text-fg">{g.name}</h3>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-secondary">
                    <Award className="size-3.5" />
                    {g.title}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-fg-soft">{g.affiliation}</p>
              {g.bio ? (
                <p className="mt-5 line-clamp-4 text-sm leading-relaxed text-fg-soft/80">
                  {g.bio}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
