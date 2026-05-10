import { MapPin, Navigation, Building, ExternalLink } from 'lucide-react'
import { conference } from '@/data/conference'
import { Button } from '@/components/ui/button'

const VENUE_NAME = '合肥翡翠湖迎宾馆'

const baiduEmbedUrl = `https://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D${encodeURIComponent(VENUE_NAME)}`

const mapLinks = [
  {
    key: 'amap',
    label: '高德地图',
    href: `https://uri.amap.com/search?keyword=${encodeURIComponent(VENUE_NAME)}&src=qcfd2026&callnative=1`,
    primary: true,
  },
  {
    key: 'baidu',
    label: '百度地图',
    href: `https://map.baidu.com/search/${encodeURIComponent(VENUE_NAME)}`,
  },
  {
    key: 'tencent',
    label: '腾讯地图',
    href: `https://map.qq.com/#search?keyword=${encodeURIComponent(VENUE_NAME)}`,
  },
  {
    key: 'apple',
    label: '苹果地图',
    href: `https://maps.apple.com/?q=${encodeURIComponent(VENUE_NAME)}`,
  },
]

export function VenueMap() {
  return (
    <section id="venue" className="section-pad">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">会议地点</span>
          <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
            合肥翡翠湖迎宾馆
          </h2>
          <p className="mt-3 text-fg-soft">
            位于合肥翡翠湖畔，环境安静、配套完善。3 号楼为本次会议的主会场所在地。
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-6">
          {/* 左侧：百度地图 iframe */}
          <div className="card-surface overflow-hidden">
            <iframe
              src={baiduEmbedUrl}
              title="百度地图：合肥翡翠湖迎宾馆"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block aspect-[4/3] w-full border-0 sm:aspect-[16/10] lg:aspect-auto lg:h-[520px]"
            />
          </div>

          {/* 右侧：场地信息 + 跳转按钮 */}
          <div className="card-surface flex flex-col gap-5 p-5 sm:p-7">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <MapPin className="size-3.5" />
                Conference Venue
              </span>
              <h3 className="mt-3 text-xl font-bold text-fg sm:text-2xl">
                合肥翡翠湖迎宾馆
                <span className="ml-2 inline-block text-base font-medium text-primary">
                  3 号楼
                </span>
              </h3>
              <p className="mt-2 inline-flex items-start gap-2 text-sm text-fg-soft">
                <MapPin className="mt-0.5 size-4 shrink-0 text-fg-muted" />
                {conference.address}
              </p>
            </div>

            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-xl border border-black/5 bg-bg-alt/60 p-3">
                <dt className="text-xs text-fg-muted">最近地铁</dt>
                <dd className="mt-1 font-medium text-fg">3 号线 · 工大翡翠湖校区</dd>
              </div>
              <div className="rounded-xl border border-black/5 bg-bg-alt/60 p-3">
                <dt className="text-xs text-fg-muted">会期</dt>
                <dd className="mt-1 font-medium text-fg">{conference.dates}</dd>
              </div>
            </dl>

            <div>
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                <Building className="size-3.5" />
                打开地图导航
              </p>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                {mapLinks.map((m) => (
                  <Button
                    key={m.key}
                    asChild
                    size="lg"
                    variant={m.primary ? 'default' : 'outline'}
                    className="justify-start"
                  >
                    <a href={m.href} target="_blank" rel="noreferrer">
                      <Navigation className="size-4" />
                      在{m.label}中打开
                      <ExternalLink className="ml-auto size-4 opacity-60" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
