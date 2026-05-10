export type ScheduleDay = {
  date: string
  weekday: string
  label: string
  items: { time?: string; title: string; note?: string }[]
}

export const schedule: ScheduleDay[] = [
  {
    date: '5月22日',
    weekday: '星期五',
    label: '会议报到',
    items: [
      { time: '全天', title: '参会代表报到', note: '合肥翡翠湖迎宾馆 3 号楼大堂' },
      { time: '晚间', title: '组委会内部协调与场地预备' },
    ],
  },
  {
    date: '5月23日',
    weekday: '星期六',
    label: '学术报告',
    items: [
      { time: '上午', title: '开幕式 · 特邀报告', note: '由会议主席与组委会代表致辞，特邀嘉宾作大会报告' },
      { time: '上午下半场', title: '专题报告：流体方程的量子算法' },
      { time: '下午', title: '专题报告：量子机器学习与流体力学' },
      { time: '下午下半场', title: '专题报告：硬件实现与产业化进展' },
      { time: '晚间', title: '青年论坛 / 自由交流' },
    ],
  },
  {
    date: '5月24日',
    weekday: '星期日',
    label: '参观与离会',
    items: [
      { time: '上午', title: '组织参观（详细安排另行通知）' },
      { time: '中午起', title: '代表陆续离会' },
    ],
  },
]
