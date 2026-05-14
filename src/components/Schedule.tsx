import { useState } from 'react'
import { Calendar, Clock, Mic, Coffee, Info, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { schedule, type ScheduleItem } from '@/data/schedule'

type Block =
  | { kind: 'session'; chair: string; items: ScheduleItem[] }
  | { kind: 'break'; item: ScheduleItem }
  | { kind: 'visit'; items: ScheduleItem[] }

/** 将 flat items 拆成 session block、独立 break 和参观 block */
function groupItems(items: ScheduleItem[]): Block[] {
  const blocks: Block[] = []
  let current: Block | null = null

  for (const item of items) {
    if (item.kind === 'visit') {
      if (current?.kind === 'visit') {
        current.items.push(item)
      } else {
        current = { kind: 'visit', items: [item] }
        blocks.push(current)
      }
    } else if (item.chair) {
      current = { kind: 'session', chair: item.chair, items: [item] }
      blocks.push(current)
    } else if (!item.speaker) {
      current = null
      blocks.push({ kind: 'break', item })
    } else if (current?.kind === 'session') {
      current.items.push(item)
    } else {
      blocks.push({ kind: 'break', item })
    }
  }
  return blocks
}

function ItemRow({ item }: { item: ScheduleItem }) {
  return (
    <div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start">
      <span className="inline-flex w-32 shrink-0 items-center gap-2 text-sm font-medium text-primary">
        <Clock className="size-3.5" />
        {item.time ?? '—'}
      </span>
      <div className="flex-1">
        <p className="text-base text-fg">
          {item.speaker ? (
            <span className="mr-2 font-semibold text-primary">
              {item.speaker}
            </span>
          ) : null}
          {item.title}
        </p>
        {item.note ? (
          <p className="mt-1 text-xs text-fg-muted">{item.note}</p>
        ) : null}
      </div>
    </div>
  )
}

export function Schedule() {
  const [active, setActive] = useState(0)
  const day = schedule[active]
  const blocks = groupItems(day.items)

  return (
    <section id="schedule" className="section-pad">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">会议日程</span>
          <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
            <a href="#schedule" className="hover:text-primary/80 transition">三天日程总览</a>
          </h2>
          <p className="mt-3 text-fg-soft">
            5 月 22 日报到，23 日全天学术会议，
            24 日参观与离会。
          </p>
        </div>

        <div className="mt-10 flex w-full gap-1.5 sm:flex-wrap sm:gap-2">
          {schedule.map((d, idx) => (
            <button
              key={d.date}
              onClick={() => setActive(idx)}
              className={cn(
                'flex-1 rounded-full border px-2 py-2 text-xs font-medium transition sm:flex-none sm:px-5 sm:py-2.5 sm:text-sm',
                idx === active
                  ? 'border-primary bg-primary text-white shadow-lg shadow-primary/25'
                  : 'border-black/10 bg-white text-fg-soft hover:border-primary/40 hover:text-primary',
              )}
            >
              <span className="inline-flex items-center justify-center gap-1 whitespace-nowrap sm:gap-2">
                <Calendar className="size-3 shrink-0 sm:size-3.5" />
                <span className="sm:hidden">
                  {d.shortDate} {d.shortWeekday}
                </span>
                <span className="hidden sm:inline">
                  {d.date} · {d.weekday}
                </span>
              </span>
            </button>
          ))}
        </div>

        {day.items.every((i) => i.kind === 'visit') ? (
          /* 参观日：同样的 tab 白色卡片容器 + 竖直时间线内容 */
          <div className="mt-6 card-surface overflow-hidden">
            <div className="flex flex-col gap-1 border-b border-black/5 px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
              <div>
                <h3 className="text-2xl font-semibold text-fg">{day.label}</h3>
                <p className="mt-1 text-sm text-fg-muted">
                  {day.date} · {day.weekday}
                </p>
              </div>
            </div>

            <div className="px-5 py-6 sm:px-7">
              <div className="relative pl-8 sm:pl-10">
                {/* 时间轴线 */}
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-primary to-primary/20 sm:left-[15px]" aria-hidden />

                {day.items.map((item, i) => (
                  <div key={i} className="relative pb-8 last:pb-0">
                    <div className="absolute -left-8 top-1 grid size-6 place-items-center rounded-full bg-accent/15 ring-2 ring-accent/30 sm:-left-10 sm:size-8">
                      <MapPin className="size-3 text-accent sm:size-3.5" />
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                        <Clock className="size-3" />
                        {item.time}
                      </span>
                      <h4 className="mt-1.5 text-base font-semibold text-fg">{item.title}</h4>
                      {item.note ? (
                        <p className="mt-1 text-sm text-fg-soft">{item.note}</p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {day.description ? (
              <div className="flex items-start gap-3 border-t border-black/5 bg-primary/[0.04] px-5 py-4 sm:px-7">
                <Info className="mt-0.5 size-4 shrink-0 text-primary" />
                <p className="text-xs leading-relaxed text-fg-soft">
                  {day.description}
                </p>
              </div>
            ) : null}
          </div>
        ) : (
          /* 会议日：session / break 列表 */
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

            <div className="divide-y divide-black/5">
              {blocks.map((block, bIdx) =>
                block.kind === 'break' ? (
                  <div
                    key={bIdx}
                    className="flex items-center gap-3 bg-bg-alt/50 px-5 py-4 sm:px-7"
                  >
                    <Coffee className="size-4 text-fg-muted" />
                    <span className="inline-flex w-32 shrink-0 items-center gap-2 text-sm font-medium text-fg-muted">
                      <Clock className="size-3.5" />
                      {block.item.time ?? '—'}
                    </span>
                    <span className="text-sm text-fg-soft">
                      {block.item.title}
                      {block.item.note ? (
                        <span className="ml-2 text-xs text-fg-muted">
                          · {block.item.note}
                        </span>
                      ) : null}
                    </span>
                  </div>
                ) : block.kind === 'session' ? (
                  <div key={bIdx} className="px-5 py-5 sm:px-7">
                    <div className="mb-3 flex items-center gap-2">
                      <Mic className="size-3.5 text-primary" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        主持：{block.chair}
                      </span>
                      <span className="h-px flex-1 bg-primary/15" aria-hidden />
                    </div>
                    <div className="divide-y divide-black/5 border-l-2 border-primary/25 pl-4 sm:pl-5">
                      {block.items.map((item, iIdx) => (
                        <ItemRow key={iIdx} item={item} />
                      ))}
                    </div>
                  </div>
                ) : null,
              )}
              {day.description ? (
                <div className="flex items-start gap-3 bg-primary/[0.04] px-5 py-4 sm:px-7">
                  <Info className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-xs leading-relaxed text-fg-soft">
                    {day.description}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
