/**
 * 议题方向
 * 出处：详见仓库根 SOURCES.md §2
 *  - 标题来自二轮通知 docx 第一段 + 公众号预告（合并去重 + 用户确认重组）
 *  - description / keywords / speakers[].note 由本届报告人 abstract 归纳，每条指向的支撑报告见 SOURCES.md
 *  - 6 个方向（2026-05-12 用户重组）：
 *      1) 流体方程的量子算法与量子-经典混合算法
 *      2) 量子计算与人工智能/机器学习赋能流体力学（原 #2 + #6 合并）
 *      3) 流体量子模拟的硬件实现
 *      4) 非线性动力学的量子模拟
 *      5) 流体方程量子求解的具体实现
 *      6) 面向固体力学/材料力学的量子计算延伸（新增；收纳胡衡 + 吴锋）
 *  - 跨领域：张镭（UnitaryLab 平台）见 crossCuttingSpeakers
 */
export type Topic = {
  title: string
  /** 一段较长的方向说明，2-3 句，承接每条 abstract 共性 */
  description: string
  icon:
    | 'atom'
    | 'brain'
    | 'cpu'
    | 'waves'
    | 'sigma'
    | 'network'
    | 'boxes'
  /** 该方向涉及的关键技术词 / 主题词，UI 渲染为 chip */
  keywords: string[]
  /** 每位相关报告人 + 1 句贡献描述（替代旧版仅 id 列表） */
  speakers: Array<{
    id: string
    note: string
  }>
}

