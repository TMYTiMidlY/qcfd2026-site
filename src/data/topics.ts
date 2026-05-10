/**
 * 6 大议题方向
 * 出处：详见仓库根 SOURCES.md §2
 *  - 标题来自二轮通知 docx 第一段 + 公众号预告
 *  - description 由本届报告人 abstract 归纳，每条指向的支撑报告见 SOURCES.md
 */
export type Topic = {
  title: string
  description: string
  icon:
    | 'atom'
    | 'brain'
    | 'cpu'
    | 'waves'
    | 'sigma'
    | 'network'
}

export const topics: Topic[] = [
  {
    title: '流体方程的量子算法与量子-经典混合算法',
    description:
      '面向 Navier-Stokes、玻尔兹曼等核心方程，本届报告涵盖 Linear Combination of Hamiltonian Simulation、慢变时变 Hamiltonian 模拟，以及量子-经典混合 QLBM 等代表性算法路线。',
    icon: 'sigma',
  },
  {
    title: '量子计算与人工智能赋能流体力学',
    description:
      '将变分量子电路、量子强化学习、量子化 LSTM 等方法引入流动控制、风力机尾流预测、降阶建模等流体场景，探索量子-AI 协同的工程价值。',
    icon: 'brain',
  },
  {
    title: '流体量子模拟的硬件实现',
    description:
      '本届特别关注中性原子量子计算的产业化进展，并讨论 QLBM 等流体量子算法在硬件原生层面的电路深度优化与资源开销控制。',
    icon: 'cpu',
  },
  {
    title: '非线性动力学的量子模拟',
    description:
      '基于 Koopman 等线性化理论，将非线性动力学映射为量子线路可执行的对角酉算子；并讨论慢变 Hamiltonian 等更广义的非酉动力学量子模拟。',
    icon: 'waves',
  },
  {
    title: '流体方程量子求解的具体实现',
    description:
      '本届报告涵盖浅水波谱方法变分量子求解、面向航天空气动力学控制方程的量子编码与哈密顿模拟，以及 QLBM 在二维与三维基准流动上的电路构造与验证。',
    icon: 'atom',
  },
  {
    title: '量子机器学习赋能复杂流动',
    description:
      '基于量子化本征正交分解、量子深度核学习、循环量子神经网络等方法，构建可对湍流与复杂尾流做高保真预测与降阶建模的量子模型。',
    icon: 'network',
  },
]
