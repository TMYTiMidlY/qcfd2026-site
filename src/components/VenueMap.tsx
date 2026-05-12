import { MapPin, Navigation, Building, ExternalLink } from 'lucide-react'
import { conference } from '@/data/conference'
import { Button } from '@/components/ui/button'

const VENUE_NAME = '合肥翡翠湖迎宾馆'
const REGION = '合肥'
const SRC = 'qcfd2026'

const venue = encodeURIComponent(VENUE_NAME)
const region = encodeURIComponent(REGION)

const baiduEmbedUrl = `https://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D${venue}`

type MapTarget = {
  key: string
  label: string
  webUrl: string
  iosScheme: string
  androidIntent: string
  primary?: boolean
}

// Web URL 用法：移动端 deeplink 失败时 fallback；桌面端直接用。
// scheme/intent 用法：移动端尝试唤起原生 App（详见各家官方 LBS URI 文档）
//   - 高德    https://lbs.amap.com/api/uri-api/guide/mobile-web/poi
//   - 百度    https://lbsyun.baidu.com/index.php?title=uri/api/web
//   - 腾讯    https://lbs.qq.com/webApi/uriV1/uriGuide/uriWebSearch
const mapTargets: MapTarget[] = [
  {
    key: 'amap',
    label: '高德地图',
    primary: true,
    webUrl: `https://uri.amap.com/search?keyword=${venue}&src=${SRC}&callnative=1`,
    iosScheme: `iosamap://poi?sourceApplication=${SRC}&keywords=${venue}&dev=0`,
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
    iosScheme: `baidumap://map/place/search?query=${venue}&region=${region}&src=${SRC}`,
    androidIntent:
      `intent://map/place/search?query=${venue}&region=${region}&src=${SRC}` +
      `#Intent;scheme=baidumap;package=com.baidu.BaiduMap;` +
      `S.browser_fallback_url=${encodeURIComponent(
        `https://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D${venue}`,
      )};end`,
  },
  {
    key: 'tencent',
    label: '腾讯地图',
    webUrl: `https://map.qq.com/?ref=${SRC}&what=${venue}`,
    iosScheme: `qqmap://map/search?keyword=${venue}&referer=${SRC}`,
    androidIntent:
      `intent://map/search?keyword=${venue}&referer=${SRC}` +
      `#Intent;scheme=qqmap;package=com.tencent.map;` +
      `S.browser_fallback_url=${encodeURIComponent(
        `https://map.qq.com/?ref=${SRC}&what=${venue}`,
      )};end`,
  },
]

type Platform = 'ios' | 'android' | 'wechat' | 'desktop'

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'desktop'
  const ua = navigator.userAgent
  // WeChat 内置浏览器对 custom scheme 处理不可靠，直接走 web
  if (/MicroMessenger|WeChat/i.test(ua)) return 'wechat'
  if (/iPad|iPhone|iPod/i.test(ua)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'desktop'
}

// 三层 fallback：①App 没装 → 1.5s 后跳 web；②JS 异常 → catch 后 window.open web；
// ③JS 完全没跑 → <a href={webUrl}> 自带兜底
function tryOpenInApp(target: MapTarget): void {
  let platform: Platform = 'desktop'
  try {
    platform = detectPlatform()
  } catch {
    /* ignore */
  }

  // Android：intent:// URL 自带 S.browser_fallback_url，Chrome 原生处理 fallback
  if (platform === 'android') {
    try {
      window.location.href = target.androidIntent
      return
    } catch {
      /* fall through */
    }
  }

  // iOS：iframe 触发 scheme，setTimeout 后若页面仍可见则 App 未装，跳 web
  if (platform === 'ios') {
    try {
      const iframe = document.createElement('iframe')
      iframe.style.cssText =
        'position:absolute;width:0;height:0;border:0;visibility:hidden;'
      iframe.src = target.iosScheme
      document.body.appendChild(iframe)

      const start = Date.now()
      window.setTimeout(() => {
        try {
          iframe.parentNode?.removeChild(iframe)
        } catch {
          /* ignore */
        }
        // 如果页面仍可见且时间没过太久，说明 App 没拦截 → 打开 web
        if (Date.now() - start < 2500 && !document.hidden) {
          window.open(target.webUrl, '_blank', 'noopener,noreferrer')
        }
      }, 1500)
      return
    } catch {
      /* fall through */
    }
  }

  // 桌面 / 微信 / 任何异常路径：直接 web
  try {
    window.open(target.webUrl, '_blank', 'noopener,noreferrer')
  } catch {
    window.location.href = target.webUrl
  }
}

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