export const topics: Topic[] = [
  {
    title: '流体方程的量子算法与量子-经典混合算法',
    description:
      'Navier-Stokes、玻尔兹曼、涡量-流函数等核心方程的量子求解是 QCFD 的算法主战场。本届报告涵盖 LCHS（Linear Combination of Hamiltonian Simulation）算法族对非酉动力学的统一处理、面向不可压复杂流动的量子-经典混合 QLBM，以及变分量子非线性求解器与围道积分矩阵分解等代表性算法路线。',
    icon: 'sigma',
    keywords: ['LCHS', 'QLBM', '量子-经典混合', '变分量子求解', '非酉演化'],
    speakers: [
      {
        id: 'liu-jinpeng',
        note: '提出 LCHS 框架及其 random / variational / inf-LCHS 系列推广，给出非酉动力学模拟的最优复杂度。',
      },
      {
        id: 'niu-xiaodong',
        note: '两条 QLBM 路线——基于分布函数演化的多物理场耦合 QLBM，与双线路非平衡线化 QLBM 的高效优化。',
      },
      {
        id: 'chen-zhaoyun',
        note: '变分量子非线性求解器 + 围道积分矩阵分解 + Fourier/Contour-PSF 统一泊松求和框架。',
      },
    ],
  },
  {
    title: '量子计算与人工智能/机器学习赋能流体力学',
    description:
      '把变分量子电路嫁接到强化学习、降阶建模、特征提取等任务上，让"量子算力"和"AI 范式"在流体场景里互相赋能。本届报告涵盖量子强化学习的主动流动控制，以及 VQSVD + 量子化 LSTM、QPOD + QDKL 等量子降阶模型在流场预测和湍流分析上的应用。',
    icon: 'brain',
    keywords: ['量子强化学习', 'VQC', 'PPO', 'VQSVD', 'QLSTM', 'QPOD', 'QDKL', '降阶模型'],
    speakers: [
      {
        id: 'tang-hui',
        note: '量子强化学习（VQC + PPO）做雷诺数 100 方柱绕流主动减阻控制，参数量较经典网络大幅减小。',
      },
      {
        id: 'xiao-dunhui',
        note: 'VQSVD + 线性层增强 QLSTM 的混合降阶模型；QPOD + QDKL 的湍流量子降阶模型。',
      },
    ],
  },
  {
    title: '流体量子模拟的硬件实现',
    description:
      '算法的优势最终要兑现到真实硬件上。本届报告关注中性原子量子计算的产业化路线（万比特规模化、双核架构、商业落地与海外出口），同时讨论 QLBM 等流体量子算法在硬件原生层面的电路深度优化与量子资源开销控制。',
    icon: 'cpu',
    keywords: ['中性原子', '汉原系列', '万比特扩展', '电路深度', '量子行走', 'ParaShift'],
    speakers: [
      {
        id: 'shi-zhiquan',
        note: '中性原子量子计算「汉原 1 号 / 2 号」产业化、双核架构创新与海外订单、行业格局与发展路线。',
      },
      {
        id: 'niu-xiaodong',
        note: '通过量子行走 + ParaShift 的双电路框架，显著降低 QLBM 电路深度并减少量子资源开销。',
      },
    ],
  },
  {
    title: '非线性动力学的量子模拟',
    description:
      '量子门是线性幺正的，而流体本质是非线性耗散——如何把非线性、非幺正过程"翻译"到量子计算可执行的线性幺正框架，是 QCFD 的根本矛盾。本届报告涵盖基于 Koopman 理论的全局线性化、慢变 Hamiltonian 的近最优算法，以及围道积分将非厄米传播子分解为厄米组合的统一处理。',
    icon: 'waves',
    keywords: ['Koopman 线性化', 'Floquet 理论', '慢变 Hamiltonian', '非厄米演化', '围道积分'],
    speakers: [
      {
        id: 'lu-zhen',
        note: '量子 Koopman 方法（QKM）：数据驱动全局线性化 → 对角酉算子 → 硬件原生 Rz 门电路，等效 320 比特规模。',
      },
      {
        id: 'an-dong',
        note: 'Floquet 理论 + 平滑周期延拓的近最优算法，并通过 LCHS 推广至 general slow non-unitary dynamics。',
      },
      {
        id: 'chen-zhaoyun',
        note: '直面"流体非线性耗散 vs 量子线性幺正"两个根本矛盾的算法应对：变分非线性求解 + 围道积分非幺正分解。',
      },
    ],
  },
  {
    title: '流体方程量子求解的具体实现',
    description:
      '从抽象算法走向具体方程的端到端实现：包括量子态制备、Hamiltonian 模拟、信息提取、电路构造与硬件验证。本届报告覆盖浅水波 / 钱塘江潮波、航天空气动力学控制方程、二维与三维 QLBM 基准流动，以及湍流场的几何编码与大规模量子模拟。',
    icon: 'atom',
    keywords: ['浅水波', 'Madelung 变换', '谱方法 VQS', '哈密顿模拟', 'QLBM 基准验证', '湍流几何编码'],
    speakers: [
      {
        id: 'xiong-shiying',
        note: '浅水波方程 → Madelung 变换 → 二阶时间精度谱方法 VQS，模拟钱塘江「矩阵潮 / 三叉潮」。',
      },
      {
        id: 'xu-liang',
        note: '面向航天空气动力学控制方程的量子编码、哈密顿模拟与信息提取策略，及向高维非线性问题的拓展。',
      },
      {
        id: 'niu-xiaodong',
        note: 'QLBM 在二维与三维基准流动模型上的电路构造与数值验证。',
      },
      {
        id: 'meng-zhaoyuan',
        note: '物理驱动几何编码框架「湍流万花筒」：用 Hopf 纤维化 + Gray 码以 30 量子比特模拟 Re=35000 湍流场。',
      },
    ],
  },
  {
    title: '面向固体力学/材料力学的量子计算延伸',
    description:
      '流体力学并非孤岛——量子计算的"方程求解"与"数据驱动"范式同样适用于结构、材料的力学问题。本届特别邀请两位固体力学方向的报告人，展示 VQFEM 量子有限元和量子计算增强数据驱动计算力学等延伸工作，与流体力学方向形成方法论上的互鉴。',
    icon: 'boxes',
    keywords: ['VQFEM', 'VQLS', '复合材料', '数据驱动计算力学', '多尺度仿真', '最小势能原理'],
    speakers: [
      {
        id: 'hu-heng',
        note: '量子计算增强数据驱动计算力学：从本构数据 / 驱动算法 / 仿真平台三方面提升复合材料多尺度仿真。',
      },
      {
        id: 'wu-feng',
        note: 'VQFEM 体素表示量子有限元框架：用经典力学最小势能原理替代误差驱动损失，规避大量级量子电路调用。',
      },
    ],
  },
]

/** 未被上面 6 个方向显式覆盖但同样精彩的跨领域报告 */
export const crossCuttingSpeakers = ['zhang-lei']
