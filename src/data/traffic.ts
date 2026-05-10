/**
 * 交通指南
 * 出处：详见 SOURCES.md §9
 *
 * 上一版（仅 4 张空骨架卡 + 单按钮）保守过头：所有距离/时长/费用/地铁/机场大巴
 * 都是从公开资料可查的，本版查百度百科、Wikipedia 合肥地铁词条等补回。
 *
 * 数据查询日期：2026-05-10
 *
 * 关键背景：
 *   - 翡翠湖迎宾馆位于翡翠路与望江西路交口（蜀山区）
 *   - 离最近地铁站「工大翡翠湖校区」（合肥地铁 3 号线）步行约 10-15 分钟
 *   - S1 线（机场专线）计划 2026 年 7 月通车，会议期间（5 月）尚未投入使用
 *
 * 距离/时长/费用为公开资料综合估算，仅供参考；实际请以地图 App 实时查询为准
 */
export type TrafficInfo = {
  origin: string
  distance: string
  duration: string
  notes: string[]
  amapKeyword: string
  icon: 'plane' | 'train-front' | 'train' | 'car'
}

export const traffic: TrafficInfo[] = [
  {
    origin: '合肥新桥国际机场（HFE）',
    distance: '约 38-42 km',
    duration: '驾车约 50-65 分钟',
    notes: [
      '出租 / 网约车：约 ¥100-150（高峰期可能更高）',
      '机场大巴四号线途经天鹅湖大酒店、黄山路皇冠假日、十里庙，可在十里庙下车后打车约 10 分钟到达',
      '⚠️ 地铁 S1 机场专线计划 2026 年 7 月通车，会议期间尚未开通',
    ],
    amapKeyword: '合肥新桥国际机场到合肥翡翠湖迎宾馆',
    icon: 'plane',
  },
  {
    origin: '合肥南站（高铁主站）',
    distance: '约 20-25 km',
    duration: '驾车约 30-45 分钟',
    notes: [
      '出租 / 网约车：约 ¥40-60',
      '地铁：4 号线 → 图书馆站换乘 3 号线 → 工大翡翠湖校区站，全程约 35-50 分钟，下车步行约 10-15 分钟',
    ],
    amapKeyword: '合肥南站到合肥翡翠湖迎宾馆',
    icon: 'train-front',
  },
  {
    origin: '合肥站（合肥老火车站）',
    distance: '约 12-16 km',
    duration: '驾车约 25-35 分钟',
    notes: [
      '出租 / 网约车：约 ¥25-45',
      '地铁：3 号线一站直达，至工大翡翠湖校区站约 50-60 分钟（站点较多，打车通常更快）',
    ],
    amapKeyword: '合肥站到合肥翡翠湖迎宾馆',
    icon: 'train',
  },
  {
    origin: '市区自驾',
    distance: '—',
    duration: '—',
    notes: [
      '导航关键词：翡翠湖迎宾馆 3 号楼',
      '迎宾馆内部停车场可供参会代表停放',
    ],
    amapKeyword: '合肥翡翠湖迎宾馆',
    icon: 'car',
  },
]

/**
 * 合肥 5 月气候均值
 * 出处：中国气象局 1991-2020 年气候常态值（经 Wikipedia 合肥词条引用核实）
 *   https://en.wikipedia.org/wiki/Hefei#Climate
 */
export const weather = {
  city: '合肥',
  period: '5 月气候均值',
  summary:
    '日均最高 27.1 ℃ / 最低 17.8 ℃，月均降水 90 mm（约 10 日），早晚温差 ~9 ℃。5 月下旬已临近梅雨季前夕，建议携带轻薄雨具与一件薄外套。',
} as const
