import {
  Plane,
  TrainFront,
  Train,
  Car,
  Bus,
  CloudSun,
  Navigation,
  Info,
  Hotel,
} from 'lucide-react'
import {
  traffic,
  trafficNotes,
  venueAddress,
  weather,
  VENUE_LONLAT_GCJ02,
  VENUE_NAME,
  type TrafficInfo,
  type TrafficSubMode,
} from '@/data/traffic'
import trafficMapUrl from '@/assets/generated/traffic-map.webp'
import {
  detectPlatform,
  tryOpenInApp,
  type DeepLinkTarget,
} from '@/lib/mapDeeplink'

const SRC = 'qcfd2026'

const iconMap: Record<TrafficInfo['icon'], typeof Plane> = {
  plane: Plane,
  'train-front': TrainFront,
  train: Train,
}

const subModeMeta: Record<
  TrafficSubMode['type'],
  { Icon: typeof Plane; tone: string }
> = {
  metro: {
    Icon: Train,
    tone: 'bg-primary/10 text-primary ring-primary/15',
  },
  taxi: {
    Icon: Car,
    tone: 'bg-secondary/10 text-secondary ring-secondary/20',
  },
  mixed: {
    Icon: Bus,
    tone: 'bg-primary/10 text-primary ring-primary/15',
  },
}

/**
 * 高德路径规划深链（origin → 翡翠湖迎宾馆，t=0 驾车）。
 *
 * 文档对照：
 *   Web URI  https://lbs.amap.com/api/uri-api/guide/travel/route
 *            —— uri.amap.com/navigation?from=lon,lat,name&to=lon,lat,name&mode=car
 *   iOS      https://lbs.amap.com/api/amap-mobile/guide/ios/route
 *            —— iosamap://path?slat=&slon=&sname=&dlat=&dlon=&dname=&t=0&dev=0
 *   Android  https://lbs.amap.com/api/amap-mobile/guide/android/route
 *            —— amapuri://route/plan/?slat=&slon=&sname=&dlat=&dlon=&dname=&t=0&dev=0
 *
 * 旧版用 `https://uri.amap.com/search?keyword=合肥南站到合肥翡翠湖迎宾馆`：
 * web 端高德主站能识别"A 到 B"自然语言并跳路线规划，但 callnative 唤起 App 后，
 * App 走的是 POI 搜索接口，不识别这种自然语言 → 用户在 iPhone 上点击后
 * 落在"无搜索结果"页面。改用官方路径规划接口（Web URI + iOS path + Android route）。
 */
function routeTarget(t: TrafficInfo): DeepLinkTarget {
  const [slon, slat] = t.lonlat.split(',')
  const [dlon, dlat] = VENUE_LONLAT_GCJ02.split(',')
  const sname = encodeURIComponent(t.origin)
  const dname = encodeURIComponent(VENUE_NAME)
  const webUrl =
    `https://uri.amap.com/navigation?from=${slon},${slat},${sname}` +
    `&to=${dlon},${dlat},${dname}` +
    `&mode=car&policy=0&coordinate=gaode&src=${SRC}&callnative=1`
  return {
    webUrl,
    iosScheme:
      `iosamap://path?sourceApplication=${SRC}` +
      `&slat=${slat}&slon=${slon}&sname=${sname}` +
      `&dlat=${dlat}&dlon=${dlon}&dname=${dname}` +
      `&dev=0&t=0`,
    androidIntent:
      `intent://route/plan/?sourceApplication=${SRC}` +
      `&slat=${slat}&slon=${slon}&sname=${sname}` +
      `&dlat=${dlat}&dlon=${dlon}&dname=${dname}` +
      `&dev=0&t=0` +
      `#Intent;scheme=amapuri;package=com.autonavi.minimap;` +
      `S.browser_fallback_url=${encodeURIComponent(webUrl)};end`,
  }
}

