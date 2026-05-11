/**
 * 嘉宾与报告人数据
 * 出处：详见仓库根 SOURCES.md
 *  - guests 三人头衔来自二轮通知 docx
 *  - 郭光灿 bio 来自维基百科 zh.wikipedia.org/wiki/郭光灿，
 *      头像来自 Wikimedia Commons (File:郭光灿.jpg)
 *  - 陆夕云 bio 来自 USTC 个人主页 staff.ustc.edu.cn/~xlu/ 与维基；
 *      头像取自该主页 picture/lu-xiyun.jpg（2008 年讲座照片，分辨率有限）
 *  - 郭国平 bio 综合用户提供文字 + 中科大 / 本源量子公开介绍；
 *      暂无可公开授权头像，使用首字头像
 *  - speakers 11 位：姓名/单位/职务/题目/简介/摘要 来自各自的邀请报告 .docx
 *  - speakers 顺序：按姓氏拼音首字母（an < hu < liu < lu < meng < niu < shi < tang < xiao < xiong < xu < zhang）
 */

export type Speaker = {
  id: string
  name: string
  title: string
  affiliation: string
  topic?: string
  bio?: string
  abstract?: string
  photo?: string
  isGuest?: boolean
}

export const guests: Speaker[] = [
  {
    id: 'guo-guangcan',
    name: '郭光灿',
    title: '中国科学院院士',
    affiliation: '中国科学技术大学',
    bio: '中国科学技术大学教授，北京大学物理学院教授，我国量子光学与量子信息领域的开拓者之一。1965 年毕业于中国科学技术大学并留校任教。1997 年提出量子避错编码原理，1998 年提出量子概率克隆原理（"段-郭克隆机"）。曾获 2003 年、2020 年度国家自然科学二等奖。2003 年当选中国科学院院士，2009 年当选第三世界科学院院士。',
    isGuest: true,
    photo: '/avatars/guo-guangcan.webp',
  },
  {
    id: 'lu-xiyun',
    name: '陆夕云',
    title: '中国科学院院士',
    affiliation: '中国科学技术大学',
    bio: '中国科学技术大学教授，长江学者特聘教授，国家杰出青年科学基金获得者。研究方向涵盖旋涡动力学理论与方法、湍流模型与数值模拟、生物运动力学、界面流动及流动控制。在物体受力的主控旋涡理论、有限域涡量矩理论等方向取得系统性原创成果。曾任中国力学学会常务理事，现任《力学学报》主编。2019 年当选中国科学院院士。',
    isGuest: true,
    photo: '/avatars/lu-xiyun.webp',
  },
  {
    id: 'guo-guoping',
    name: '郭国平',
    title: '教授',
    affiliation: '中国科学技术大学 · 本源量子首席科学家',
    bio: '中国科学技术大学讲席教授，第十四届全国人大代表，中国科学院量子信息重点实验室副主任，集成电路学院副院长。本源量子首席科学家，中国计算机学会量子计算专业委员会秘书长。长期从事半导体与超导量子计算研究，主导我国首台已交付用户超导量子计算机研发。现任科技创新 2030「量子通信与量子计算机」重大项目负责人。',
    isGuest: true,
    photo: '/avatars/guo-guoping.webp',
  },
]

