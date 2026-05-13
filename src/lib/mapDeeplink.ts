/**
 * 三大地图（高德 / 百度 / 腾讯）跨平台 deeplink 工具。
 *
 * 设计：每个跳转目标提供三类 URL — Web URL + iOS scheme + Android intent。
 * `tryOpenInApp` 自动按平台挑选并触发；App 未装或异常时自动 fallback 到 Web。
 *
 * 支持平台来源：navigator.userAgent
 *   - WeChat 内置浏览器对 custom scheme 处理不稳，直接走 web
 *   - iOS Safari / Chrome 用 iframe 触发 scheme + setTimeout 探测
 *   - Android Chrome / WebView 用 intent:// URL，原生支持 S.browser_fallback_url
 *
 * 使用：
 *   const target: DeepLinkTarget = { webUrl, iosScheme, androidIntent }
 *   <a href={target.webUrl} onClick={(e) => {
 *     const p = detectPlatform()
 *     if (p === 'ios' || p === 'android') { e.preventDefault(); tryOpenInApp(target) }
 *   }} />
 */

export type Platform = 'ios' | 'android' | 'wechat' | 'desktop'

export type DeepLinkTarget = {
  webUrl: string
  iosScheme: string
  androidIntent: string
}

export function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'desktop'
  const ua = navigator.userAgent
  if (/MicroMessenger|WeChat/i.test(ua)) return 'wechat'
  if (/iPad|iPhone|iPod/i.test(ua)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'desktop'
}

// 三层 fallback：①App 没装 → 1.5 s 后跳 web；②JS 异常 → catch 后 window.open web；
// ③JS 完全没跑 → <a href={webUrl}> 自带兜底
export function tryOpenInApp(target: DeepLinkTarget): void {
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
