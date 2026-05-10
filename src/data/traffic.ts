/**
 * 交通指南
 * 出处：详见 SOURCES.md §9
 * 上一版包含的距离、时长、费用、地铁线路、机场大巴、weather 等具体数字均为作者编造（docx 未提供任何交通信息），
 * 本版仅保留客观存在的 3 个交通枢纽 + 自驾，具体路线交给地图 App 实时查询
 */
export type TrafficInfo = {
  origin: string
  hint: string
  amapKeyword: string
  icon: 'plane' | 'train-front' | 'train' | 'car'
}

export const traffic: TrafficInfo[] = [
  {
    origin: '合肥新桥国际机场（HFE）',
    hint: '位于合肥市区西北方向，建议出租 / 网约车直达，或先到市区再转车',
    amapKeyword: '合肥新桥国际机场到合肥翡翠湖迎宾馆',
    icon: 'plane',
  },
  {
    origin: '合肥南站（高铁主站）',
    hint: '合肥地区主要高铁枢纽，距翡翠湖较近',
    amapKeyword: '合肥南站到合肥翡翠湖迎宾馆',
    icon: 'train-front',
  },
  {
    origin: '合肥站（合肥老火车站）',
    hint: '位于合肥城东北，部分普速 / 部分动车列车在此停靠',
    amapKeyword: '合肥站到合肥翡翠湖迎宾馆',
    icon: 'train',
  },
  {
    origin: '市区自驾',
    hint: '导航关键词：翡翠湖迎宾馆 3 号楼；迎宾馆内部停车场可供参会代表停放',
    amapKeyword: '合肥翡翠湖迎宾馆',
    icon: 'car',
  },
]
