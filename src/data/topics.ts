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
      '面向 Navier-Stokes、玻尔兹曼等核心方程的纯量子求解器与量子-经典协同框架，探索时间演化、迭代求解与误差控制的新范式。',
    icon: 'sigma',
  },
  {
    title: '量子计算与人工智能赋能流体力学',
    description:
      '量子机器学习、量子神经网络与经典 AI 方法在流体湍流预测、控制与建模中的耦合与互补。',
    icon: 'brain',
  },
  {
    title: '流体量子模拟的硬件实现',
    description:
      '超导、中性原子、离子阱等多技术路线下的硬件原生算子设计、噪声建模与可扩展量子线路实现。',
    icon: 'cpu',
  },
  {
    title: '非线性动力学的量子模拟',
    description:
      '基于 Koopman、Carleman 等线性化技术的非线性 ODE/PDE 量子映射，及其在湍流与多体动力系统中的应用。',
    icon: 'waves',
  },
  {
    title: '流体方程量子求解的具体实现',
    description:
      '量子格子玻尔兹曼方法（QLBM）、谱方法变分量子求解器、量子有限差分等可执行算法的电路构造与基准验证。',
    icon: 'atom',
  },
  {
    title: '量子机器学习赋能复杂流动',
    description:
      '降阶建模、流场重构、流动控制中的量子核学习、变分线路与序列模型，面向复杂流动场景的算力突破。',
    icon: 'network',
  },
]
