import { Award, Building2 } from 'lucide-react'
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
              <a href="#guests" className="hover:text-primary/80 transition">特邀嘉宾</a>
            </h2>
            <p className="mt-3 max-w-xl text-fg-soft">
              本届会议邀请的院士与资深学者，覆盖量子信息、流体力学与量子计算等方向。
            </p>
          </div>
          <span className="text-xs text-fg-muted">3 位特邀嘉宾</span>
        </div>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-3">
          {guests.map((g) => (
            <article
              key={g.id}
              className="group relative card-surface flex h-full flex-col overflow-hidden p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(124,58,237,0.4)]"
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
                <p className="mt-5 flex-1 text-sm leading-relaxed text-fg-soft/90">
                  {g.bio}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
