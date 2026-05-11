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

整个站只有一个路由，通过 12 个 section 上下排：

```
Header (sticky) → Hero → ChairIntro → GuestSection → TopicGrid
→ SpeakerCard → Schedule → Handbook → VenueMap → Traffic → NewsList → Footer
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
    │   ├── conference.ts           # 会议元信息（含大会主席 chair）
    │   ├── speakers.ts             # 14 报告人 + 3 院士嘉宾（speakers / guests 两个数组）
    │   ├── topics.ts               # 议题方向
    │   ├── schedule.ts             # 三天日程
    │   ├── news.ts                 # 会议新闻
    │   └── traffic.ts              # 交通指南
    └── components/
        ├── Header.tsx
        ├── Hero.tsx                # 倒计时 + CTA
        ├── ChairIntro.tsx          # 大会主席单卡（杨越）
        ├── GuestSection.tsx        # 特邀院士嘉宾
        ├── TopicGrid.tsx
        ├── SpeakerCard.tsx         # 报告人卡片 + Dialog 弹窗（导出 SpeakerCard / SpeakerGrid）
        ├── Schedule.tsx
        ├── Handbook.tsx
        ├── VenueMap.tsx            # 百度地图嵌入 + 三家导航跳转
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
pixi run bun run dev                    # 开发服务器（默认 8888，见 vite.config.ts；端口被占时 vite 自动选下一个）
pixi run bun run dev -- --host          # 同时监听 0.0.0.0，局域网/对端可访问
pixi run bun run build                  # 生产构建 → dist/（含 tsc -b 类型检查）
pixi run bun run preview                # 本地预览 dist/（默认 4173）
pixi run bun run preview -- --host 0.0.0.0 --port 8888   # 指定地址端口
pixi run bunx --bun tsc --noEmit        # 仅类型检查（package.json 没有 tsc 脚本，走 bunx）
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

`bun run build` 输出 `dist/`，是**纯静态资源**（HTML + 哈希化的 JS/CSS + 图片字体），任何静态托管都能跑。

### 方案 A：Cloudflare Pages / Vercel / Netlify（推荐）

- 推 GitHub → 连接平台 → 构建命令 `bun install && bun run build`，输出目录 `dist`
- 自动 HTTPS、全球 CDN、PR Preview、自定义域名

### 方案 B：自有 nginx 服务器

```bash
pixi run bun run build
```

输出在 `dist/`。按 web 根目录权限分两种推送方式。

**情况 1：web 根 owner 是当前 SSH 用户**

```bash
rsync -avz --delete dist/ <user>@<host>:/var/www/<domain>/html/
```

**情况 2：web 根 owner 是 `www-data`（更常见）**

普通用户没法直接 rsync 进 `/var/www/`，拆三步——本地 rsync 到远端 `/tmp/`，远端 sudo rsync 落 web 根，再把 owner 还回去：

```bash
# 1) 推到远端 /tmp（无 sudo）
rsync -avz --delete dist/ <user>@<host>:/tmp/qcfd2026-dist/

# 2) -t 分配 PTY 让 sudo 能弹密码，落到 web 根
ssh -t <user>@<host> "sudo rsync -a --delete /tmp/qcfd2026-dist/ /var/www/<domain>/html/"

