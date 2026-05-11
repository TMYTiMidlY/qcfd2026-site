export const conference = {
  name: '第三届流体力学量子计算前沿研讨会',
  shortName: 'QCFD 2026',
  edition: '第三届',
  dates: '2026 年 5 月 22-24 日',
  startDate: '2026-05-22',
  endDate: '2026-05-24',
  city: '合肥',
  venue: '合肥翡翠湖迎宾馆 3 号楼',
  address: '安徽省合肥市蜀山区翡翠路与望江西路交口',
  organizer: '中国力学学会流体力学专业委员会',
  host: '合肥综合性国家科学中心人工智能研究院',
  coOrganizers: [
    '本源量子计算科技（合肥）股份有限公司',
    '中国工业与应用数学学会数学力学专业委员会',
  ],
  chair: '杨越',
  chairProfile: {
    name: '杨越',
    title: '北京大学力学与工程科学学院 教授 · 院长',
    affiliation: '北京大学 · 力学与工程科学学院',
    photo: '/avatars/yang-yue.webp',
    research: '湍流 · 涡动力学 · 燃烧 · 流体量子/智能计算',
    bio: '北京大学力学与工程科学学院教授、院长。2011 年获加州理工学院博士学位（导师 Dale I. Pullin），2011–2013 年于普林斯顿大学燃烧能源研究中心与康奈尔大学从事博士后研究，2013 年加入北京大学工学院。长期聚焦湍流、涡动力学、燃烧及流体的量子与智能计算等方向。先后获得国家杰出青年科学基金（2019）、新基石科学探索奖（2020）、教育部高等学校科学研究优秀成果奖青年科学奖（2022）等。担任 Journal of Fluid Mechanics 与 Acta Mechanica Sinica、Science China Physics, Mechanics & Astronomy 等期刊副主编／Associate Editor，中国力学学会理事、青年工作委员会主任委员，中国工业与应用数学学会数学力学专业委员会秘书长。',
  },
  committee: ['陈昭昀', '熊诗颖', '卢臻', '薛程', '王俊超'],
  registrationUrl:
    'https://meeting.cstam.org.cn/index.php/Userlogin/login?mid=167&sid=665',
  websiteUrl: 'https://qcfd2026.chenzhaoyun.com',
  fee: '2000 元 / 人',
  feeMember: '中国力学学会会员 1800 元 / 人',
  contacts: [
    {
      name: '陈昭昀',
      phone: '***REDACTED-PHONE***',
      email: 'chenzhaoyun@iai.ustc.edu.cn',
    },
    {
      name: '王俊超',
      phone: '***REDACTED-PHONE***',
      email: 'wangjunchao11@126.com',
    },
  ],
  tagline:
    '聚焦流体力学与量子计算交叉前沿，深化两大学科的协同创新，助力我国在该方向持续突破。',
} as const

export type Conference = typeof conference
