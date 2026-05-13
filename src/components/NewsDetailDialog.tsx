import {
  ArrowUpRight,
  CheckCircle2,
  Hotel,
  Info,
  MessageSquare,
  Newspaper,
  Sparkles,
  X,
  type LucideIcon,
} from 'lucide-react'
import type { NewsItem, NewsBodyBlock } from '@/data/news'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type Props = {
  item: NewsItem | null
  onOpenChange: (open: boolean) => void
}

const CALLOUT_ICONS: Record<NonNullable<Extract<NewsBodyBlock, { kind: 'callout' }>['icon']>, LucideIcon> = {
  hotel: Hotel,
  sparkles: Sparkles,
  info: Info,
  check: CheckCircle2,
  'message-square': MessageSquare,
}

type CalloutTone = NonNullable<Extract<NewsBodyBlock, { kind: 'callout' }>['tone']>

const CALLOUT_TONE: Record<CalloutTone, { card: string; iconWrap: string; title: string }> = {
  primary: {
    card: 'border-primary/20 bg-gradient-to-br from-primary/[0.06] via-white to-primary/[0.03] shadow-sm shadow-primary/5',
    iconWrap: 'bg-primary/12 text-primary ring-1 ring-primary/15',
    title: 'text-fg',
  },
  accent: {
    card: 'border-amber-300/40 bg-gradient-to-br from-amber-50 via-white to-amber-50/40 shadow-sm shadow-amber-300/10',
    iconWrap: 'bg-amber-500/12 text-amber-700 ring-1 ring-amber-500/20',
    title: 'text-fg',
  },
}

function CalloutCard({ block }: { block: Extract<NewsBodyBlock, { kind: 'callout' }> }) {
  const Icon = CALLOUT_ICONS[block.icon ?? 'info'] ?? Info
  const tone = CALLOUT_TONE[block.tone ?? 'primary']
  return (
    <div className={`flex gap-3.5 rounded-2xl border p-4 sm:gap-4 sm:p-5 ${tone.card}`}>
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-xl ${tone.iconWrap}`}
        aria-hidden
      >
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1 space-y-1.5">
        {block.title ? (
          <h4 className={`text-sm font-semibold leading-snug sm:text-[0.95rem] ${tone.title}`}>
            {block.title}
          </h4>
        ) : null}
        <p className="text-sm leading-relaxed text-fg-soft">{block.text}</p>
      </div>
    </div>
  )
}

export function NewsDetailDialog({ item, onOpenChange }: Props) {
  return (
    <Dialog open={!!item} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="card-surface text-fg flex max-h-[calc(100dvh-1.5rem)] flex-col gap-0 overflow-hidden p-0 sm:max-h-[min(85dvh,720px)] sm:max-w-2xl"
      >
        <DialogClose
          aria-label="关闭"
          className="absolute right-3 top-3 z-20 grid size-10 place-items-center rounded-full bg-white/95 text-fg-muted shadow-md ring-1 ring-black/20 backdrop-blur transition hover:bg-white hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <X className="size-4" />
        </DialogClose>
        {item ? (
          <>
            <DialogHeader className="shrink-0 p-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-start gap-4 pr-12">
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="size-6" />
                </div>
                <div className="text-left">
                  {item.tag ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                      <Newspaper className="size-3" />
                      {item.tag}
                    </span>
                  ) : null}
                  <DialogTitle className="mt-2 text-xl font-semibold leading-snug text-fg sm:text-2xl">
                    {item.title}
                  </DialogTitle>
                  <DialogDescription asChild>
                    <p className="mt-1 text-xs text-fg-muted">{item.date}</p>
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 pb-5 text-sm leading-relaxed text-fg-soft sm:px-6 sm:pb-6">
              {(item.body ?? [item.excerpt]).map((block, i) => {
                if (typeof block === 'string') {
                  return (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'rounded-xl border border-primary/15 bg-primary/[0.05] p-4 text-fg'
                          : ''
                      }
                    >
                      {block}
                    </p>
                  )
                }
                return <CalloutCard key={i} block={block} />
              })}
              {item.actionUrl ? (
                <div className="pt-1">
                  <a
                    href={item.actionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    {item.actionLabel ?? '前往'}
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              ) : null}
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
