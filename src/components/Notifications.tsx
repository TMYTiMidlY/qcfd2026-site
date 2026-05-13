/**
 * 顶部右侧的"会议方最新通告"通知栈
 * - 数据源：news.ts 中 pinned: true 且带 body 的条目
 * - 行为：用户首次访问自动浮出；点击「关闭」后通过 localStorage 持久化 dismiss，下次不再弹
 * - 「查看详情」按钮打开与新闻区共用的 NewsDetailDialog（相同 body 段落布局）
 * - 入场延迟 600ms，避免与 Hero 入场动画相撞
 */
import { useEffect, useState } from 'react'
import { Bell, Newspaper, X } from 'lucide-react'
import { news, type NewsItem } from '@/data/news'
import { NewsDetailDialog } from '@/components/NewsDetailDialog'

const DISMISS_KEY_PREFIX = 'qcfd2026.notif.dismissed:'

function isDismissed(id: string): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(DISMISS_KEY_PREFIX + id) === '1'
  } catch {
    return false
  }
}

function persistDismiss(id: string) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(DISMISS_KEY_PREFIX + id, '1')
  } catch {
    // ignore (隐私模式 / 配额)
  }
}

export function Notifications() {
  const pinned = news.filter((n) => n.pinned && n.body)

  const [activeIds, setActiveIds] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const [detail, setDetail] = useState<NewsItem | null>(null)

  useEffect(() => {
    const remaining = pinned.filter((n) => !isDismissed(n.id)).map((n) => n.id)
    if (remaining.length === 0) return
    const t = setTimeout(() => {
      setActiveIds(remaining)
      setMounted(true)
    }, 600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const visible = pinned.filter((n) => activeIds.includes(n.id))
  if (visible.length === 0) return null

  function dismiss(id: string) {
    persistDismiss(id)
    setActiveIds((cur) => cur.filter((x) => x !== id))
  }

  return (
    <>
      <div
        aria-label="会议通知"
        className="pointer-events-none fixed right-4 top-20 z-[60] flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-3 sm:right-6 sm:top-24"
      >
        {visible.map((n, i) => (
          <article
            key={n.id}
            style={{ animationDelay: `${i * 80}ms` }}
            className={
              'pointer-events-auto card-surface relative flex flex-col gap-3 p-4 shadow-xl shadow-primary/10 transition ' +
              (mounted
                ? 'animate-in fade-in-0 slide-in-from-right-4 duration-500 fill-mode-both'
                : 'opacity-0')
            }
          >
            <button
              type="button"
              onClick={() => dismiss(n.id)}
              aria-label="关闭通知"
              className="absolute right-2 top-2 grid size-7 place-items-center rounded-full text-fg-muted transition hover:bg-bg-alt hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <X className="size-4" />
            </button>

            <div className="flex items-center gap-2 pr-7">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Bell className="size-3.5" />
              </span>
              {n.tag ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                  <Newspaper className="size-3" />
                  {n.tag}
                </span>
              ) : null}
              <span className="ml-auto text-[11px] text-fg-muted">{n.date}</span>
            </div>

            <h3 className="text-sm font-semibold leading-snug text-fg">{n.title}</h3>
            <p className="line-clamp-3 text-xs leading-relaxed text-fg-soft">
              {n.excerpt}
            </p>

            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() => setDetail(n)}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-primary/20"
              >
                查看详情
              </button>
              <button
                type="button"
                onClick={() => dismiss(n.id)}
                className="text-xs text-fg-muted transition hover:text-fg"
              >
                我知道了
              </button>
            </div>
          </article>
        ))}
      </div>

      <NewsDetailDialog
        item={detail}
        onOpenChange={(open) => !open && setDetail(null)}
      />
    </>
  )
}
