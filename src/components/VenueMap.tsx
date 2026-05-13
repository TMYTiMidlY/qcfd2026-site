import { useState } from 'react'
import { MapPin, Navigation, Building, ExternalLink } from 'lucide-react'
import { conference } from '@/data/conference'
import { Button } from '@/components/ui/button'
import {
  detectPlatform,
  tryOpenInApp,
  type DeepLinkTarget,
} from '@/lib/mapDeeplink'

const VENUE_NAME = '合肥翡翠湖迎宾馆'
const REGION = '合肥'
// 通用 src（高德要求"appname"形式；腾讯 referer 兼容字符串）
const SRC = 'qcfd2026'
// 百度官方文档要求 src 格式：iOS = ios.<company>.<app>，Android = andr.<company>.<app>
// https://lbsyun.baidu.com/faq/api?title=webapi/uri/ios -> 通用参数 src
const BAIDU_SRC_IOS = 'ios.qcfd2026.web'
const BAIDU_SRC_ANDR = 'andr.qcfd2026.web'

const venue = encodeURIComponent(VENUE_NAME)
const region = encodeURIComponent(REGION)

const baiduEmbedUrl = `https://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D${venue}`

type MapTarget = DeepLinkTarget & {
  key: string
  label: string
  primary?: boolean
}

// 各家官方 LBS URI 文档（已核对参数名，2024-08 / 2023-10 版本）：
//   高德 iOS    https://lbs.amap.com/api/amap-mobile/guide/ios/search       —— iosamap://poi?...&name=POI名&dev=0   (必填: name)
//   高德 Android https://lbs.amap.com/api/amap-mobile/guide/android/search  —— androidamap://poi?...&keywords=...&dev=0
//   高德 Web URI https://lbs.amap.com/api/uri-api/guide/mobile-web/poi      —— uri.amap.com/marker 或 search?keyword=
//   百度 iOS    https://lbsyun.baidu.com/faq/api?title=webapi/uri/ios      —— baidumap://map/place/search?query=...&region=...&src=ios.<co>.<app>
//   百度 Android https://lbsyun.baidu.com/faq/api?title=webapi/uri/andriod —— baidumap://map/place/search?query=...&src=andr.<co>.<app>
//   腾讯       https://lbs.qq.com/webApi/uriV1/uriGuide/uriMobileMarker    —— qqmap://map/marker 标记单点；search 路径属社区惯用法（referer 任意字符串实测可用）
//   腾讯 Web URI https://apis.map.qq.com/uri/v1/search?keyword=...&referer=...
const mapTargets: MapTarget[] = [
  {
    key: 'amap',
    label: '高德地图',
    primary: true,
    webUrl: `https://uri.amap.com/search?keyword=${venue}&src=${SRC}&callnative=1`,
    // iOS 文档要求 name（不是 keywords！keywords 是 Android 端字段，iOS 端会被忽略 → App 落到首页）
    iosScheme: `iosamap://poi?sourceApplication=${SRC}&name=${venue}&dev=0`,
    androidIntent:
      `intent://poi?sourceApplication=${SRC}&keywords=${venue}&dev=0` +
      `#Intent;scheme=androidamap;package=com.autonavi.minimap;` +
      `S.browser_fallback_url=${encodeURIComponent(
        `https://uri.amap.com/search?keyword=${venue}&src=${SRC}`,
      )};end`,
  },
  {
    key: 'baidu',
    label: '百度地图',
    webUrl: `https://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D${venue}`,
    iosScheme: `baidumap://map/place/search?query=${venue}&region=${region}&src=${BAIDU_SRC_IOS}`,
    androidIntent:
      `intent://map/place/search?query=${venue}&region=${region}&src=${BAIDU_SRC_ANDR}` +
      `#Intent;scheme=baidumap;package=com.baidu.BaiduMap;` +
      `S.browser_fallback_url=${encodeURIComponent(
        `https://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D${venue}`,
      )};end`,
  },
  {
    key: 'tencent',
    label: '腾讯地图',
    // Web 用官方 URI API（apis.map.qq.com/uri/v1/search），map.qq.com 首页非官方接口
    webUrl: `https://apis.map.qq.com/uri/v1/search?keyword=${venue}&referer=${SRC}`,
    iosScheme: `qqmap://map/search?keyword=${venue}&referer=${SRC}`,
    androidIntent:
      `intent://map/search?keyword=${venue}&referer=${SRC}` +
      `#Intent;scheme=qqmap;package=com.tencent.map;` +
      `S.browser_fallback_url=${encodeURIComponent(
        `https://apis.map.qq.com/uri/v1/search?keyword=${venue}&referer=${SRC}`,
      )};end`,
  },
]

export function VenueMap() {
  // facade 模式（仅桌面端）：用户主动点击才加载真正的百度地图 iframe。
  // 桌面端百度地图加载后会弹出人机验证 captcha 并自动 focus 其 input，
  // 浏览器随即触发 scroll-into-view 把视口拉到 iframe 处，把用户从其
  // 他位置吸过来——这是 iframe 内部行为，外部无法拦截。
  // 移动端（百度地图移动版不弹这个验证）保持自动加载，体验更顺。
  const [mapActivated, setMapActivated] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 1023px)').matches
  })

  return (
    <section id="venue" className="section-pad">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">会议地点</span>
          <h2 className="mt-3 text-3xl font-bold text-fg md:text-4xl">
            <a href="#venue" className="hover:text-primary/80 transition">合肥翡翠湖迎宾馆</a>
          </h2>
          <p className="mt-3 text-fg-soft">
            位于合肥翡翠湖畔，环境安静、配套完善。3 号楼为本次会议的主会场所在地。
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl">
          <img
            src="/generated/venue-hefei.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full object-cover mask-fade-bottom-soft"
          />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-6">
          {/* 左侧：百度地图（桌面端 facade 模式，点击后才加载；移动端自动加载） */}
          <div className="card-surface overflow-hidden">
            {mapActivated ? (
              <iframe
                src={baiduEmbedUrl}
                title="百度地图：合肥翡翠湖迎宾馆"
                sandbox="allow-scripts allow-same-origin allow-popups"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/3] w-full border-0 sm:aspect-[16/10] lg:aspect-auto lg:h-[520px]"
              />
            ) : (
              <button
                type="button"
                onClick={() => setMapActivated(true)}
                className="group flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-bg-alt/40 to-bg-alt/80 transition hover:from-bg-alt/60 hover:to-bg-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/60 sm:aspect-[16/10] lg:aspect-auto lg:h-[520px]"
              >
                <div className="grid size-14 place-items-center rounded-2xl bg-white/80 ring-1 ring-black/5 transition group-hover:bg-white">
                  <MapPin className="size-7 text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-fg">点击加载百度地图</span>
              </button>
            )}
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
              <div className="mt-3 flex flex-wrap gap-2.5">
                {mapTargets.map((m) => (
                  <Button
                    key={m.key}
                    asChild
                    size="default"
                    variant={m.primary ? 'default' : 'outline'}
                  >
                    <a
                      href={m.webUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        const p = detectPlatform()
                        // 桌面 / 微信：保持默认（target=_blank 打开 web）
                        // 移动端：拦截 + 走 deeplink，失败再 fallback
                        if (p === 'ios' || p === 'android') {
                          e.preventDefault()
                          tryOpenInApp(m)
                        }
                      }}
                    >
                      <Navigation className="size-4" />
                      在{m.label}中打开
                      <ExternalLink className="size-3.5 opacity-60" />
                    </a>
                  </Button>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-fg-muted">
                移动端会优先尝试唤起对应 App，未安装则自动打开 web 版。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
