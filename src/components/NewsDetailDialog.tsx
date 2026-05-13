import { Newspaper, Sparkles, X } from 'lucide-react'
import type { NewsItem } from '@/data/news'
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
              {(item.body ?? [item.excerpt]).map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'rounded-xl border border-primary/15 bg-primary/[0.05] p-4 text-fg'
                      : ''
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
