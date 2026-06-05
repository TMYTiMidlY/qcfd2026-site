/**
 * 顶部右侧的"会议方最新通告"通知栈
 *
 * 状态（2026-05-28 以后）：
 *   会议已于 2026-05-24 结束，会议期间的"参会福利 / 注册答疑 / 行程通告"
 *   等 pinned 提醒已失去时效性，统一不再浮出右上角弹窗（即使本机
 *   localStorage 没有 dismiss 记录的新访客也不再看到）。
 *   历史条目仍保留在新闻区 news.ts 中作归档。
 *
 *   组件目前是空壳；若未来再办会议需要恢复浮窗，从 git history 找回
 *   旧实现（含 useState / useEffect / localStorage dismiss / 入场动画
 *   / NewsDetailDialog 联动）即可。
 */
export function Notifications() {
  return null
}
