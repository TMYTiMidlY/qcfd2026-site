import { Award, Building2, GraduationCap } from 'lucide-react'
import { conference } from '@/data/conference'
import { Badge } from '@/components/ui/badge'

export function ChairIntro() {
  const chair = conference.chairProfile
  return (
    <section id="chair" className="section-pad">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow-en">Conference Chair</span>
          <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">大会主席</h2>
          <p className="mt-3 text-fg-soft">
            本届会议由 {chair.name} 教授担任大会主席，统筹学术议程与嘉宾邀请。
          </p>
        </div>

        <article className="mt-10 card-surface">
          <div className="grid gap-8 p-7 md:grid-cols-[auto_1fr] md:gap-10 md:p-10">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <img
                src={chair.photo}
                alt={`${chair.name} 的照片`}
                loading="lazy"
                decoding="async"
                className="size-32 rounded-full object-cover object-top ring-2 ring-primary/20 sm:size-40"
              />
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold text-fg">{chair.name}</h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  <Award className="size-3.5" />
                  会议主席
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 text-sm leading-relaxed text-fg-soft">
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-fg-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="size-3.5" />
                  {chair.affiliation}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap className="size-3.5" />
                  {chair.research}
                </span>
              </div>

              <p className="text-fg-soft/95">{chair.bio}</p>
            </div>
          </div>
        </article>

        <div className="mt-8">
          <div className="mb-4 flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-4 w-[3px] rounded-full bg-gradient-to-b from-primary to-secondary"
            />
            <span className="text-sm font-semibold text-fg">组织委员会</span>
          </div>
          <ul className="flex flex-wrap gap-2">
            {conference.committee.map((name) => (
              <li key={name}>
                <Badge
                  variant="secondary"
                  className="bg-bg-alt px-3 py-1 text-sm font-normal text-fg ring-1 ring-inset ring-fg/8 transition hover:bg-primary/10 hover:text-primary hover:ring-primary/20"
                >
                  {name}
                </Badge>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-fg-muted">
            统筹议程、嘉宾邀请与会务联络
          </p>
        </div>
      </div>
    </section>
  )
}
