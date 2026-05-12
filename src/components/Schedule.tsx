import { useState } from 'react'
import { Calendar, Clock, Mic, Coffee } from 'lucide-react'
import { cn } from '@/lib/utils'
import { schedule, type ScheduleItem } from '@/data/schedule'

type Block =
  | { kind: 'session'; chair: string; items: ScheduleItem[] }
  | { kind: 'break'; item: ScheduleItem }

/** 将 flat items 拆成 session block 和独立 break */
function groupItems(items: ScheduleItem[]): Block[] {
  const blocks: Block[] = []
  let current: Block | null = null

  for (const item of items) {
    if (item.chair) {
      // 新 session 开始
      current = { kind: 'session', chair: item.chair, items: [item] }
      blocks.push(current)
    } else if (!item.speaker) {
      // 无 speaker 且无 chair → 茶歇/午餐/晚餐等独立条目
      current = null
      blocks.push({ kind: 'break', item })
    } else if (current?.kind === 'session') {
      // 归入当前 session
      current.items.push(item)
    } else {
      // 无归属的报告条目（兜底），独立展示
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
            5 月 22 日报到，23 日全天学术会议（14 个邀请报告，按下方时段进行），
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
              ) : (
                <div key={bIdx} className="px-5 py-5 sm:px-7">
                  {/* Session header */}
                  <div className="mb-3 flex items-center gap-2">
                    <Mic className="size-3.5 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      主持：{block.chair}
                    </span>
                    <span className="h-px flex-1 bg-primary/15" aria-hidden />
                  </div>
                  {/* Items with left accent border */}
                  <div className="divide-y divide-black/5 border-l-2 border-primary/25 pl-4 sm:pl-5">
                    {block.items.map((item, iIdx) => (
                      <ItemRow key={iIdx} item={item} />
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
