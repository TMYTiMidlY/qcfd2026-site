import { MapPin, Navigation, Building, ExternalLink, Map as MapIcon } from 'lucide-react'
import { conference } from '@/data/conference'
import { Button } from '@/components/ui/button'

const VENUE_NAME = '合肥翡翠湖迎宾馆'

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

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
          {/* 左侧：场地速览大卡 */}
          <div className="card-surface relative flex flex-col justify-between overflow-hidden p-5 sm:p-7 lg:p-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  'radial-gradient(circle at 20% 20%, rgba(56,189,248,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(124,58,237,0.12) 0%, transparent 55%)',
              }}
              aria-hidden
            />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <MapPin className="size-3.5" />
                Conference Venue
              </span>
              <h3 className="mt-4 text-2xl font-bold text-fg sm:text-3xl">
                合肥翡翠湖迎宾馆
                <span className="ml-2 inline-block text-base font-medium text-primary">
                  3 号楼
                </span>
              </h3>
              <p className="mt-3 inline-flex items-start gap-2 text-sm text-fg-soft">
                <MapPin className="mt-0.5 size-4 shrink-0 text-fg-muted" />
                {conference.address}
              </p>
            </div>

            <div className="relative mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3">
              <div className="rounded-xl border border-black/5 bg-white/70 p-4 backdrop-blur">
                <p className="text-xs text-fg-muted">区位</p>
                <p className="mt-1 text-sm font-medium text-fg">蜀山区翡翠湖畔</p>
              </div>
              <div className="rounded-xl border border-black/5 bg-white/70 p-4 backdrop-blur">
                <p className="text-xs text-fg-muted">最近地铁</p>
                <p className="mt-1 text-sm font-medium text-fg">
                  3 号线 · 工大翡翠湖校区
                </p>
              </div>
              <div className="rounded-xl border border-black/5 bg-white/70 p-4 backdrop-blur">
                <p className="text-xs text-fg-muted">会期</p>
                <p className="mt-1 text-sm font-medium text-fg">{conference.dates}</p>
              </div>
            </div>

            <p className="relative mt-6 inline-flex items-start gap-2 rounded-xl border border-primary/15 bg-white/60 p-4 text-xs leading-relaxed text-fg-muted backdrop-blur">
              <MapIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                选择您常用的地图 App 打开实景地图。手机端可直接调起 App 进入路线规划。
              </span>
            </p>
          </div>

          {/* 右侧：四大地图 App 跳转 */}
          <div className="card-surface flex flex-col gap-5 p-5 sm:p-7">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                <Building className="size-3.5" />
                打开地图导航
              </p>
              <h3 className="mt-3 text-xl font-semibold text-fg">
                选择常用地图 App
              </h3>
              <p className="mt-2 text-sm text-fg-soft">
                覆盖中国大陆三大主流（高德 / 百度 / 腾讯）以及 iOS 用户常用的苹果地图。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
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

            <p className="mt-auto rounded-xl border border-black/5 bg-bg-alt/60 p-4 text-xs leading-relaxed text-fg-muted">
              ⓘ 三大中国地图平台均不支持无 API Key 的免费 iframe 嵌入；本页改为「关键字搜索」型跳转，由地图 App 自行定位，确保无需登录、无水印、无横纵滚动条。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
