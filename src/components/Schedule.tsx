import { useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { schedule } from '@/data/schedule'

export function Schedule() {
  const [active, setActive] = useState(0)
  const day = schedule[active]

  return (
    <section id="schedule" className="section-pad">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">会议日程</span>
          <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
            三天日程总览
          </h2>
          <p className="mt-3 text-fg-soft">
            5 月 22 日报到，23 日全天学术会议，24 日参观与离会。详细议程在临会前另行公布。
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {schedule.map((d, idx) => (
            <button
              key={d.date}
              onClick={() => setActive(idx)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-sm font-medium transition',
                idx === active
                  ? 'border-primary bg-primary text-white shadow-lg shadow-primary/25'
                  : 'border-black/10 bg-white text-fg-soft hover:border-primary/40 hover:text-primary',
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Calendar className="size-3.5" />
                {d.date} · {d.weekday}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 card-surface overflow-hidden">
          <div className="flex flex-col gap-1 border-b border-black/5 px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
            <div>
              <h3 className="text-2xl font-semibold text-fg">{day.label}</h3>
              <p className="mt-1 text-sm text-fg-muted">
                {day.date} · {day.weekday}
              </p>
            </div>
            <span className="text-xs text-fg-muted">
              共 {day.items.length} 项安排
            </span>
          </div>

          <ol className="divide-y divide-black/5">
            {day.items.map((item, idx) => (
              <li
                key={idx}
                className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-start sm:px-7"
              >
                <span className="inline-flex w-32 shrink-0 items-center gap-2 text-sm font-medium text-primary">
                  <Clock className="size-3.5" />
                  {item.time ?? '—'}
                </span>
                <div className="flex-1">
                  <p className="text-base text-fg">{item.title}</p>
                  {item.note ? (
                    <p className="mt-1 text-xs text-fg-muted">{item.note}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
