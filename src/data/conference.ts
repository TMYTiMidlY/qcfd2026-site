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
  chair: '杨越',
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
