export type TrafficInfo = {
  origin: string
  distance: string
  duration: string
  notes: string[]
  icon: 'plane' | 'train-front' | 'train' | 'car'
}

export const traffic: TrafficInfo[] = [
  {
    origin: '合肥新桥国际机场（HFE）',
    distance: '约 35 km',
    duration: '约 50 分钟',
    icon: 'plane',
    notes: [
      '机场大巴：4 号线（机场—稻香楼）抵达市区后转出租车约 15 分钟',
      '出租车 / 网约车：直达迎宾馆约 130-160 元',
    ],
  },
  {
    origin: '合肥南站（高铁主站）',
    distance: '约 12 km',
    duration: '约 25 分钟',
    icon: 'train-front',
    notes: [
      '地铁 4 号线 → 5 号线 → 步行约 600 m',
      '出租车 / 网约车直达约 35-50 元',
    ],
  },
  {
    origin: '合肥站（合肥老火车站）',
    distance: '约 15 km',
    duration: '约 35 分钟',
    icon: 'train',
    notes: [
      '地铁 3 号线 → 5 号线 → 步行约 600 m',
      '出租车 / 网约车直达约 45-60 元',
    ],
  },
  {
    origin: '市区自驾',
    distance: '翡翠路 / 望江西路交口',
    duration: '导航关键词："翡翠湖迎宾馆 3 号楼"',
    icon: 'car',
    notes: [
      '迎宾馆停车场可供参会代表停放车辆',
      '建议高峰时段提前 30 分钟出发',
    ],
  },
]

export const weather = {
  city: '合肥',
  period: '5 月下旬',
  summary: '平均气温 18-28 ℃，多云间晴有时阵雨，建议携带轻便外套与雨具。',
}
