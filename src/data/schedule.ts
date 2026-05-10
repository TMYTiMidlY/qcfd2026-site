/**
 * 会议日程
 * 出处：二轮通知 docx 第二节（仅 3 行）；详见 SOURCES.md §6
 * 详细时段安排待第二轮通知公布
 */
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
      { time: '全天', title: '参会代表报到', note: '合肥翡翠湖迎宾馆 3 号楼' },
    ],
  },
  {
    date: '5月23日',
    weekday: '星期六',
    label: '学术会议',
    items: [
      { title: '学术会议', note: '具体时段、报告顺序与休息安排请以第二轮通知为准' },
    ],
  },
  {
    date: '5月24日',
    weekday: '星期日',
    label: '参观与离会',
    items: [
      { title: '参观、离会', note: '具体安排另行通知' },
    ],
  },
]
