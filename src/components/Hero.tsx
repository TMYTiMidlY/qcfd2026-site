import { useEffect, useState } from 'react'
import { ArrowDown, CalendarDays, MapPin, ExternalLink } from 'lucide-react'
import { conference } from '@/data/conference'
import { Button } from '@/components/ui/button'

function useCountdown(target: string, endTarget: string) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60_000)
    return () => clearInterval(t)
  }, [])
  const startMs = new Date(target).getTime()
  const endMs = new Date(endTarget).getTime()
  const diff = Math.max(0, startMs - now)
  const day = 24 * 60 * 60 * 1000
  const days = Math.floor(diff / day)
  const hours = Math.floor((diff % day) / (60 * 60 * 1000))
  const phase: 'before' | 'during' | 'ended' =
    now < startMs ? 'before' : now < endMs ? 'during' : 'ended'
  return { days, hours, phase }
}

// 倒计时锚定 5/23 08:30 学术会议开场（用户 2026-05-11 15:53 在会话中确认；
// docx 第二节仅写「5月23日，学术会议」未明时段，详见 SOURCES.md §1）
const COUNTDOWN_TARGET = '2026-05-23T08:30:00+08:00'
// 会议 5/22-24；5/24 末项参观结束于 10:40，下午为离会。
// 12:00 起切换到「会议已闭幕」提示。
const CONFERENCE_END = '2026-05-24T12:00:00+08:00'

export function Hero() {
  const { days, hours, phase } = useCountdown(COUNTDOWN_TARGET, CONFERENCE_END)

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden flex items-center min-h-[100svh] py-24 md:py-28 bg-aurora"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div
        className="hero-decor-bg pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div className="hero-bottom-fade pointer-events-none absolute inset-x-0 bottom-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(56,189,248,0.35) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div className="container-page relative">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <span className="size-1.5 rounded-full bg-primary animate-[pulse-glow_2.4s_ease-in-out_infinite]" />
            QCFD 2026
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] text-shadow-soft sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            <span className="block text-fg">
              {conference.edition}流体力学
            </span>
            <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              量子计算前沿研讨会
            </span>
          </h1>
          <p className="mt-4 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-primary/80 sm:text-xs sm:tracking-[0.18em] md:text-sm">
            <span className="whitespace-nowrap">THE 3RD FRONTIER SYMPOSIUM</span>{' '}
            <span className="whitespace-nowrap">ON QUANTUM COMPUTATIONAL</span>{' '}
            <span className="whitespace-nowrap">FLUID DYNAMICS</span>
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-soft md:text-lg">
            {conference.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-fg-soft">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-primary" />
              {conference.dates}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              {conference.venue}
            </span>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full shadow-[0_8px_30px_-10px_rgba(56,189,248,0.6)]"
            >
              <a
                href={conference.registrationUrl}
                target="_blank"
                rel="noreferrer"
              >
                立即注册
                <ExternalLink className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full bg-white/70 backdrop-blur hover:bg-white"
            >
              <a href="#schedule">
                查看日程
                <ArrowDown className="size-4" />
              </a>
            </Button>
          </div>

          <div className="mt-10 inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-black/5 bg-white/70 px-5 py-3 shadow-sm backdrop-blur max-sm:mt-8 max-sm:gap-x-2 max-sm:border-transparent max-sm:bg-white/40 max-sm:px-3 max-sm:py-2 max-sm:shadow-none max-sm:text-sm">
            {phase === 'during' ? (
              <span className="text-sm text-fg">会议正在进行，欢迎现场交流</span>
            ) : phase === 'ended' ? (
              <span className="text-sm text-fg">
                会议已圆满闭幕，期待 2027 再会
              </span>
            ) : (
              <>
                <span className="text-xs uppercase tracking-[0.18em] text-fg-muted">
                  距会议开始
                </span>
                <span className="text-2xl font-bold text-primary tabular-nums">
                  {days}
                </span>
                <span className="text-sm text-fg-soft">天</span>
                <span className="text-2xl font-bold text-primary tabular-nums">
                  {hours}
                </span>
                <span className="text-sm text-fg-soft">小时</span>
              </>
            )}
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs text-fg-muted">
            <span>
              主办：<span className="text-fg-soft">{conference.organizer}</span>
            </span>
            <span>
              承办：<span className="text-fg-soft">{conference.host}</span>
            </span>
            <span>
              协办：
              <span className="text-fg-soft">
                {conference.coOrganizers.join('、')}
              </span>
            </span>
            <span>
              会议主席：<span className="text-fg-soft">{conference.chair}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
