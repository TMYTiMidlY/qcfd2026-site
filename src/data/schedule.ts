/**
 * 会议日程
 * 出处：邀请报告完整版/会议手册素材.docx 第三节「会议日程」 +
 *       邀请报告完整版/会议日程v2.xlsx 「报告信息」表（两份内容一致）
 * 详见 SOURCES.md §6
 */
export type ScheduleDay = {
  date: string
  shortDate: string
  weekday: string
  shortWeekday: string
  label: string
  items: { time?: string; title: string; note?: string; speaker?: string }[]
}

export const schedule: ScheduleDay[] = [
  {
    date: '5月22日',
    shortDate: '5/22',
    weekday: '星期五',
    shortWeekday: '周五',
    label: '会议报到',
    items: [
      { time: '14:00–21:00', title: '会议报到', note: '合肥翡翠湖迎宾馆 3 号楼' },
      { time: '17:30–20:00', title: '晚餐', note: '翡翠湖迎宾馆' },
    ],
  },
  {
    date: '5月23日',
    shortDate: '5/23',
    weekday: '星期六',
    shortWeekday: '周六',
    label: '学术会议',
    items: [
      { time: '08:30–08:50', title: '嘉宾致辞', note: '主持：杨越' },
      {
        time: '08:50–09:15',
        title: '面向复合材料与结构的量子计算增强数据驱动计算力学',
        speaker: '胡衡',
      },
      {
        time: '09:15–09:40',
        title:
          '两种量子-经典混合 QLBM 研究：基于分布函数演化的多物理场耦合 QLBM & 高效优化迁移双线路非平衡线化 QLBM',
        speaker: '牛小东',
      },
      {
        time: '09:40–10:05',
        title: '量子混合经典数据驱动的流体降阶建模新方法及其应用',
        speaker: '肖敦辉',
      },
      { time: '10:05–10:35', title: '茶歇' },
      {
        time: '10:35–11:00',
        title: 'Towards Practical Quantum Simulation of Non-unitary Dynamics',
        speaker: '刘锦鹏',
        note: '主持：刘锦鹏',
      },
      {
        time: '11:00–11:25',
        title:
          'Nearly optimal quantum simulation of slow time-dependent Hamiltonians',
        speaker: '安冬',
      },
      {
        time: '11:25–11:50',
        title: '量子流体力学中的非线性与耗散模拟算法',
        speaker: '陈昭昀',
      },
      { time: '11:50–13:30', title: '午餐', note: '翡翠湖迎宾馆' },
      {
        time: '13:30–13:55',
        title: '中性原子量子计算的产业化进展',
        speaker: '石志全',
        note: '主持：叶创超',
      },
      {
        time: '13:55–14:20',
        title: '量子科学计算平台 UnitaryLab 介绍',
        speaker: '张镭',
      },
      {
        time: '14:20–14:45',
        title: '航天空气动力学的量子-经典混合计算进展及展望',
        speaker: '许亮',
      },
      { time: '14:45–15:15', title: '茶歇' },
      {
        time: '15:15–15:40',
        title: '一种适用于固体力学分析的量典融合方法：VQFEM',
        speaker: '吴锋',
        note: '主持：牛小东',
      },
      {
        time: '15:40–16:05',
        title: '基于量子强化学习的主动流动控制',
        speaker: '唐辉',
      },
      {
        time: '16:05–16:30',
        title: '浅水波动力学的量子计算模拟',
        speaker: '熊诗颖',
      },
      {
        time: '16:30–16:55',
        title: '基于 Koopman 方法的非线性动力系统端到端量子模拟',
        speaker: '卢臻',
      },
      {
        time: '16:55–17:20',
        title: '湍流场的几何量子化编码',
        speaker: '孟昭远',
      },
      { time: '17:20–18:00', title: '自由讨论', note: '主持：杨越' },
      { time: '18:00–20:00', title: '晚餐', note: '翡翠湖迎宾馆' },
    ],
  },
  {
    date: '5月24日',
    shortDate: '5/24',
    weekday: '星期日',
    shortWeekday: '周日',
    label: '参观与离会',
    items: [
      { title: '参观、离会', note: '具体安排另行通知' },
    ],
  },
]