# 3) owner 还给 www-data
ssh -t <user>@<host> "sudo chown -R www-data:www-data /var/www/<domain>/html"
```

要免密可在 sudoers 给当前用户加 `NOPASSWD: /usr/bin/rsync, /usr/bin/chown`，第 2、3 步就能合成一条非交互命令。

最小可用 nginx 配置：

```nginx
server {
  listen 80;
  server_name <domain>;
  root /var/www/<domain>/html;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
}
```

跑一次 `certbot --nginx -d <domain> --redirect` 即可拿到 Let's Encrypt 证书并自动加上 80→443 跳转，续期由 `certbot.timer` 自动处理。

> 几点小坑：
> - Ubuntu 自带的 `/etc/nginx/nginx.conf` 默认 `gzip on` 但 `gzip_types` 那行被注释掉了，结果只压 HTML 不压 JS/CSS。要么取消那段注释，要么在站点 `server { ... }` 里再写一遍 `gzip_types text/css application/javascript image/svg+xml ...`。
> - 想给 vite 出来的带 hash 资源加长缓存：`location ~* ^/assets/ { expires 1y; add_header Cache-Control "public, immutable"; }`，配合 `location = /index.html { add_header Cache-Control "no-cache"; }` 让发版立即生效。

### 方案 C：Caddy（自动 HTTPS）

```caddy
<domain> {
    root * /var/www/<domain>/html
    file_server
    encode gzip zstd
    @assets path /assets/*
    header @assets Cache-Control "public, max-age=31536000, immutable"
    header /index.html Cache-Control "no-cache, no-store, must-revalidate"
}
```

### 方案 D：GitHub Pages

仓库 Settings → Pages → Source 选 GitHub Actions；workflow 装 bun → `bun install && bun run build` → 把 `dist` 推 `gh-pages` 分支。

### 方案 E：临时通过 SSH 反向隧道暴露

适合 demo / 临时分享：本机起 `vite preview`，再用 `ssh -R` 把本机端口反向映射到一台有公网 IP 的跳板机上。

```bash
# 1) 本机起预览（vite preview 默认 127.0.0.1:4173）
pixi run bun run preview

# 2) 把跳板机的 :8000 反向映射到本机 :4173
#    -N 不开 shell，纯转发；保持前台运行
ssh -N -R 8000:127.0.0.1:4173 <user>@<jumphost>
```

跳板机上随后用 nginx / Caddy 把某条 `location` 反代到自己的 `127.0.0.1:8000` 即可对外。要让 `ssh -R` 监听跳板机的 `0.0.0.0`（而不只是它的 loopback），需在跳板机 `/etc/ssh/sshd_config` 设 `GatewayPorts yes` 并重启 sshd——一般通过 nginx 反代更安全，不必直接开放。

> 这跟 `vite dev --host` 是两回事：`--host` 只是让本机 vite 监听 `0.0.0.0`，方便同局域网设备访问，不会自动穿到公网。

---

## 七、Playwright 截图自检（MCP / 无 sudo 环境）

仓库已经把 Playwright 浏览器跑通需要的 13 个 Linux 系统库（`gtk3 / nspr / nss / libcups / libgbm / libdrm / libxcomposite / libxdamage / libxrandr / at-spi2-core / alsa-lib / pulseaudio-client / dbus`）放进了 `pixi.toml`，并提供 `scripts/chromium-wrapper.sh` 让 Playwright 自带的 Chromium 二进制 **加载 pixi 环境里的 .so 而不是系统 `/usr/lib`**。这样在没有 root 权限的机器上，Copilot 也能调用 Playwright MCP 给本地站截图。

### 7.1 一次性准备（克隆仓库后做一次）

```bash
cd qcfd2026-site
pixi install                       # 拉所有 .so 到 .pixi/envs/default/lib/
npx playwright install chromium    # 下 ~/.cache/ms-playwright/chromium-*/
chmod +x scripts/chromium-wrapper.sh
scripts/chromium-wrapper.sh --version   # 期望输出 “Google Chrome for Testing …”
```

### 7.2 MCP 配置（位于 `TiMidlY-projects/.mcp.json`）

```jsonc
"playwright": {
  "command": "npx",
  "args": [
    "-y", "@playwright/mcp@latest",
    "--browser", "chromium",
    "--executable-path",
    "<YOUR_REPO_PATH>/scripts/chromium-wrapper.sh",
    "--headless"
  ]
}
```

> wrapper 是一个 7 行 shell 脚本：注入 `LD_LIBRARY_PATH=$PROJECT/.pixi/envs/default/lib`，然后 `exec` Playwright 自带的 `chrome`。Playwright/MCP 完全无感知。把路径换成你本机 clone 的绝对路径即可。

### 7.3 在新 Copilot 会话里端到端验证

把下面这段贴给新会话，让它跑一遍，能看到截图就说明通路 OK：

```
请用 Playwright MCP 验证截图通路：
1. 探测 dev server：`ss -tlnp | grep -E ":(5173|8888)"`。
   - 已在监听（用户/上一会话起的）→ **直接复用**那个端口，跳到第 2 步，结束时**不要** kill。
   - 没在监听 → `pixi run bun run dev` 后台启动，等 Vite 输出 "Local: http://localhost:8888"。
2. 用 playwright-browser_resize 设 1280×800，playwright-browser_navigate 打开第 1 步确认的 URL（默认 http://localhost:8888/）。
3. 用 playwright-browser_take_screenshot 截一张全页 PNG，保存到 session files。
4. 再切到 390×844 + isMobile，截一张移动端首屏。
5. 用 view 工具打开两张图给我看，并简评响应式是否合理。
6. 收尾：**仅当第 1 步是自己起的 dev**，才 `kill <pid>` 关掉；复用别人开的就什么都别动（不允许 `pkill` / `killall`）。
```

如果新会话报 `Browser "chromium" is not installed` 或 `Missing system dependencies`，说明 7.1 的两条命令还没跑过；如果报 `libXXX.so not found`，说明这个 lib 在 `pixi.toml` 里漏了，按下面的 troubleshooting 处理。

### 7.4 Troubleshooting

| 现象 | 原因 / 处理 |
|---|---|
| `chromium-wrapper.sh: pixi env not found` | 没跑 `pixi install` |
| `chromium-wrapper.sh: no Playwright Chromium found` | 没跑 `npx playwright install chromium`，或者想用别的浏览器版本 → 设 `PLAYWRIGHT_CHROMIUM_BIN=/abs/path/to/chrome` 覆盖 |
| `error while loading shared libraries: libXXX.so` | 该 lib 没在 pixi env 里。先 `pixi search 'libXXX*'` 找包名，再 `pixi add <pkg>`，最后 `scripts/chromium-wrapper.sh --version` 验证 |
| MCP 报 `Missing system dependencies` 但 `--version` 通过 | 没把 `--executable-path` 指向 wrapper；MCP 默认会自己跑 `ldd` 校验它内置的那条路径，绕开它必须显式给 `--executable-path` |
| 截图全黑 / 字体缺失 | 加 `pixi add fontconfig dejavu-fonts-ttf`，或在 wrapper 里 `export FONTCONFIG_PATH=$PIXI_LIB/../etc/fonts` |
| 想换 Firefox / WebKit | 不可行：Playwright 用的是带 juggler/pwprotocol 补丁的 fork，conda-forge 上的 stock firefox 不兼容；Chromium 这条线就是官方 Chrome for Testing，没有 fork |

### 7.5 这套设计的取舍

- **wrapper 而不是改 chrome RPATH**：`patchelf` 修改后 Playwright 重装会被覆盖；wrapper 一次写好，浏览器升级也不影响。
- **pixi 而不是 `apt-get download` 解 deb**：pixi 锁定版本、跨机可复现、`pixi.lock` 进 git；deb 那套没有版本管理也无法 CI。
- **项目级而不是用户全局**：`.pixi/envs/default/` 在 `qcfd2026-site/`，删项目就全清干净；不污染 `$HOME` 或 `/usr`。

### 7.6 Agent 视觉自审工作流（推荐编辑后跑一遍）

仅仅 `tsc -b && vite build` 通过、文案出现在 bundle 里，不代表**页面看起来对**。
布局压坏、图片裁歪、移动端断行难看，这些只有靠像素层面的复核才发现得了。
因此本仓库约定：**任何改 UI 的 commit，agent 都应自己跑一遍下面的 5 步循环**——
就像人类开发会顺手刷新一下浏览器一样，agent 的"浏览器"就是 Playwright MCP + `view` 工具。

```text
1. 起 dev server：先 `ss -tlnp | grep -E ":(5173|8888)"` 探测；端口已在监听就**直接复用**那个端口，
   没在监听才自己 `pixi run bun run dev` 后台启动（默认 8888，见 vite.config.ts）。
2. playwright-browser_resize 1280×800 → playwright-browser_navigate → playwright-browser_take_screenshot 桌面全页
3. playwright-browser_resize 390×844 → 重新 navigate → 截首屏 + 滚到关键 section（speakers/schedule/guests/chair）各截一张
4. 对每张图调 view 工具自己看一眼，对比改动意图：
   - 文案/数据：新加的字段是否出现、是否按预期截断
   - 布局：移动端有没有溢出、卡片是否对齐、Hero 副标题断行是否自然
   - 图片：头像有没有歪、有没有糊
   - 占位：placeholder 是否传达"待更新"语义，而不是"乱码头像"
5. 发现问题→改→回到第 2 步；都 OK 才 commit。收尾时**只关自己第 1 步起的 dev server**
   （`ss -tlnp` 拿 PID → `kill <pid>`；复用别人开的就什么都别动；不允许 `pkill`/`killall`）。
```

关键工具一览：

| 用途 | 工具 |
|---|---|
| 启 dev server | `pixi run bun run dev` 或用户已开的 `http://localhost:8888/`（看 `vite.config.ts`）|
| 设视口 | `playwright-browser_resize` |
| 切页面 | `playwright-browser_navigate` |
| 滚到任意 section | `playwright-browser_evaluate` 里 `document.querySelector('#xxx').getBoundingClientRect()` 算偏移再 `window.scrollTo` |
| 截图 | `playwright-browser_take_screenshot`（注意 `filename` 只能写 `.playwright-mcp/<name>.png` 这种仓库相对路径，绝对路径会被 sandbox 拒）|
| 看图 | `view` 工具，支持 PNG/JPG/WebP |
| 关 server | **仅当本会话自己起的**才关：`ss -tlnp` 拿 PID → `kill <pid>`；复用别人开的不要碰（**不允许** `pkill`/`killall`）|

截图产物落在 `.playwright-mcp/`，已经在 `.gitignore` 里——这是 agent 的草稿纸，
跨会话不保留，需要长期归档的截图请显式 `cp` 到 session files 或 commit 进仓库。

> 自我克制：不要为了"看着 OK"反复猜微调。**先用文字说出"我以为它会怎样"**，
> 截图打开后逐项 √ / ✗ 对照，发现 ✗ 才动手；否则容易陷入像素级别的无效调参。

---


## 八、Codex MCP 集成（让 Copilot 把活转给 Codex）

Copilot CLI 自己只能跑一种 host model（默认 Sonnet 4.5 / 也能切到 GPT-5），但 OpenAI 自家的 `codex` CLI 内置了 **hosted 工具**——尤其是 `image_generation`——这些是 host model 拿不到的能力。把 `codex` 暴露成 MCP server 挂到 Copilot 上，就能在一个 Copilot 会话里**让 codex 当 subagent 干活**：生图、长 review、换 reasoning effort、独立 thread 等。

为什么不用 OpenAI 官方的 `openai/codex-plugin-cc`（Claude Code plugin）：那个 plugin 重度依赖 Claude 专有的 `Agent` subagent / `AskUserQuestion` / `Stop` hook，Copilot CLI 虽然能识别 `.claude-plugin` 目录，但兼容性碎（参考 issues `github/copilot-cli#1996 / #2133 / #3238`），现实里跑不出 Claude Code 那种体验。MCP 这条路反而最干净——`codex mcp-server` 暴露 `codex` 和 `codex-reply` 两个 tool，标准 MCP，session 用 `threadId` 续接。

### 8.1 一次性准备

1. 装 codex CLI 并用 ChatGPT 账号登录（**必须 ChatGPT 登录**，hosted `image_generation` 在 API key 模式下会被 codex backend 关掉）：
   ```bash
   npm install -g @openai/codex
   codex login              # 走浏览器选 ChatGPT 账号
   cat ~/.codex/auth.json | python3 -c 'import json,sys; print(json.load(sys.stdin)["auth_mode"])'
   # 期望输出：chatgpt
   ```

2. 探一下 MCP 工具面（可选，确认 server 起得来）：
   ```bash
   printf '%s\n' \
     '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"x","version":"1"}}}' \
     '{"jsonrpc":"2.0","method":"notifications/initialized"}' \
     '{"jsonrpc":"2.0","id":2,"method":"tools/list"}' \
     | timeout 10 codex mcp-server | head -2
   # 应看到 serverInfo: codex-mcp-server，tools 列表里有 codex / codex-reply
   ```

### 8.2 MCP 配置

挂在哪一层取决于你想让谁用。本仓库的取舍是 **workspace + project 双写、user scope 不动**：

```jsonc
// ~/TiMidlY-projects/.mcp.json (Workspace scope，所有 TiMidlY 子项目)
// ~/TiMidlY-projects/qcfd2026-site/.mcp.json (Project scope，本仓库)
"codex": {
  "type": "local",
  "command": "codex",
  "args": ["mcp-server"],
  "timeout": 300000
}
```

> Copilot 按 server 名字 dedup，project 那份会覆盖 workspace 同名条目；都不写也不会缺什么——克隆这个仓库的人按 README 装一遍 codex CLI 后就直接拿到 MCP，**不需要他改自己的 `~/.copilot/mcp-config.json`**。在 `/mcp` 显示里 user-level 的 server 单列在顶上，workspace 的归在 `Workspace:` 段——所以如果你看到 codex 出现在顶上单独一栏，说明你确实在 user scope 也写了一份，本仓库不依赖那一份。

**`timeout` 字段**：MCP server 配置顶层支持 `timeout`（毫秒），覆盖 Copilot client 默认的 60s 调用超时。生图通常 60-120s，调到 300000（5 分钟）留足余量。这是 client 等响应的 timeout，不是 server 进程的——server 一直在跑。

### 8.3 用法

在 Copilot 会话里直接说"让 codex 画 XX"或"用 codex tool 跑 XX"，host model 就会调 MCP `codex` / `codex-reply` 工具。命令行 dry-run：

```bash
# 直接走子进程（不经 MCP）端到端验证 hosted image_generation 可用
mkdir -p /tmp/codex-imgtest && cd /tmp/codex-imgtest
codex exec --sandbox workspace-write --skip-git-repo-check \
  "Use your built-in image_generation tool to create a 1024x1024 PNG: <你的 prompt>. Save bytes to ./out.png."
```

成功的话 `out.png` 会落盘——codex 自己 model 决定调用 `image_generation` 这个 hosted tool（Responses API 那一侧返回 base64），然后用 shell/Node 写入文件。**不是 codex 现写 Python 调 `images.generate`**——hosted tool 由 OpenAI 后端直跑，token 用量大概 30-50k 一张图。

### 8.4 已知坑

| 现象 | 原因 / 处理 |
|---|---|
| `MCP error -32001: Request timed out` | 默认 60s 超时不够生图用。本仓库已在 `.mcp.json` 给 codex 加 `"timeout": 300000`（5 分钟）。如果还是超，**server 端通常已跑完了**，文件会出现在目标路径，只是响应丢了——临时看图直接 `view` 文件即可 |
| `image_generation` 没触发 | 检查 `~/.codex/auth.json` 的 `auth_mode` 是不是 `chatgpt`；API key 模式下这个 hosted tool 被 codex backend 关掉 |
| 改了 `.mcp.json` 但 `/mcp` 没看到新 server | Copilot 启动时锁定 MCP 列表。`/restart` 或重开 `copilot` |
| codex 进程残留 | `ps -ef | grep codex mcp-server` 确认，会话退出后通常会自动收。手动清用 `kill <pid>`（本仓库约定不允许 `pkill`/`killall`） |
| 想给 codex 换更便宜的 model | MCP `codex` tool 的 input 接 `model` 字段；或在 `~/.codex/config.toml` 写 `model = "gpt-5.4-mini"` 全局降档 |

### 8.5 适用场景

| 场景 | 这条路 vs 其他 |
|---|---|
| 生图 / 编辑图 | 唯一可行路径（host model 没这能力）|
| 让 codex 用 GPT-5 系做长 review、自己再用 Sonnet 接力总结 | 比直接 `/model` 切换更灵活，可保留两条独立 thread |
| 多轮迭代同一个 codex 上下文 | 用 `codex-reply` 带 `threadId`，session 状态在 codex 进程里维护 |
| 仅仅想让 codex 跑一段命令并拿结果 | 直接 `!codex exec ...` 更轻；MCP 适合需要带回结构化结果或多轮的场景 |

---


## 九、常见问题

| 现象 | 原因 / 解决 |
|---|---|
| `vite` 启动卡在交互输入 | `bun create vite` / `npm create vite` 默认交互。本仓库已经写好 scaffold，不用再 create |
| `shadcn add` 卡住 | 加 `-y` 跳过确认；用 `bunx --bun shadcn@latest add ...` |
| Dialog 没有动画 | 检查 `src/index.css` 顶部是否有 `@import "tw-animate-css"` |
| 端口 5173 被占 | Vite 自动用 5174；要固定写 `vite.config.ts` 的 `server.port` |
| 字体没加载 | 检查网络是否能访问 `fonts.googleapis.com`；离线环境可下载到 `public/fonts/` 自托管 |

---

## 十、License

待定（议程内部使用，暂不开源）。
