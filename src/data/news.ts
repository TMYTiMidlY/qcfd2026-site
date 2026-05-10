export type NewsItem = {
  id: string
  date: string
  title: string
  excerpt: string
  url: string
  tag?: string
}

export const news: NewsItem[] = [
  {
    id: 'first-circular',
    date: '2025-12',
    title: '第一轮通知发布：QCFD 2026 将于 2026 年 5 月在合肥召开',
    excerpt:
      '“第三届流体力学量子计算前沿研讨会”将于 2026 年 5 月 22-24 日在合肥翡翠湖迎宾馆召开，由中国力学学会流体力学专业委员会主办，合肥综合性国家科学中心人工智能研究院承办。',
    url: 'https://mp.weixin.qq.com/s/yKwzKqCcVezT2ABMXeUX3w',
    tag: '会议通知',
  },
  {
    id: 'second-circular',
    date: '2026-04',
    title: '第二轮通知发布：议程、嘉宾与注册细则',
    excerpt:
      '会议组织机构、特邀嘉宾、报告专家、注册缴费方式等信息正式公布，欢迎流体力学、量子计算及交叉学科领域的专家学者注册参会。',
    url: 'https://meeting.cstam.org.cn/index.php/Userlogin/login?mid=167&sid=665',
    tag: '注册开放',
  },
  {
    id: 'recap-2025',
    date: '2025-05',
    title: '回顾：第二届流体力学量子计算前沿研讨会（杭州）',
    excerpt:
      '第二届会议于 2025 年 5 月 9-11 日在杭州召开，汇聚流体力学与量子计算交叉研究的专家学者，共享最新研究进展。',
    url: 'https://mp.weixin.qq.com/s/IN0PJ-PF_5WLQcdUI7Q_9g',
    tag: '往届回顾',
  },
]
