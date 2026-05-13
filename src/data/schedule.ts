/**
 * 会议日程
 * 出处：邀请报告完整版/会议日程v3.xlsx 「报告信息」表（2026-05-13 16:23 群内更新版）
 *       早期版本：邀请报告完整版/会议手册素材 0512.docx 第三节 + 会议日程v2.xlsx
 *       v2 → v3 主要差异：
 *         - 新增 13:55–14:20「窦猛汉 · 量超智多元融合先进计算平台及其应用」
 *         - 熊诗颖（浅水波）由下午挪至上午 11:40–12:05
 *         - 全天报告时段相应顺延 / 压缩茶歇时长以容纳第 15 个报告
 *         - 5/23 下午 15:30 吴锋「VQFEM」主持人由 牛小东 改为 熊诗颖
 *           （v3 xlsx 标“?”，2026-05-13 用户确认按熊诗颖落盘、不显示“待确认”）
 * 详见 SOURCES.md §6
 */
export type ScheduleItem = {
  time?: string
  title: string
  note?: string
  speaker?: string
  /** 标记本条开始一个新的主持时段，chair 为该时段主持人姓名 */
  chair?: string
}

export type ScheduleDay = {
  date: string
  shortDate: string
  weekday: string
  shortWeekday: string
  label: string
  items: ScheduleItem[]
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
      { time: '08:30–08:50', title: '嘉宾致辞', chair: '杨越' },
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
      { time: '10:05–10:25', title: '茶歇' },
      {
        time: '10:25–10:50',
        title: 'Towards Practical Quantum Simulation of Non-unitary Dynamics',
        speaker: '刘锦鹏',
        chair: '牛小东',
      },
      {
        time: '10:50–11:15',
        title:
          'Nearly optimal quantum simulation of slow time-dependent Hamiltonians',
        speaker: '安冬',
      },
      {
        time: '11:15–11:40',
        title: '量子流体力学中的非线性与耗散模拟算法',
        speaker: '陈昭昀',
      },
      {
        time: '11:40–12:05',
        title: '浅水波动力学的量子计算模拟',
        speaker: '熊诗颖',
      },
      { time: '12:05–13:30', title: '午餐', note: '翡翠湖迎宾馆' },
      {
        time: '13:30–13:55',
        title: '中性原子量子计算的产业化进展',
        speaker: '石志全',
        chair: '叶创超',
      },
      {
        time: '13:55–14:20',
        title: '量超智多元融合先进计算平台及其应用',
        speaker: '窦猛汉',
      },
      {
        time: '14:20–14:45',
        title: '量子科学计算平台 UnitaryLab 介绍',
        speaker: '张镭',
      },
      {
        time: '14:45–15:10',
        title: '航天空气动力学的量子-经典混合计算进展及展望',
        speaker: '许亮',
      },
      { time: '15:10–15:30', title: '茶歇' },
      {
        time: '15:30–15:55',
        title: '一种适用于固体力学分析的量典融合方法：VQFEM',
        speaker: '吴锋',
        chair: '熊诗颖',
      },
      {
        time: '15:55–16:20',
        title: '基于量子强化学习的主动流动控制',
        speaker: '唐辉',
      },
      {
        time: '16:20–16:45',
        title: '基于 Koopman 方法的非线性动力系统端到端量子模拟',
        speaker: '卢臻',
      },
      {
        time: '16:45–17:10',
        title: '湍流场的几何量子化编码',
        speaker: '孟昭远',
      },
      { time: '17:10–18:00', title: '自由讨论', chair: '杨越' },
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
      { time: '09:30–11:00', title: '参观巢湖明月' },
    ],
  },
]