function SubModeBlock({ m }: { m: TrafficSubMode }) {
  const { Icon, tone } = subModeMeta[m.type]
  return (
    <div className="rounded-xl border border-black/[0.06] bg-bg-alt/40 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tone}`}
        >
          <Icon className="size-3.5" />
          {m.label}
        </span>
      </div>
      {m.metrics && m.metrics.length > 0 ? (
        <dl className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs">
          {m.metrics.map((x) => (
            <div
              key={x.label}
              className="inline-flex items-baseline gap-1 rounded-md bg-white/60 px-2 py-1 ring-1 ring-black/[0.04]"
            >
              <dt className="text-fg-muted">{x.label}</dt>
              <dd className="font-medium text-fg">{x.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <p className="mt-3 text-sm leading-relaxed text-fg-soft">{m.route}</p>
      {m.tip ? (
        <p className="mt-2 inline-flex items-start gap-1.5 text-xs text-fg-muted">
          <Info className="mt-0.5 size-3.5 shrink-0 text-primary/70" />
          {m.tip}
        </p>
      ) : null}
    </div>
  )
}

export function Traffic() {
  return (
    <section id="traffic" className="section-pad">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">交通指南</span>
          <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
            <a href="#traffic" className="hover:text-primary/80 transition">从机场 / 高铁站抵达会场</a>
          </h2>
          <p className="mt-3 text-fg-soft">
            合肥有 1 个民用机场与 2 个主要火车站，均可便捷抵达翡翠湖迎宾馆。以下路线由会务组整理，里程、时长、费用为平峰估算，仅供参考。
          </p>
          <div className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-2 text-sm">
            <Hotel className="size-4 text-primary" />
            <span className="text-fg-muted">酒店地址</span>
            <span className="font-medium text-fg">{venueAddress}</span>
          </div>
        </div>

        <figure className="mx-auto mt-10 max-w-4xl rounded-2xl bg-bg-alt/40 p-1 ring-1 ring-black/[0.04]">
          <img
            src={trafficMapUrl}
            alt="合肥三大交通枢纽（新桥机场、合肥南站、合肥站）抵达翡翠湖迎宾馆的相对位置示意"
            loading="lazy"
            decoding="async"
            className="block aspect-[3/2] w-full rounded-xl object-cover"
          />
          <figcaption className="sr-only">
            合肥三大交通枢纽至翡翠湖迎宾馆的示意图（编辑插画，非实景导航图，下方各卡片含逐条路线）
          </figcaption>
        </figure>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {traffic.map((t) => {
            const Icon = iconMap[t.icon]
            return (
              <div
                key={t.origin}
                className="card-surface flex flex-col gap-5 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-fg">
                      {t.origin}
                    </h3>
                    {t.shortName ? (
                      <p className="mt-1 text-xs text-fg-muted">
                        {t.shortName} → 翡翠湖迎宾馆
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-3">
                  {t.subModes.map((m, i) => (
                    <SubModeBlock key={i} m={m} />
                  ))}
                </div>

                {(() => {
                  const target = routeTarget(t)
                  return (
                    <a
                      href={target.webUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        const p = detectPlatform()
                        // 桌面 / 微信：保持默认（target=_blank 打开 web）
                        // 移动端：拦截 + 走 iosamap://path / amapuri://route/plan/，失败再 fallback
                        if (p === 'ios' || p === 'android') {
                          e.preventDefault()
                          tryOpenInApp(target)
                        }
                      }}
                      className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                    >
                      <Navigation className="size-4" />
                      打开高德查询路线
                    </a>
                  )
                })()}
              </div>
            )
          })}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {trafficNotes.map((n, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 rounded-2xl info-tint p-4 text-sm text-fg-soft"
            >
              <Info className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{n}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl info-tint p-5 sm:flex-row sm:items-center">
          <CloudSun className="size-6 shrink-0 text-primary" />
          <p className="text-sm text-fg-soft">
            <span className="font-medium text-fg">
              {weather.city} · {weather.period}：
            </span>
            {weather.summary}
          </p>
        </div>
      </div>
    </section>
  )
}
