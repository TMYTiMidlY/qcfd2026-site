# QCFD 2026 会议官网

第三届流体力学量子计算前沿研讨会（**Q**uantum **C**omputing for **F**luid **D**ynamics 2026）官方网站源码 —— 单页深色学术风、纯静态、零后端。

> 会议时间：2026 年 5 月 22 – 24 日　|　地点：合肥翡翠湖迎宾馆 3 号楼

---

## 一、技术栈

| 层 | 选型 | 备注 |
|---|---|---|
| 系统级依赖管理 | **pixi** | 锁定 `bun`、`unzip`，不污染全局也无需 sudo |
| JS 包管理 / 运行时 | **Bun 1.3** | 替代 npm；安装/build 都比 node 快一截 |
| 构建工具 | **Vite 7** | 原生 ESM、即时 HMR、Rollup 打包 |
| UI 框架 | **React 19** + **TypeScript 5.6** | strict 模式 |
| 样式 | **Tailwind CSS v4** | 用 `@tailwindcss/vite` 插件，CSS-first 的 `@theme {}` 设计 token |
| 组件库 | **shadcn/ui**（new-york style，slate base） | 通过 `bunx shadcn add` 把组件源码拷进 `src/components/ui/`；当前已加 `Button`、`Badge`、`Dialog` |
| 底层组件原语 | **radix-ui** | shadcn Dialog 自动带入；提供无障碍、键盘交互 |
| 动画 | **tw-animate-css** | 提供 `animate-in / fade-in-0 / zoom-in-95` 等 utility，shadcn Dialog 用 |
| 图标 | **lucide-react** | |
| 工具函数 | `clsx` + `tailwind-merge`（合在 `cn()`）、`class-variance-authority` | shadcn 标配 |
| 路由 | 无 | 单页锚点滚动（`#guests / #topics / #speakers / #schedule / #venue ...`），不需要 react-router |
| 状态管理 | 无 | 局部 `useState` 就够 |
| 后端 / API | 无 | 纯静态 |

---

## 二、设计思路

### 2.1 视觉语言

**深色 + 极光科技感**，呼应"量子计算"主题：

- 主色 `#38bdf8`（sky-400，量子蓝），辅 `#22d3ee`（青）和 `#a78bfa`（紫），构成 hero 的 aurora 渐变
- 底色 `#0b0f17`（接近黑）+ 卡片 `#131b2a`，对比 token 都集中在 `src/index.css` 的 `@theme {}`
- 中文字体 `Noto Sans SC`，西文 `Inter`，启用 `ss01 / cv11` 字符变体提升可读性
- 标题用 `letter-spacing: -0.02em`，靠拢学术海报观感

### 2.2 设计 token 双套并存

`src/index.css` 同时维护两套 CSS 变量：

1. **业务 token**：`--color-bg / --color-fg / --color-primary / --color-accent ...` —— 给我们自己写的组件 (`bg-primary`, `text-fg-soft`) 用
2. **shadcn 标准 token**：`--color-background / --color-foreground / --color-primary-foreground / --color-destructive ...` —— 映射到业务 token，供 shadcn 生成的组件 (`bg-primary text-primary-foreground`) 直接用

这样 `bunx shadcn add <component>` 拿来的组件 **零改动** 就跟我们的 brand 色一致。

### 2.3 自定义 utility

Tailwind v4 的 `@utility` 指令直接在 CSS 里写：

```css
@utility section-pad   { padding-block: clamp(4rem, 8vw, 7rem); }
@utility container-page { width: min(100% - 2.5rem, 1180px); margin-inline: auto; }
@utility eyebrow       { ...小标签胶囊样式... }
@utility card-surface  { ...玻璃卡片... }
```

避免每个 section 都重复一长串 className。

### 2.4 数据层与组件分离

- `src/data/*.ts` 只放数据（speakers, topics, schedule, news, conference, traffic）
- `src/components/*.tsx` 只放展示
- 改会议信息、加报告人、调日程，**只改 `data/`**，组件不动

### 2.5 单页 + 锚点滚动

整个站只有一个路由，通过 11 个 section 上下排：

```
Header (sticky) → Hero → GuestSection → TopicGrid → SpeakerCard
→ Schedule → Handbook → VenueMap → Traffic → NewsList → Footer
```

Header 提供锚点导航，`html { scroll-behavior: smooth }` 让点击平滑滚动。

### 2.6 响应式断点

依赖 Tailwind 默认断点：`sm 640 / md 768 / lg 1024 / xl 1280`。
- 移动端：单列卡片、Header 折叠成汉堡
- 桌面端：3 列报告人网格、双列地图+信息

---

## 三、项目结构

