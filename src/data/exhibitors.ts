/** 参展单位。Logo 资源放在 `src/assets/exhibitors/<id>.{webp,svg,png,jpg,jpeg}`，按 id 自动匹配。 */
export type Exhibitor = {
  id: string
  name: string
  shortName?: string
  description: string
  url?: string
}

export const exhibitors: Exhibitor[] = [
  {
    id: 'origin-quantum',
    name: '本源量子计算科技（合肥）股份有限公司',
    shortName: '本源量子',
    description:
      '国内首家量子计算企业，由郭光灿院士、郭国平教授领衔创办，量子计算知识产权数国内第一、国际前三。已上线中国第四代自主超导量子计算机「本源悟空-180」，为全球 163 个国家提供量子算力服务。',
    url: 'https://originqc.com.cn/',
  },
  {
    id: 'cool-atoms',
    name: '中科酷原科技（武汉）有限公司',
    shortName: '中科酷原',
    description:
      '国内首个同时具备原子量子计算和量子精密测量研发与产业化能力的公司。团队源自中国科学院精密测量科学与技术创新研究院，是国内最早开始中性原子量子技术研究的团队之一。',
    url: 'https://www.cascoldatom.com/',
  },
  {
    id: 'unitarylab',
    name: '酉术量子',
    shortName: 'UnitaryLab',
    description:
      '酉术专注于量子算法创新与行业赋能，依托交大团队原创的"薛定谔化"等算法框架，打造软硬件一体化解决方案，为复杂问题提供计算加速。公司已与高校，科研院所及头部企业建立战略合作关系，构建产学研协同创新生态。',
    url: 'https://unitarylab.com/',
  },
]

const logoModules = import.meta.glob<{ default: string }>(
  '../assets/exhibitors/*.{webp,svg,png,jpg,jpeg}',
  { eager: true },
)

const logoCache: Record<string, string> = {}
for (const [path, mod] of Object.entries(logoModules)) {
  const name = path.split('/').pop()!.replace(/\.(webp|svg|png|jpg|jpeg)$/i, '')
  logoCache[name] = mod.default
}

/** 按 exhibitor id 解析 logo URL；缺图返回 `undefined`，由 UI 用占位符兜底。 */
export function exhibitorLogo(id: string): string | undefined {
  return logoCache[id]
}
