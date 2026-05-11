import { Award, Building2, Users } from 'lucide-react'
import { conference } from '@/data/conference'
import { guests } from '@/data/speakers'
import { InitialAvatar } from '@/components/SpeakerCard'

function GuestAvatar({
  src,
  name,
  size = 64,
}: {
  src?: string
  name: string
  size?: number
}) {
  if (!src) {
    return <InitialAvatar name={name} size={size} accent="secondary" />
  }
  return (
    <img
      src={src}
      alt={`${name} 的照片`}
      loading="lazy"
      decoding="async"
      className="shrink-0 rounded-full object-cover object-top ring-1 ring-black/5"
      style={{ width: size, height: size }}
    />
  )
}

export function GuestSection() {
  return (
    <section id="guests" className="section-pad">
      <div className="container-page">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow-en">Honored Guests</span>
            <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
              特邀嘉宾
            </h2>
            <p className="mt-3 max-w-xl text-fg-soft">
              本届会议邀请的院士与资深学者，覆盖量子信息、流体力学与量子计算等方向。
            </p>
          </div>
          <span className="text-xs text-fg-muted">嘉宾持续更新中</span>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {guests.map((g) => (
            <article
              key={g.id}
              className="group relative card-surface overflow-hidden p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(124,58,237,0.4)]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent"
                aria-hidden
              />
              <div className="flex items-center gap-4">
                <GuestAvatar src={g.photo} name={g.name} size={64} />
                <div>
                  <h3 className="text-xl font-semibold text-fg">{g.name}</h3>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-secondary">
                    <Award className="size-3.5" />
                    {g.title}
                  </p>
                </div>
              </div>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-fg-soft">
                <Building2 className="size-3.5 text-fg-muted" />
                {g.affiliation}
              </p>
              {g.bio ? (
                <p className="mt-5 line-clamp-7 text-sm leading-relaxed text-fg-soft/90">
                  {g.bio}
                </p>
              ) : null}
            </article>
          ))}
        </div>

        <div className="relative mt-12 card-surface overflow-hidden p-6 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(45% 60% at 15% 20%, color-mix(in oklab, var(--color-primary) 14%, transparent), transparent 65%), radial-gradient(45% 60% at 85% 85%, color-mix(in oklab, var(--color-secondary) 12%, transparent), transparent 65%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent"
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-fg">
              <Users className="size-4 text-primary" />
              <h3 className="text-base font-semibold">组织委员会</h3>
              <span className="text-xs text-fg-muted">
                统筹议程、嘉宾邀请与会务联络
              </span>
            </div>
            <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-5 md:gap-x-2">
              {conference.committee.map((name, i) => (
                <li
                  key={name}
                  className="group/m flex flex-col items-center gap-3 text-center"
                >
                  <span className="relative grid place-items-center">
                    <span
                      aria-hidden
                      className="absolute inset-[-14px] rounded-full bg-gradient-to-br from-primary/45 to-secondary/45 opacity-90 blur-xl transition-opacity duration-500 group-hover/m:opacity-100"
                      style={{
                        animation: 'pulse-glow 5s ease-in-out infinite',
                        animationDelay: `${i * 0.6}s`,
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-[-3px] rounded-full ring-1 ring-primary/20"
                    />
                    <InitialAvatar
                      name={name}
                      size={56}
                      accent={i % 2 === 0 ? 'primary' : 'secondary'}
                      className="relative shadow-md ring-2 ring-white/95"
                    />
                  </span>
                  <span className="text-sm font-medium text-fg transition group-hover/m:text-primary">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
