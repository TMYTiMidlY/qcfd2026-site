/**
 * 会议日程
 * 出处：邀请报告完整版/会议日程v3.3.xlsx 「报告信息」表（2026-05-13 19:48 群内更新版，覆盖同日 19:39 v3.2 / 19:09 v3.1 / 16:23 v3）
 *       早期版本：会议日程v3.2.xlsx / v3.1.xlsx / v3.xlsx / v2.xlsx / 会议手册素材 0512.docx 第三节
 *       v2 → v3 主要差异：
 *         - 新增 13:55–14:20「窦猛汉 · 量超智多元融合先进计算平台及其应用」
 *         - 熊诗颖（浅水波）由下午挪至上午
 *         - 全天报告时段相应顺延 / 压缩茶歇时长以容纳第 15 个报告
 *         - 5/23 下午 15:30 吴锋「VQFEM」主持人由 牛小东 改为 熊诗颖
 *           （v3 xlsx 标“?”，2026-05-13 用户确认按熊诗颖落盘、不显示“待确认”）
 *       v3 → v3.1 主要差异（2026-05-13 19:09）：
 *         - 5/23 15:30 吴锋主持人「熊诗颖?」→「熊诗颖」（去问号，已确认）
 *         - 新增 5/24 上午细化时段：09:30–10:00 乘车前往 + 10:00–10:40 参观
 *       v3.1 → v3.2 主要差异（2026-05-13 19:39）：
 *         - 5/23 上午 9:15–9:40 与 9:40–10:05 互换：肖敦辉 在前、牛小东 在后
 *         - 5/23 上午茶歇后整组重排：原 [刘锦鹏 → 安冬 → 陈昭昀 → 熊诗颖]
 *           现 [陈昭昀 → 熊诗颖 → 唐辉 → 刘锦鹏]；上午茶歇后主持人时段
 *           「牛小东 主持」的首讲随之由 刘锦鹏 改为 陈昭昀
 *         - 5/23 下午 14:45–15:10 安冬 替换 许亮（许亮挪到 15:30–15:55）
 *         - 5/23 下午茶歇后整组重排：原 [吴锋 → 唐辉 → 卢臻 → 孟昭远]
 *           现 [许亮 → 卢臻 → 吴锋 → 孟昭远]；下午茶歇后主持人时段
 *           「熊诗颖 主持」的首讲随之由 吴锋 改为 许亮
 *         - 5/24 10:00–10:40 描述：原「参观巢湖明月（合肥先进计算中心）」
 *           → 「参观巢湖明月量超融合计算平台」
 *       v3.2 → v3.3 主要差异（2026-05-13 19:48）：
 *         - 5/24 10:00–10:40 单一参观时段拆分为两段：
 *             10:00–10:30 合肥先进计算中心展厅参观（了解巢湖明月与量子计算建设背景）
 *             10:30–10:40 巢湖明月主机参观（近距离感受浸没式液冷）
 *         - 新增「合肥先进计算中心」机构背景说明段，作为 5/24 day.description 渲染
 * 详见 SOURCES.md §6
 */
export type ScheduleItem = {
  time?: string
  title: string
  note?: string
  speaker?: string
  /** 标记本条开始一个新的主持时段，chair 为该时段主持人姓名 */
  chair?: string
  /** 条目类别：'visit' 参观活动；'checkin' 报到/后勤 */
  kind?: 'visit' | 'checkin'
  /** 参观时间线节点图标（lucide 图标名） */
  icon?: 'bus' | 'building-2' | 'cpu'
}

export type ScheduleDay = {
  date: string
  shortDate: string
  weekday: string
  shortWeekday: string
  label: string
  items: ScheduleItem[]
  /** 当日整体补充说明，渲染在 items 列表底部（如机构背景介绍） */
  description?: string
}

export const schedule: ScheduleDay[] = [
  {
    date: '5月22日',
    shortDate: '5/22',
    weekday: '星期五',
    shortWeekday: '周五',
    label: '会议报到',
    items: [
      { time: '14:00–21:00', title: '会议报到', note: '合肥翡翠湖迎宾馆 3 号楼', kind: 'checkin' },
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
        title: '量子混合经典数据驱动的流体降阶建模新方法及其应用',
        speaker: '肖敦辉',
      },
      {
        time: '09:40–10:05',
        title:
          '两种量子-经典混合 QLBM 研究：基于分布函数演化的多物理场耦合 QLBM & 高效优化迁移双线路非平衡线化 QLBM',
        speaker: '牛小东',
      },
      { time: '10:05–10:25', title: '茶歇' },
      {
        time: '10:25–10:50',
        title: '量子流体力学中的非线性与耗散模拟算法',
        speaker: '陈昭昀',
        chair: '牛小东',
      },
      {
        time: '10:50–11:15',
        title: '浅水波动力学的量子计算模拟',
        speaker: '熊诗颖',
      },
      {
        time: '11:15–11:40',
        title: '基于量子强化学习的主动流动控制',
        speaker: '唐辉',
      },
      {
        time: '11:40–12:05',
        title: 'Towards Practical Quantum Simulation of Non-unitary Dynamics',
        speaker: '刘锦鹏',
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
        title:
          'Nearly optimal quantum simulation of slow time-dependent Hamiltonians',
        speaker: '安冬',
      },
      { time: '15:10–15:30', title: '茶歇' },
      {
        time: '15:30–15:55',
        title: '航天空气动力学的量子-经典混合计算进展及展望',
        speaker: '许亮',
        chair: '熊诗颖',
      },
      {
        time: '15:55–16:20',
        title: '基于 Koopman 方法的非线性动力系统端到端量子模拟',
        speaker: '卢臻',
      },
      {
        time: '16:20–16:45',
        title: '一种适用于固体力学分析的量典融合方法：VQFEM',
        speaker: '吴锋',
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
      { time: '09:30–10:00', title: '乘车前往巢湖明月', note: '合肥先进计算中心', kind: 'visit', icon: 'bus' },
      {
        time: '10:00–10:30',
        title: '合肥先进计算中心展厅参观',
        note: '了解巢湖明月与量子计算建设背景',
        kind: 'visit',
        icon: 'building-2',
      },
      {
        time: '10:30–10:40',
        title: '巢湖明月主机参观',
        note: '近距离感受浸没式液冷',
        kind: 'visit',
        icon: 'cpu',
      },
    ],
    description:
      '合肥先进计算中心，又名「合肥综合性国家科学中心先进计算交叉研究与公共服务平台（合肥先进计算中心）一期项目（信息化建设部分）」，其中主机系统名称「巢湖明月」由安徽省委常委、合肥市委书记虞爱华命名。中心以「立足合肥市、面向安徽省、辐射长三角」为服务目标，算力直接服务于合肥综合性国家科学中心的大科学装置与大科学应用，是合肥综合性国家科学中心的「科学大脑」，为安徽省各重点领域的科技创新与战略性新兴产业升级提供支撑，亦是安徽省、合肥市战新产业的「产业创新平台」；中心后续还将建设部署三套量子计算机，实现量子计算与先进计算的协同发展。',
  },
]
