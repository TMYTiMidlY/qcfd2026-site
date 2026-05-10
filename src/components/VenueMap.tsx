import { MapPin, Navigation, Building } from 'lucide-react'
import { conference } from '@/data/conference'
import { Button } from '@/components/ui/button'

export function VenueMap() {
  const query = encodeURIComponent('合肥翡翠湖迎宾馆')
  const amapEmbed = `https://uri.amap.com/marker?keywords=${query}&name=合肥翡翠湖迎宾馆&callnative=0`
  const amapJump = `https://uri.amap.com/search?keyword=${query}&src=qcfd2026&callnative=1`
  const baiduJump = `https://map.baidu.com/search/${query}`

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
          <div className="card-surface relative overflow-hidden">
            <iframe
              title="会场地图"
              src={amapEmbed}
              className="aspect-[16/10] w-full"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="card-surface flex flex-col gap-6 p-7">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                <Building className="size-3.5" />
                场地信息
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-fg">
                {conference.venue}
              </h3>
              <p className="mt-2 inline-flex items-start gap-2 text-sm text-fg-soft">
                <MapPin className="mt-0.5 size-4 shrink-0 text-fg-muted" />
                {conference.address}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-black/5 bg-bg-alt/70 p-4">
                <p className="text-xs text-fg-muted">主会场</p>
                <p className="mt-1 text-sm font-medium text-fg">3 号楼会议厅</p>
              </div>
              <div className="rounded-xl border border-black/5 bg-bg-alt/70 p-4">
                <p className="text-xs text-fg-muted">会期</p>
                <p className="mt-1 text-sm font-medium text-fg">
                  {conference.dates}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="sm">
                <a href={amapJump} target="_blank" rel="noreferrer">
                  <Navigation className="size-4" />
                  高德地图导航
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
              >
                <a href={baiduJump} target="_blank" rel="noreferrer">
                  百度地图查看
                </a>
              </Button>
            </div>

            <div className="rounded-xl border border-black/5 bg-bg-alt/60 p-4 text-xs leading-relaxed text-fg-muted">
              ⓘ 地图链接走「关键字搜索」，由地图 App 自行定位；如需精确导航请以 App 内实时定位为准。
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
