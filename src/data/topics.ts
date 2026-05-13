/**
 * 议题方向（仅作展示性概览，不对单位讲者做强分类）
 *
 * 出处：详见仓库根 SOURCES.md §2
 *  - 6 个方向标题 = 二轮通知 docx 第一段 + 公众号预告（合并去重）+ 用户重组
 *  - description / keywords 由本届报告人 abstract 群体归纳
 *
 * 2026-05-13 调整：
 *  - 移除每个方向下「相关报告人」映射 —— 多位讲者天然跨多方向，强归类反而失真
 *  - 这里只描述「方向是什么、本届都覆盖了哪些代表性技术词」，不再点名归属
 *  - 关键词只保留高置信度 chip：每位讲者的核心方法至少落进 1 条，但不过度展开
 *  - 完整报告人列表 → SpeakerGrid；具体场次 → Schedule
 */
export type Topic = {
  title: string
  /** 一段较长的方向说明，2-3 句，对该方向涵盖的算法/方法/路线做归纳 */
  description: string
  icon:
    | 'atom'
    | 'brain'
    | 'cpu'
    | 'waves'
    | 'sigma'
    | 'network'
    | 'boxes'
  /** 该方向涉及的高置信度技术词 / 主题词，UI 渲染为 chip */
  keywords: string[]
}

export const topics: Topic[] = [
  {
    title: '流体方程的量子算法与量子-经典混合算法',
    description:
      'Navier-Stokes、玻尔兹曼、涡量-流函数等核心方程的量子求解是 QCFD 的算法主战场。本方向涵盖 LCHS（Linear Combination of Hamiltonian Simulation）算法族对非酉动力学的统一处理、面向不可压复杂流动的量子-经典混合 QLBM，以及变分量子非线性求解器与围道积分矩阵分解等代表性算法路线。',
    icon: 'sigma',
    keywords: ['LCHS', 'QLBM', '变分量子求解', '非酉演化', '薛定谔化'],
  },
  {
    title: '量子计算与人工智能/机器学习赋能流体力学',
    description:
      '把变分量子电路嫁接到强化学习、降阶建模、特征提取等任务上，让"量子算力"和"AI 范式"在流体场景里互相赋能。本方向涵盖量子强化学习用于主动流动控制，以及 VQSVD + 量子化 LSTM、QPOD + QDKL 等量子降阶模型在流场预测和湍流分析上的应用。',
    icon: 'brain',
    keywords: ['量子强化学习', 'VQSVD', 'QLSTM', 'QPOD', 'QDKL'],
  },
  {
    title: '流体量子模拟的硬件实现',
    description:
      '算法的优势最终要兑现到真实硬件上。本方向关注中性原子量子计算的产业化路线（万比特规模化、双核架构与商业落地），量子操作系统与 CPU/GPU/QPU 异构协同调度，以及面向硬件约束的 QLBM 等流体量子算法的电路深度与资源开销优化。',
    icon: 'cpu',
    keywords: ['中性原子', '量子操作系统', 'CPU/GPU/QPU 协同', 'ParaShift'],
  },
  {
    title: '非线性动力学的量子模拟',
    description:
      '量子门是线性幺正的，而流体本质是非线性耗散——如何把非线性、非幺正过程"翻译"到量子计算可执行的线性幺正框架，是 QCFD 的根本矛盾。本方向涵盖基于 Koopman 理论的全局线性化、面向慢变 Hamiltonian 的近最优算法，以及围道积分将非厄米传播子分解为厄米组合的统一处理。',
    icon: 'waves',
    keywords: ['Koopman 线性化', '慢变 Hamiltonian', '非厄米演化', '围道积分'],
  },
  {
    title: '流体方程量子求解的具体实现',
    description:
      '从抽象算法走向具体方程的端到端实现：包括量子态制备、Hamiltonian 模拟、信息提取、电路构造与硬件验证。本方向覆盖浅水波 / 钱塘江潮波、航天空气动力学控制方程、二维与三维 QLBM 基准流动，以及湍流场的几何编码与大规模量子模拟。',
    icon: 'atom',
    keywords: ['浅水波', 'Madelung 变换', '谱方法 VQS', '哈密顿模拟', 'QLBM 基准验证', '湍流几何编码'],
  },
  {
    title: '面向固体力学/材料力学的量子计算延伸',
    description:
      '流体力学并非孤岛——量子计算的"方程求解"与"数据驱动"范式同样适用于结构、材料的力学问题。本方向涵盖 VQFEM 量子有限元和量子计算增强数据驱动计算力学等延伸工作，与流体力学方向形成方法论上的互鉴。',
    icon: 'boxes',
    keywords: ['VQFEM', 'VQLS', '数据驱动计算力学', '复合材料多尺度', '最小势能原理'],
  },
]
