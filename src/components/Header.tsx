import { useEffect, useState } from 'react'
import { Menu, X, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { conference } from '@/data/conference'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '#home', label: '首页' },
  { href: '#guests', label: '特邀嘉宾' },
  { href: '#topics', label: '议题方向' },
  { href: '#speakers', label: '报告专家' },
  { href: '#schedule', label: '日程' },
  { href: '#venue', label: '会议地点' },
  { href: '#traffic', label: '交通指南' },
  { href: '#news', label: '会议新闻' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/10 bg-bg/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-ink font-bold shadow-lg shadow-primary/20 transition group-hover:shadow-primary/40">
            Q
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-fg">
              {conference.shortName}
            </span>
            <span className="block text-[11px] text-fg-muted">
              流体力学量子计算 · 合肥
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm text-fg-soft transition hover:bg-white/5 hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href={conference.registrationUrl} target="_blank" rel="noreferrer">
              会议注册
              <ExternalLink className="size-4" />
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="菜单"
            className="grid size-10 place-items-center rounded-full text-fg lg:hidden hover:bg-white/5"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-white/10 bg-bg/95 backdrop-blur-xl">
          <nav className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-fg-soft hover:bg-white/5 hover:text-fg"
              >
                {link.label}
              </a>
            ))}
            <Button asChild size="sm" className="mt-2 w-full">
              <a href={conference.registrationUrl} target="_blank" rel="noreferrer">
                会议注册
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
