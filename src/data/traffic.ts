/**
 * 交通指南
 * 出处：会务组提供的官方《合肥翡翠湖迎宾馆会议交通指南》（2026-05-11）
 *
 * 关键背景：
 *   - 翡翠湖迎宾馆位于合肥市经济技术开发区容成路 1 号（翡翠路与望江西路交口附近）
 *   - 离最近地铁站「工大翡翠湖校区」（合肥地铁 3 号线）出站后可步行或换 607 路
 *   - 时长 / 里程 / 费用为平峰估算，仅供参考
 */

export type TrafficMetric = { label: string; value: string }

export type TrafficSubMode = {
  type: 'metro' | 'taxi' | 'mixed'
  label: string
  route: string
  metrics?: TrafficMetric[]
  tip?: string
}

export type TrafficInfo = {
  origin: string
  shortName?: string
  icon: 'plane' | 'train-front' | 'train'
  /**
   * 起点 GCJ-02 经纬度（高德 / 腾讯地图坐标系），格式 `lon,lat`。
   * 用于高德路径规划 `iosamap://path` / `amapuri://route/plan/` deeplink 中
   * 的 slat / slon 字段；web fallback `https://uri.amap.com/navigation`
   * 也以此填入 from。
   *
   * 数据来源：OSM Nominatim WGS84 → 通过 GCJ-02 标准偏移公式转换（2026-05-12）。
   */
  lonlat: string
  subModes: TrafficSubMode[]
}

/**
 * 终点：合肥翡翠湖迎宾馆 GCJ-02 经纬度（lon,lat）。
 * OSM Nominatim 查询「合肥翡翠湖迎宾馆」 WGS84 (117.184346, 31.774548) → GCJ-02 转换。
 */
export const VENUE_LONLAT_GCJ02 = '117.189875,31.772617'
export const VENUE_NAME = '合肥翡翠湖迎宾馆'

export const traffic: TrafficInfo[] = [
  {
    origin: '合肥南站',
    shortName: '高铁主站',
    icon: 'train-front',
    lonlat: '117.290119,31.800250',
    subModes: [
      {
        type: 'metro',
        label: '地铁出行',
        route:
          '合肥南站乘坐轨道交通 4 号线（青龙岗方向），至图书馆站换乘轨道交通 3 号线（幸福坝方向），至工大翡翠湖校区站下车；出站后步行至公交站换乘 607 路公交，至丹翡路口站下车，步行约 5 分钟抵达酒店。',
      },
      {
        type: 'taxi',
        label: '打车出行',
        route: '直接导航搜索“合肥翡翠湖迎宾馆”，途经龙川路、容成路，路线顺畅。',
        metrics: [
          { label: '里程', value: '约 11.9 km' },
          { label: '时长', value: '平峰 25-30 min · 高峰 35-40 min' },
          { label: '费用', value: '¥25-30' },
        ],
        tip: '常规网约车 / 出租车均可，无高速费。',
      },
    ],
  },
  {
    origin: '合肥站',
    shortName: '合肥老火车站',
    icon: 'train',
    lonlat: '117.315382,31.883356',
    subModes: [
      {
        type: 'metro',
        label: '地铁出行',
        route:
          '合肥火车站乘坐轨道交通 3 号线（幸福坝方向），至工大翡翠湖校区站下车；出站后步行至公交站换乘 607 路公交，至丹翡路口站下车，步行约 5 分钟抵达酒店。',
        metrics: [{ label: '时长', value: '约 1 小时 9 分钟' }],
      },
      {
        type: 'taxi',
        label: '打车出行',
        route: '途经北一环路、南二环路、容成路，避开拥堵路段更省时。',
        metrics: [
          { label: '里程', value: '约 23.6 km' },
          { label: '时长', value: '平峰 30-35 min · 高峰 40-45 min' },
          { label: '费用', value: '¥35-40' },
        ],
        tip: '常规网约车 / 出租车均可，无高速费。',
      },
    ],
  },
  {
    origin: '合肥新桥国际机场',
    shortName: 'HFE',
    icon: 'plane',
    lonlat: '116.973083,31.986186',
    subModes: [
      {
        type: 'mixed',
        label: '地铁 + 巴士',
        route:
          '新桥国际机场乘坐机场巴士 1 号线，至西七里塘站下车，换乘轨道交通 3 号线（幸福坝方向），至工大翡翠湖校区站下车；出站后步行至公交站换乘 607 路公交，至丹翡路口站下车，步行约 5 分钟抵达酒店。',
        metrics: [
          { label: '时长', value: '约 1 小时 52 分钟' },
          { label: '费用', value: '约 ¥30（机场巴士 + 地铁）' },
        ],
      },
      {
        type: 'taxi',
        label: '打车出行',
        route: '走机场高速、方兴大道快速路，直达酒店，是机场出行最便捷方式。',
        metrics: [
          { label: '里程', value: '约 38 km' },
          { label: '时长', value: '平峰 35-40 min · 高峰 45-50 min' },
          { label: '费用', value: '¥60-70' },
        ],
      },
    ],
  },
]

export const trafficNotes: string[] = [
  '以上打车费用为平峰时段预估，早晚高峰、夜间或节假日费用可能略有上浮，仅供参考。',
  '地铁 / 公交出行建议预留充足时间，避免因换乘、候车耽误行程；携带大件行李推荐选择打车方式，更便捷省心。',
]

export const venueAddress = '合肥市经济技术开发区容成路 1 号 · 翡翠湖迎宾馆'

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