export const speakers: Speaker[] = [
  {
    id: 'an-dong',
    photo: '/avatars/an-dong.webp',
    name: '安冬',
    title: '助理教授',
    affiliation: '北京大学 北京国际数学研究中心',
    topic: 'Nearly Optimal Quantum Simulation of Slow Time-Dependent Hamiltonians',
    bio: '北京大学北京国际数学研究中心助理教授。2016 年本科毕业于北京大学数学科学学院，2021 年博士毕业于美国加州大学伯克利分校数学系。2021-2024 年于美国马里兰大学从事博士后研究。研究方向为计算数学与量子计算、量子物理的交叉，主要关心量子算法及其在科学计算中的应用，包括线性方程组与微分方程的量子算法、量子模拟算法、量子计算与优化算法、绝热量子计算与变分量子算法等。',
    abstract:
      'Simulating the time evolution of quantum systems remains one of the most promising applications of quantum computing. We present an efficient quantum algorithm designed to simulate slowly varying time-dependent Hamiltonians. By leveraging Floquet theory alongside a smooth extension of the Hamiltonians to periodic systems, our approach achieves near-optimal scaling — specifically, an almost linear and additive dependence on evolution time and error parameters. We will also discuss how to extend this algorithm to general slow non-unitary dynamics using the linear combination of Hamiltonian simulation (LCHS) technique.',
  },
  {
    id: 'hu-heng',
    name: '胡衡',
    title: '教授',
    affiliation: '宁夏大学',
    topic: '（报告题目持续更新中）',
    bio: '宁夏大学教授。详细简介与报告题目敬请关注后续通知。',
  },
  {
    id: 'liu-jinpeng',
    photo: '/avatars/liu-jinpeng.webp',
    name: '刘锦鹏',
    title: '助理教授',
    affiliation: '清华大学丘成桐数学科学中心',
    topic: 'Towards Practical Quantum Simulation of Non-unitary Dynamics',
    bio: '清华大学丘成桐数学科学中心助理教授、博士生导师，入选国家海外高层次人才引进计划。2022-2024 年于麻省理工与伯克利任博士后，2022 年博士毕业于马里兰大学。研究方向为量子科学计算与量子科学智能，发表 PNAS、Nat. Commun.、PRL、CMP、JCP、Quantum 等期刊及 NeurIPS、QIP、TQC 等会议，受到 Quanta、SIAM News、MATH+ 等媒体报道，获 ICCM 毕业论文金奖，担任量子信息权威期刊 Quantum 编委。',
    abstract:
      'Quantum computers are expected to excel in simulating unitary dynamics, while most applications in scientific and engineering computations involve non-unitary dynamics. We propose a simple method for simulating a general class of non-unitary dynamics as a Linear Combination of Hamiltonian Simulation (LCHS) problems [PRL 2023] with optimal complexity, develop a random-LCHS framework with circuit efficiency for early fault-tolerant designs, present a variational LCHS for non-Hermitian system experiments, and describe a rigorous inf-LCHS Theorem for infinite-dimensional and unbounded operators.',
  },
  {
    id: 'lu-zhen',
    photo: '/avatars/lu-zhen.webp',
    name: '卢臻',
    title: '助理研究员',
    affiliation: '北京大学 力学与工程科学学院',
    topic: '基于 Koopman 方法的非线性动力系统端到端量子模拟',
    bio: '北京大学力学与工程科学学院助理研究员，2016 年于清华大学获博士学位。长期从事计算流体力学、湍流燃烧与人工智能方法的交叉研究，近年聚焦流体力学量子计算前沿，围绕量子算法设计、非线性动力学的量子映射、量子硬件噪声建模、智能赋能流体计算等开展系统性工作。已于 JCP、Combustion and Flame、Proc. Combust. Inst.、Phys. Rev. Fluids 等期刊发表论文 30 余篇，获第 41 届国际燃烧大会最佳论文提名奖。',
    abstract:
      '酉算子的线性特性限制了量子计算在非线性动力系统模拟中的直接应用。本研究提出量子 Koopman 方法（QKM），通过数据驱动的全局线性化突破该限制：基于 Koopman 理论构建非线性动力学的全局线性表示，并通过对角哈密顿量模拟的线性组合将线性演化表示为对角酉算子，进而利用 Walsh-Fourier 变换将其映射为硬件原生的 Rz 门电路。编码器将系统状态映射为量子旋转门参数以制备初态，可学习对角酉算子执行量子演化，解码器将测量结果还原为系统状态；编解码网络与量子门参数通过数据驱动联合优化。在超导量子处理器上针对三维反应扩散、球面浅水波及真实洋流观测开展数值实验，实现等效 320 量子比特规模的量子模拟，验证量子资源随空间自由度对数级缩放的优势。',
  },
  {
    id: 'meng-zhaoyuan',
    photo: '/avatars/meng-zhaoyuan.webp',
    name: '孟昭远',
    title: '特别研究助理',
    affiliation: '中国科学院力学研究所',
    topic: '湍流场的几何量子化编码',
    bio: '中国科学院力学研究所特别研究助理，合作导师为何国威院士。2025 年获北京大学理学博士学位，2020 年获中国科学技术大学理学学士学位。主要研究方向为湍流、量子计算、涡动力学，相关工作在 J. Fluid Mech.、J. Comput. Phys.、Commun. Phys.、Phys. Rev. Res.、npj Quantum Inform. 等期刊发表论文 9 篇，其中第一作者（含共同第一作者）8 篇。担任 PRL、Quantum、PRA、Phys. Rev. Fluids 等期刊审稿人，曾获北京大学优秀博士论文、北京大学工学院学术十杰、北京大学校长奖学金等奖励。',
    abstract:
      '量子计算在模拟湍流等复杂多尺度系统时，常受制于初态制备瓶颈——将海量经典数据编码为量子态的极高成本往往会抵消量子加速优势。我们提出物理驱动的几何编码框架"湍流万花筒"：摒弃传统逐点数据加载方式，转而利用湍流内在的自相似结构作为生成规则。算法采用格雷码以保持空间拓扑局域性，在特征空间中通过超平面近似刻画尺度不变性，并借助 Hopf 纤维化将量子可观测量直接映射为流体中的宏观涡管。该策略无需任何辅助量子比特，仅需线性深度的量子线路，资源需求随雷诺数仅呈对数增长，相较经典算法实现指数级加速。基于该方法，我们在量子模拟器上使用 30 个量子比特，在超十亿网格点上生成了雷诺数高达 35000 的瞬态湍流场，复现 Kolmogorov −5/3 能谱、复杂涡管网络及强间歇性等特征。',
  },
  {
    id: 'niu-xiaodong',
    photo: '/avatars/niu-xiaodong.webp',
    name: '牛小东',
    title: '教授',
    affiliation: '汕头大学 工学院机械工程系',
    topic: '两种量子-经典混合 QLBM 研究：多物理场耦合 QLBM 与双线路非平衡线化 QLBM',
    bio: '汕头大学工学院机械工程系教授、博士生导师，日本同志社大学客座教授，中国力学学会流体力学分委会电磁流体力学专业组委员，广东省"扬帆计划"培养高层次人才，全国总工会十七大、十八大代表，广东省工会十四大、十五大代表，中国空气动力学会理事。入选 2020、2021 年度斯坦福大学全球前 2% 顶尖科学家学科榜单；2022 年荣获机械工业科技奖（技术发明奖一等奖），2021 年荣获北京市科学技术奖（技术发明奖一等奖），2019 年广东省教育教学成果一等奖与汕头大学李嘉诚基金会卓越教学奖。主要研究领域包括磁流体多相流、格子玻尔兹曼方法和量子计算。',
    abstract:
      '本报告介绍我们最近发展的两种针对不可压缩复杂流动模拟的量子-经典混合格子玻尔兹曼方法（QLBM）。其一为基于涡量-流函数方程求解、仅依赖分布函数演化的多物理场耦合 QLBM，核心在于构建含多物理场分布函数的超碰撞矩阵，通过耦合周期性边界条件与源项处理，实现单一电路上多个物理场的耦合信息传递。其二是基于此前模块化非平衡线化 QLBM 的高效优化工作：通过构建粒子速度模型的正交速度与对角速度方向双电路框架，分别采用量子行走与并行基态移位（ParaShift）策略，实现迁移步骤的更高效并行计算。优化后的 QLBM 显著降低量子电路深度并减少量子资源开销，并在多个二维与三维基准流动模型上得到验证。',
  },
  {
    id: 'shi-zhiquan',
    photo: '/avatars/shi-zhiquan.webp',
    name: '石志全',
    title: '量子算法总监',
    affiliation: '中科酷原科技（武汉）有限公司',
    topic: '中性原子量子计算的产业化进展',
    bio: '任职于中科酷原科技（武汉）有限公司，长期深耕中性原子量子计算应用探索与软件开发，主导推进公司"汉原系列"原子量子计算生态建设，助力国内首台原子量子计算机实现商业化应用与海外出口。在中性原子量子计算应用开发、技术成果转化、产业生态合作等领域积淀了丰富实践经验，牵头推动原子量子计算在金融、生命健康、电力、制造等领域的应用落地与合作拓展。',
    abstract:
      '本报告聚焦中性原子量子计算产业化进展。首先阐述量子计算多技术路线并行发展格局，点明中性原子凭借全同性、高可扩展性、长相干时间成为量子计算"黑马"。随后梳理全球中性原子量子计算在万比特规模化扩展、高保真量子门操控、容错连续运行、架构算法协同等关键技术突破。重点介绍中科酷原的产业化成果，包括"汉原 1 号"商用落地、斩获海外订单，"汉原 2 号"双核架构创新，及在金融、医药等领域的应用探索。同时分析全球产业格局与美国技术布局，指出行业发展机遇与挑战，最后提出中性原子量子计算分阶段发展路线，为我国该领域技术突破与产业落地提供参考。',
  },
  {
    id: 'tang-hui',
    photo: '/avatars/tang-hui.webp',
    name: '唐辉',
    title: '教授 · 副主任（科研）',
    affiliation: '香港理工大学 机械工程系',
    topic: '基于量子强化学习的主动流动控制',
    bio: '研究涵盖流体力学多个领域，尤其在流动控制与流固耦合方向，已发表 140 余篇论文，含 5 篇 ESI 高被引文章。2024 年入选英国皇家航空学会会士（FRAeS）。2025 年作为主席在香港组织 AI 赋能流体力学国际研讨会。担任多个期刊编委、香港雾化与喷雾系统学会（ILASS-HK）副主席、香港力学学会（HKSTAM）秘书长，以及中国空气动力学会智能流体力学专业组副主任委员。',
    abstract:
      '对复杂流动系统实现高效的主动流动控制仍是亟待突破的难题，根本原因在于被控流场固有的高维度、强非线性及复杂时空演化。量子机器学习有望为此类问题提供新的解决途径。本研究提出基于量子强化学习的主动流动控制框架，融合变分量子电路（VQC）与近端策略优化算法（PPO）实现控制策略学习。我们首先在 CartPole 问题上对量子强化学习进行验证，结果表明其与经典网络控制效果相差不大但参数大幅减小；进一步将该方法应用于雷诺数 100 的方柱绕流主动控制，由网络输出圆柱表面连续吹吸控制指令，有效抑制涡脱落实现减阻，显著降低平均阻力并抑制升力振荡，展示了量子增强学习应对复杂流体力学问题的潜力。',
  },
  {
    id: 'xiao-dunhui',
    photo: '/avatars/xiao-dunhui.webp',
    name: '肖敦辉',
    title: '教授',
    affiliation: '同济大学 数学科学学院',
    topic: '量子混合经典数据驱动的流体降阶建模新方法及其应用',
    bio: '同济大学数学科学学院教授、计算数学教研室主任，国家海外高层次青年人才及上海市高层次海外人才入选者。中国计算数学学会常务理事，中国岩石力学与工程协会 AI 实用化学会第一届常务委员，上海 CSIAM 委员。2013 年获英国帝国理工博士全奖攻读计算力学博士学位，毕业后继续在帝国理工从事博士后研究，2018 年进入英国斯旺西大学辛克维奇工程中心担任讲师。主持过 EPSRC、Royal Society 与中国国家级项目多项，担任英国 EPSRC、欧洲 ERC 等评审专家，及 Nature 子刊等评审专家。研究兴趣为模型降阶理论及应用、计算力学与量子计算等。',
    abstract:
      '本报告围绕量子增强流体降阶模型（QROM）研究方面的进展展开。讨论基于 VQSVD 与线性层增强量子化 LSTM 神经网络（QLSTM）的混合量子-经典降阶模型：VQSVD 用于压缩非定常流场并提取低维系数，L-QLSTM 用于学习系数演化；从数学角度，分析有限测量次数下 VQSVD 随机梯度优化的收敛性，并建立 L-QLSTM 的 Lipschitz 稳定性理论，给出多步预测误差界。同时讨论面向基于量子化本征正交分解 QPOD 与量子深度核学习 QDKL 的湍流量子降阶模型（QROM）：以量子正交分解构造空间基，并利用量子特征空间提升瞬态动力学预测能力。数值结果显示量子机器学习在降低参数规模、提升训练效率与增强复杂流动长期稳定预测方面的潜力。',
  },
  {
    id: 'xiong-shiying',
    photo: '/avatars/xiong-shiying.webp',
    name: '熊诗颖',
    title: '研究员（百人计划）',
    affiliation: '浙江大学 航空航天学院',
    topic: '浅水波动力学的量子计算模拟',
    bio: '浙江大学航空航天学院百人计划研究员、博士生导师。2014 年获吉林大学学士学位，2019 年获北京大学博士学位，2019-2022 年于美国达特茅斯学院从事博士后研究，2023 年加入浙江大学。担任中国力学学会青年工作委员会委员、理性力学专委会委员，CSIAM 数学与航天交叉学科专委会委员，《Acta Mechanica Sinica》《浙江大学学报（工学版）》青年编委，《气体物理》青年副主编。曾获中国力学学会青年人才蓄水池项目。研究方向包括湍流、计算流体力学、机器学习与量子计算，相关研究在 NC、JFM、JCP、ACM TOG 等专业权威期刊发表 40 余篇。',
    abstract:
      '浅水波计算是海啸预警与流域防洪的重要方法，但在超大尺度模拟中，经典数值模式常面临自由度爆炸与收敛困难的瓶颈。量子计算凭借指数级的存储与并行优势，为突破大规模多尺度模拟的算力限制提供新途径。本研究从含量子压强项的浅水方程出发，通过 Madelung 变换建立其与 Gross-Pitaevskii 方程的映射关系，构建具有二阶时间精度的谱方法变分量子求解框架。同时提出有效 Bond 数，用于匹配量子压强与浅水表面波的色散特征，并通过表面张力类比验证其物理合理性。基于该含色散修正的模型，实现了钱塘江"矩阵潮"和"三叉潮"等复杂潮波现象的量子模拟，揭示不同精度下水波耦合结构的演化规律，为利用量子算力研究复杂浅水动力学提供新的建模思路与方法支撑。',
  },
  {
    id: 'xu-liang',
    photo: '/avatars/xu-liang.webp',
    name: '许亮',
    title: '研究员',
    affiliation: '中国航天空气动力技术研究院',
    topic: '航天空气动力学的量子-经典混合计算进展及展望',
    bio: '中国航天空气动力技术研究院研究员、博士生导师，入选中国航天科技集团学术技术带头人、青年拔尖人才。长期从事航空航天、武器物理等领域科学计算基础研究，主要方向涉及可压缩多介质复杂流动数值方法、智能计算与量子计算等前沿方法。在 JCP 等国内外权威刊物发表论文近 40 篇。现任中国力学学会流体力学专业委员会计算流体力学专业组组员、中国空气动力学会计算空气动力学专业委员会委员、智能空气动力学专业组委员、CSIAM 数学与航天交叉学科专委会委员、智能流体力学产业联合体理事、《兵器装备工程学报》青年编委等。',
    abstract:
      '数值模拟效率的跃升是推动先进飞行器气动设计革新的关键引擎。当前传统超级计算机面临内存与算力的双重制约，千万乃至亿级自由度的全尺寸模拟难以高效推进。量子计算凭借量子态叠加与纠缠原理所蕴含的指数级加速潜力，正为应对航天领域大规模流体仿真的效率瓶颈探索一条前沿技术路径。本报告聚焦量子-经典混合计算范式在航天空气动力学中的应用前景，梳理中国航天空气动力技术研究院围绕可压缩流动模拟所开展的探索性研究工作。在基础层面，重点阐述面向空气动力学控制方程计算格式的量子编码、哈密顿模拟及信息提取等策略；在算法层面，介绍计算流体力学领域量子算法的构造与验证，及其向高维、非线性问题的拓展路径。最后展望量子计算赋能航天工程应用所面临的潜在挑战与未来发展愿景。',
  },
  {
    id: 'zhang-hongfu',
    photo: '/avatars/zhang-hongfu.webp',
    name: '张洪福',
    title: '研究员',
    affiliation: '香港理工大学 机械工程系',
    topic: '基于 RQNN 的复杂风力机尾流高保真预测',
    bio: '香港理工大学机械工程系研究员，曾主持国家自然基金青年基金、黑龙江省自然基金、国家重点研发计划子课题、中国博士后基金项目、香港研资局优配研究金（GRF）等项目。累计发表学术论文 70 余篇，其中第一或通讯作者高水平 SCI 论文 43 篇，含 JCR 一区论文 35 篇、ESI 高被引论文 5 篇、热点论文 1 篇，授权专利 7 项。任抗风减灾与风能利用专业委员会青年委、国家自然科学基金通讯评审专家、Journal of Engineering 学术编委、《中南大学学报》青年编委。',
    abstract:
      '精确预测风力机尾流动力学行为对提升风电场运行效率与发电效益至关重要。然而尾流场具有典型混沌特性，主涡结构常隐藏于复杂流场中，显著增加其时空演化预测难度。我们提出一种将时滞本征正交分解（t-POD）与循环量子神经网络（RQNN）相结合的混合预测框架：首先通过 t-POD 将时空流场分解为空间模态与时间系数，再利用 RQNN 对时变系数进行序列预测。在均匀来流与湍流来流条件下验证模型预测效果，结果表明：湍流作用加剧尾流混沌特性，时滞嵌入有效平滑模态系数曲线、增强特征提取能力；所设计 RQNN 能够处理高相关性张量数据，实现快速精确的系数预测，误差随延迟阶数增加而逐步降低。该模型可实现风力机尾流的高保真预测，为建立工程安全标准及深化复杂尾流系统机理研究提供方法论工具。',
  },
]
