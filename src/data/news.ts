/**
 * 会议新闻
 * 出处：详见 SOURCES.md §10
 * 第 1 条上一版误标为「第一轮通知」+ 日期 2025-12，已更正为「会议预告」+ 实际发布时间 2026-04
 * 第 2 条上一版误标为「第二轮通知发布」（docx 明确写第二轮通知"也即将发布"，即尚未发布），
 *         已改为「会议注册通道开放」，链接到注册页就合理了
 */
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
    id: 'preview-2026',
    date: '2026-04',
    title: '会议预告：QCFD 2026 将于 2026 年 5 月在合肥召开',
    excerpt:
      '“第三届流体力学量子计算前沿研讨会”将于 2026 年 5 月 22-24 日在合肥翡翠湖迎宾馆召开，由中国力学学会流体力学专业委员会主办，合肥综合性国家科学中心人工智能研究院承办，第二轮通知即将发布。',
    url: 'https://mp.weixin.qq.com/s/yKwzKqCcVezT2ABMXeUX3w',
    tag: '会议预告',
  },
  {
    id: 'registration-open',
    date: '2026-05',
    title: '会议注册通道开放',
    excerpt:
      '注册费 2000 元 / 人（中国力学学会会员 1800 元 / 人），由中国力学学会提供"会议注册费"数电发票。会议召开 15 天前可申请退款。请前往大会官网完成注册及缴费。',
    url: 'https://meeting.cstam.org.cn/index.php/Userlogin/login?mid=167&sid=665',
    tag: '注册',
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