```
qcfd2026-site/
├── pixi.toml / pixi.lock           # 系统依赖（bun + unzip）
├── package.json / bun.lock         # JS 依赖
├── components.json                 # shadcn/ui 配置（new-york / slate / cssVariables）
├── vite.config.ts                  # react + tailwindcss + @ alias
├── tsconfig.{json,app.json,node.json}
├── index.html                      # 引入 Inter + Noto Sans SC Google Fonts
├── public/
│   └── favicon.svg                 # 自绘量子原子图标
└── src/
    ├── main.tsx / App.tsx          # 入口 + 11 个 section 组装
    ├── index.css                   # @import tailwindcss + tw-animate-css
    │                                # @theme 双套设计 token
    │                                # @utility 自定义 utility
    ├── lib/utils.ts                # cn() helper
    ├── data/
    │   ├── conference.ts           # 会议元信息
    │   ├── speakers.ts             # 11 报告人 + 3 院士嘉宾
    │   ├── topics.ts               # 议题方向
    │   ├── schedule.ts             # 三天日程
    │   ├── news.ts                 # 会议新闻
    │   └── traffic.ts              # 交通指南
    └── components/
        ├── Header.tsx
        ├── Hero.tsx                # 倒计时 + CTA
        ├── GuestSection.tsx        # 特邀院士嘉宾
        ├── TopicGrid.tsx
        ├── SpeakerCard.tsx         # 报告人卡片 + Dialog 弹窗
        ├── Schedule.tsx
        ├── Handbook.tsx
        ├── VenueMap.tsx            # 高德嵌入 + 双地图导航
        ├── Traffic.tsx
        ├── NewsList.tsx
        ├── Footer.tsx
        └── ui/                     # shadcn/ui 组件（CLI 拉的，可继续 add）
            ├── button.tsx
            ├── badge.tsx
            └── dialog.tsx
```

---

## 四、本地开发

### 首次准备

```bash
cd qcfd2026-site
pixi install              # 准备 bun + unzip 环境（约 30 MB）
pixi run bun install      # 安装 JS 依赖
```

### 常用命令

```bash
pixi run bun run dev                    # 开发服务器（5173 / 5174 自动避让）
pixi run bun run dev -- --host          # 监听 0.0.0.0，局域网/对端可访问
pixi run bun run build                  # 生产构建 → dist/
pixi run bun run preview                # 本地预览 dist/（默认 4173）
pixi run bun run preview -- --host 0.0.0.0 --port 8888   # 指定地址端口
pixi run bun run tsc --noEmit           # 类型检查
```

### 加新 shadcn 组件

```bash
pixi run bunx --bun shadcn@latest add <component> -y
# 例：pixi run bunx --bun shadcn@latest add tooltip card form -y
```

`-y` 跳过交互；组件源码会被拷到 `src/components/ui/`，自由修改。

---

## 五、内容更新

会议元信息、报告人、议程、新闻都集中在 `src/data/*.ts`，纯 TypeScript，改完跑 `bun run build` 重新出包即可。

报告人卡片照片：当前用首字头像 (`<Avatar />`)；如要换真实头像，给 `Speaker` 类型加 `avatar?: string` 字段、把图放到 `public/avatars/`，再在 `SpeakerCard` 里替换 `<Avatar />`。

---

## 六、部署

`bun run build` 输出 `dist/`，约 60 KB CSS（gzip 10）+ 311 KB JS（gzip 102），是**纯静态资源**，丢哪都行。

### 方案 A：Cloudflare Pages / Vercel / Netlify（推荐）

- 推 GitHub → 连接平台 → 构建命令 `bun install && bun run build`，输出目录 `dist`
- 自动 HTTPS、全球 CDN、PR Preview、自定义域名

### 方案 B：自有服务器 (nginx / Caddy)

```bash
pixi run bun run build
rsync -avz --delete dist/ user@host:/var/www/qcfd2026/
```

nginx 配置：

```nginx
server {
  server_name qcfd2026.example.com;
  root /var/www/qcfd2026;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
}
```

### 方案 C：GitHub Pages

仓库 Settings → Pages → Source 选 GitHub Actions；workflow 装 bun → `bun install && bun run build` → 把 `dist` 推 `gh-pages` 分支。

### 方案 D：临时通过 SSH 反向隧道暴露

适合 demo 或临时分享，本机起 `vite preview`，再 `ssh -R` 转给跳板机。详见本仓库 `dev` 部分的 `--host` 用法。

---

## 七、常见问题

| 现象 | 原因 / 解决 |
|---|---|
| `vite` 启动卡在交互输入 | `bun create vite` / `npm create vite` 默认交互。本仓库已经写好 scaffold，不用再 create |
| `shadcn add` 卡住 | 加 `-y` 跳过确认；用 `bunx --bun shadcn@latest add ...` |
| Dialog 没有动画 | 检查 `src/index.css` 顶部是否有 `@import "tw-animate-css"` |
| 端口 5173 被占 | Vite 自动用 5174；要固定写 `vite.config.ts` 的 `server.port` |
| 字体没加载 | 检查网络是否能访问 `fonts.googleapis.com`；离线环境可下载到 `public/fonts/` 自托管 |

---

## 八、License

待定（议程内部使用，暂不开源）。
