/**
 * 会议新闻
 * 出处：详见 SOURCES.md §10
 * 第 1 条上一版误标为「第一轮通知」+ 日期 2025-12，已更正为「会议预告」+ 实际发布时间 2026-04
 *   反推：fetch 文章 HTML，grep `var ct = "..."` 拿 unix ts → 2026-04-02 14:09 +0800
 * 上一版「会议注册通道开放」一卡删除（重复入口太多，注册按钮在 Header / Hero / Footer 多处已有）
 * 往期回顾改为各届「会议结束公众号」推文（用户提供链接）
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
      '"第三届流体力学量子计算前沿研讨会"将于 2026 年 5 月 22-24 日在合肥翡翠湖迎宾馆召开，由中国力学学会流体力学专业委员会主办，合肥综合性国家科学中心人工智能研究院承办，第二轮通知即将发布。',
    url: 'https://mp.weixin.qq.com/s/yKwzKqCcVezT2ABMXeUX3w',
    tag: '会议预告',
  },
  {
    id: 'recap-2025',
    date: '2025-05',
    title: '回顾：第二届流体力学量子计算前沿研讨会（杭州）',
    excerpt:
      '2025 年 5 月 9-10 日在杭州召开，由浙大航空航天学院与北大工学院联合承办，13 位专家作专题报告，全国 40 余家机构 90 余位学者参会。',
    url: 'https://mp.weixin.qq.com/s/fTrd2U3MuyU0sl_NaYdoZA',
    tag: '往届回顾',
  },
  {
    id: 'recap-2024',
    date: '2024-07',
    title: '回顾：首届流体力学量子计算前沿研讨会（北京）',
    excerpt:
      '2024 年 7 月 12-13 日在北京召开，国内首次专题研讨会，由北大工学院与浙大航空航天学院承办，12 位专家作专题报告，80 余位学者参会。',
    url: 'https://mp.weixin.qq.com/s/eX62OHMfmysrt0C-r2pr9w',
    tag: '往届回顾',
  },
]
