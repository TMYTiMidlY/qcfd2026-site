import { MapPin, Navigation, Building, ExternalLink, QrCode } from 'lucide-react'
import { conference } from '@/data/conference'
import { Button } from '@/components/ui/button'

export function VenueMap() {
  const query = encodeURIComponent('合肥翡翠湖迎宾馆')
  const amapJump = `https://uri.amap.com/search?keyword=${query}&src=qcfd2026&callnative=1`
  const baiduJump = `https://map.baidu.com/search/${query}`
  const tencentJump = `https://apis.map.qq.com/tools/poimarker?keyword=${query}&referer=qcfd2026`

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

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* 左侧：场地速览大卡 */}
          <div className="card-surface relative flex flex-col justify-between overflow-hidden p-8">
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
              <h3 className="mt-4 text-2xl font-bold text-fg md:text-3xl">
                合肥翡翠湖迎宾馆
                <span className="ml-2 text-base font-medium text-primary">3 号楼</span>
              </h3>
              <p className="mt-3 inline-flex items-start gap-2 text-sm text-fg-soft">
                <MapPin className="mt-0.5 size-4 shrink-0 text-fg-muted" />
                {conference.address}
              </p>
            </div>

            <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-black/5 bg-white/70 p-4 backdrop-blur">
                <p className="text-xs text-fg-muted">区位</p>
                <p className="mt-1 text-sm font-medium text-fg">蜀山区翡翠湖畔</p>
              </div>
              <div className="rounded-xl border border-black/5 bg-white/70 p-4 backdrop-blur">
                <p className="text-xs text-fg-muted">最近地铁</p>
                <p className="mt-1 text-sm font-medium text-fg">3 号线工大翡翠湖校区</p>
              </div>
              <div className="rounded-xl border border-black/5 bg-white/70 p-4 backdrop-blur">
                <p className="text-xs text-fg-muted">会期</p>
                <p className="mt-1 text-sm font-medium text-fg">{conference.dates}</p>
              </div>
            </div>

            <p className="relative mt-6 inline-flex items-start gap-2 rounded-xl border border-primary/15 bg-white/60 p-4 text-xs leading-relaxed text-fg-muted backdrop-blur">
              <QrCode className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                直接在右侧选择常用地图 App 打开实景地图与路线规划。
                建议在手机端使用导航 App 获取实时路况。
              </span>
            </p>
          </div>

          {/* 右侧：导航跳转 */}
          <div className="card-surface flex flex-col gap-5 p-7">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                <Building className="size-3.5" />
                打开地图导航
              </p>
              <h3 className="mt-3 text-xl font-semibold text-fg">
                选择常用地图 App
              </h3>
              <p className="mt-2 text-sm text-fg-soft">
                选择您常用的地图平台，前往实景地图查看与路线规划。
              </p>
            </div>

            <div className="grid gap-3">
              <Button asChild size="lg" className="justify-start">
                <a href={amapJump} target="_blank" rel="noreferrer">
                  <Navigation className="size-4" />
                  在高德地图中打开
                  <ExternalLink className="ml-auto size-4 opacity-60" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="justify-start">
                <a href={baiduJump} target="_blank" rel="noreferrer">
                  <Navigation className="size-4" />
                  在百度地图中打开
                  <ExternalLink className="ml-auto size-4 opacity-60" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="justify-start">
                <a href={tencentJump} target="_blank" rel="noreferrer">
                  <Navigation className="size-4" />
                  在腾讯地图中打开
                  <ExternalLink className="ml-auto size-4 opacity-60" />
                </a>
              </Button>
            </div>

            <p className="mt-auto rounded-xl border border-black/5 bg-bg-alt/60 p-4 text-xs leading-relaxed text-fg-muted">
              ⓘ 三大地图平台均不支持无 API Key 的免费 iframe 嵌入；本页改为「关键字搜索」型跳转，由地图 App 自行定位，确保无需登录、无水印、无横纵滚动条。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
