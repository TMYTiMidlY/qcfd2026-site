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
pixi run bunx --bun tsc -b              # 仅类型检查
```

> **dev server 的常驻入口是 systemd unit（下一节），手动 `bun run dev` 只在以下场景用**：
>
> - 临时改 vite/tsconfig 想看错误日志直接打到终端
> - 在 **git worktree** 里干活（worktree 的 `WorkingDirectory` 跟 systemd unit 不一样，不能复用 master 的 service；这种时候手动起到一个不冲突的端口，比如 `--port 9000`，**用完关掉**）
>
> 默认 master 分支上做改动 → 不要再开第二个 dev server，直接看 8888，HMR 已经把改动推过去了。

### 加新 shadcn 组件

```bash
pixi run bunx --bun shadcn@latest add <component> -y
# 例：pixi run bunx --bun shadcn@latest add tooltip card form -y
```

`-y` 跳过交互；组件源码会被拷到 `src/components/ui/`，自由修改。

### dev server 常驻 — systemd user service（**默认入口**）

为什么用 service 而不是手动 `bun run dev`：

- agent 截图、自检、随时打开浏览器都依赖 `http://localhost:8888/` 是活的；手动一终端关掉就断
- 多个 agent 会话并存时，一份 service 即可，不会冒出 N 个 8888 抢端口
- 重启 / 注销不丢

一次性安装：

```bash
mkdir -p ~/.config/systemd/user
cp systemd/qcfd2026-site.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable --now qcfd2026-site.service
systemctl --user status qcfd2026-site.service     # active (running)
journalctl --user -u qcfd2026-site.service -f     # 实时日志
loginctl enable-linger $USER                      # 注销后也保持运行
```

unit 文件已 commit 在 `systemd/qcfd2026-site.service`，仅 7 行 ExecStart（`pixi run bun run dev`）。绝对路径里 `WorkingDirectory=<YOUR_REPO_PATH>` 是本机，**克隆到别处后改成你机器上 master worktree 的实际路径**。

> ⚠️ **唯一例外是 git worktree**：worktree 的 cwd 不等于 master 的 `WorkingDirectory`，systemd service 看不到 worktree 的代码。在 worktree 里临时改东西，要么 `bun run dev -- --port 9100` 自起一个独立端口（用完关掉），要么把改动 merge / cherry-pick 回 master，让现成的 8888 service 接管。**不要在 worktree 上偷偷起第二个 8888**，HMR 抢端口、agent 看到老分支结果、还自己骗自己"看到了"。
>
> 这是开发期便利，**不要在生产服务器**上这么跑（vite dev 走 esbuild + 内存，只适合本地）；生产部署看 §六。

---

## 五、内容更新

会议元信息、报告人、议程、新闻都集中在 `src/data/*.ts`，纯 TypeScript，改完跑 `bun run build` 重新出包即可。

报告人卡片照片：当前用首字头像 (`<Avatar />`)；如要换真实头像，给 `Speaker` 类型加 `avatar?: string` 字段、把图放到 `public/avatars/`，再在 `SpeakerCard` 里替换 `<Avatar />`。

### 来源优先级（写入 / 改动数据时遵守）

每一处文案的出处都登记在 `SOURCES.md`。当多处来源对同一字段给出不同内容时，按以下从高到低取舍：

1. **用户明确指定参考的资料**（例如用户给出某 docx / 链接，并说"以这个为准"）——最高优先级。
2. **用户明确说出的改动**（例如"把 X 改成 Y"）——同样最高优先级，可覆盖既有源 / 既有约定。
   - 必须在 `SOURCES.md` 的相关条目记录改动时间（精确到分钟即可，例如 `2026-05-12 10:05 用户口头`）和改动内容，便于回溯。
3. **会议方权威源**（`_sources/` 下的 docx / xlsx 等组委会原文件）——默认取信源。
4. **公开权威资料**（高校 / 机构官网、维基百科 / 百度百科等可核查公开资料）——用于会议方未给出的字段。
5. **AI / 维护者自行检索 / 推断的内容**——优先级最低，仅在前述来源缺失时使用，且应在 `SOURCES.md` 标记为 ⚫「润色/编辑」或 🔴「占位/暂定」。

> **歧义处理**：用户的说法如果含糊不清（例如只说"那个人的 title 不对"但没指明改成什么），不要自行猜测——用所在环境提供的提问工具（如 `ask_user`）向用户确认"是否以您本次说法为最高优先信息"，再落盘。

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

### 7.7 截图前等所有图片加载完成

`page.goto()` 或 `take_screenshot` 立刻拍，会拍到 `loading="lazy"` 还没解码、`@font-face` 还没换字体、CSS background-image 还没拉的"半成品"页面。社区/官方共识是组合三步：

1. **`waitForLoadState('networkidle')`** —— 网络静默 500ms 以上，覆盖 fetch / XHR / 普通 img / CSS background-image。
2. **滚到目标 section / fullPage 滚一遍** —— 强制触发 `loading="lazy"` 的图入场；不滚到永远不发请求。
3. **逐个 `<img>` 等 `complete && naturalWidth > 0`** —— `networkidle` 可能在 lazy 图请求发出**之前**就 idle 了；最后再硬等 DOM 里所有 `<img>` 真的解完。

```js
// 在 playwright-browser_evaluate 里跑
async () => {
  // (1) 网络静默
  await new Promise(r => setTimeout(r, 200))   // 让事件循环转一圈先
  // (2) 滚一遍触发 lazy
  await new Promise(resolve => {
    let y = 0
    const step = () => {
      window.scrollTo(0, y)
      y += window.innerHeight * 0.8
      if (y < document.body.scrollHeight) requestAnimationFrame(step)
      else { window.scrollTo(0, 0); resolve() }
    }
    step()
  })
  // (3) 等所有 img.complete
  await Promise.all(
    Array.from(document.images).map(img =>
      img.complete && img.naturalWidth > 0
        ? Promise.resolve()
        : new Promise(r => {
            img.addEventListener('load',  r, { once: true })
            img.addEventListener('error', r, { once: true })
          })
    )
  )
  // (4) 等字体解完
  if (document.fonts && document.fonts.ready) await document.fonts.ready
}
```

然后再 `take_screenshot`。MCP 调用顺序：

```text
playwright-browser_navigate   <url>
playwright-browser_wait_for   text="预期出现的某个文案" 或 time=2
playwright-browser_evaluate   function=<上面那段>
playwright-browser_take_screenshot ...
```

> `wait_for` 工具自身有 text / time 等模式，能省一次 evaluate；但对"图都加载完"这种诉求 `evaluate` 那一段是兜底。

如果只关心一个 section 的图（比如只截 `#topics`），把第 (2) 步改成 `document.querySelector('#topics').scrollIntoView({block: 'start'})` 即可，比 fullPage 滚动快。

#### 复盘：为什么"看上去截了，图却不在"

2026-05-12 一次实战栽坑：改了 Traffic.tsx 加 `<img src="/generated/traffic-map.webp">`，立即 `navigate + take_screenshot`，截出来的图里**完全没有**那张地图。当时一度怀疑是 worktree 分支错配 / dev server 端口冲突 / 缓存——全部都不是。

真正原因：**Vite cold start 第一次加载会触发依赖 re-optimize，HTML 200 返回 ≠ React 已 mount + `<img>` 已解码**。`navigate` 一返回就立刻截，恰好截到"DOM 在但图还在 304/pending"的瞬间，浏览器画面是占位空白；同样的代码，前面跑一遍上面那段 `evaluate` 之后，图就在了。

教训：截图前等图片加载完 **不是优化**，是**正确性必需**。别用"网页打开了应该就能看见"这种人类直觉来推断 playwright 行为——它不刷新、不等待，是个高速快门。

#### 截 element 时的 fixed-header 重影问题

`page.locator('section#xxx').screenshot()` 拍一个比视口高的 element，playwright 会**滚动 + 多视口拼接**。如果页面上有 `position: fixed` 的 Header / 浮动按钮，**每个视口都会拍到一份**——拼接出来就是「页面中间横着一条 Header」的鬼图。

修法：截图前临时藏掉 fixed 元素，截完恢复。

```js
// 截图前
await page.evaluate(() => {
  const h = document.querySelector('header')
  if (h) h.style.display = 'none'
})
await page.locator('section#traffic').screenshot({ path: '...png' })
// 截图后恢复
await page.evaluate(() => {
  const h = document.querySelector('header')
  if (h) h.style.display = ''
})
```

也可以用 `page.screenshot({ mask: [page.locator('header')] })` 让 playwright 在拼接时把 header 区域涂粉色——但 mask 会留下色块，不如 `display: none` 干净。

> 这个问题只在拼接（element 高于 viewport）时出现。fullPage 截图也会拼接，但 fullPage 模式下 playwright 自己处理 fixed 元素：默认只在拼好的图最上方保留一份，下方都隐藏。**所以 fullPage 不需要手动 hide header；只有 `locator(...).screenshot()` 拍超长 element 才需要。**

#### `playwright-browser_navigate` 不会强刷

`page.goto(url)` 对 same-URL 是乐观的——尤其当 URL 只是 hash 变化（`#traffic` → `#topics`），playwright 会跳过整页 reload。叠加 vite HMR WebSocket 在某些情况（HTTPS 反代后端 + 自签证书 / 内网域名）连不上，磁盘 + `journalctl --user -u qcfd2026-site` 都说 "hmr update Traffic.tsx" 推过了，但 DOM 还是旧的。

修法：截图前显式 reload。

```js
// 在 take_screenshot 之前
await page.evaluate(() => location.reload(true))
// 或者 navigate 加时间戳
await page.goto(`http://localhost:8888/?_=${Date.now()}#traffic`)
```

实战教训：DOM 跟磁盘对不上时**先怀疑 navigate 没真刷新**，别绕去查 worktree / 缓存 / build。`document.querySelectorAll('section#xxx figure').length` 一查就知道页面是不是新代码。

#### `evaluate` 大 promise 链 vs MCP 默认超时

`playwright-browser_evaluate` 默认 ~10s 超时；如果 `evaluate` 里串了"等图片加载 + 等字体 + 滚动 + 等 lazy 图发请求"，常常超时。**JS 实际上跑完了**——超时只是 MCP 等不下去，浏览器侧的副作用（DOM mutation / `style.display = 'none'` / scroll）已生效。

修法：拆短。一个 `evaluate` 只做一件能在 5s 内返回的事，长链拆成 3-4 个串行调用：

```text
evaluate  () => location.reload(true)
wait_for  time=2          # 等 React mount
evaluate  () => Array.from(document.images).every(i => i.complete)   # 探针，false 就再 wait
evaluate  () => { document.querySelector('header').style.display = 'none'; document.getElementById('traffic').scrollIntoView() }
take_screenshot ...
```

#### `mix-blend-mode: multiply` vs `darken` 在浅背景下没区别

地图 / 水彩 / 信息图想"融入页面"时，`mix-blend-mode: multiply` 是常见选择——把图直接乘到背景上，纸面变透明。`darken` 是兄弟（取 `min(top, bottom)`）。**但当背景接近纯白**（比如本站 `--color-bg = #f7f9fc`），两者出片几乎完全一样：

- multiply：`result = top × bottom / 255` → bottom ≈ 255 时 result ≈ top
- darken：`min(top, bottom)` → bottom ≈ 255 时 min ≈ top

只有背景**本身有颜色**（比如换到 `bg-bg-alt = #eff3f9` 或更深的 section）才能区分出来。同理，soft-light / overlay 这些"对比型"blend mode 在白底也基本不工作。

实战做法：**先看背景色**。背景 ≥ 95% 亮度 → 直接 `mix-blend-multiply` 或者根本不用 blend，靠 ring + 微调底色（本站 Traffic section 选了 `rounded-2xl bg-bg-alt/40 p-1 ring-1 ring-black/[0.04]` —— 极薄边 + 一点点偏蓝灰底，介于 card-surface 卡片和裸图之间）即可；背景较暗才值得花精力对比 multiply / darken / soft-light 哪个出片最好。

#### 给 user 看方案对比图，**一次只放一个**

带 caption 的 2×2 网格自我感觉效率高（一张图看 4 个方案），但实际上：
- 用户要"想象 caption 不在时是什么样"——多一层心智负担
- 缩略图尺寸下两个 blend mode 的细微差别看不出（缩到 600px 宽更糊了）
- "这上线后下面会写什么字"—— 每多一个方案都要解释一次

**正确做法**：一个方案一张独立截图，**不带 caption**（`<figcaption className="sr-only">` 给屏幕阅读器，肉眼看不见，跟上线效果一字不差）。截法：源码先固定一个方案 → 用 `evaluate` 临时改 className 截另一个，循环 N 次 → 截完不动源码。这样每张截图都是该方案的「真上线效果」，用户脑子不用做减法。

---

### 7.8 截图给 agent 看会花多少 token

截完图用 `view` 读，本质是**喂 host model 一张图**——这部分 token 进对话 context，不是免费的。Anthropic 官方公式（[vision docs](https://docs.anthropic.com/en/docs/build-with-claude/vision)）：

```
image_tokens ≈ width × height / 750
```

**只看像素尺寸**，跟文件格式（PNG / JPG / WebP）和文件大小（KB / MB）**完全无关**——模型内部都是解码成位图再处理。

**单图封顶**：

| 模型 | 单图最大 token | 占 1M context 比例 |
|---|---|---|
| Sonnet / Haiku / 旧 Opus | ~1568 | ~0.16% |
| Opus 4.7（高清） | ~4784 | ~0.48% |

超过原生分辨率（旧模型长边 1568 px、Opus 4.7 是 2576 px）会被等比缩到上限。所以一张 1920×1080 的桌面截图和一张 4000×3000 的相机原图，喂给 Sonnet 都是 ~1568 tokens。

针对本仓库截图工作流的几条结论：

- **WebP 不省 token**，省的是请求体积 / 上传带宽（API 32 MB 限制）。`public/generated/*.webp` 用 WebP 是为了**浏览器加载快**，跟 agent token 无关。
- **真要省 token**：`playwright-browser_resize` 设小一点（1280×800 比 1920×1080 便宜不到一点点，因为都顶到 1568 上限了；真有差别要降到 ≤1092×1092 长边才线性下降），或者截 element 而不是 fullPage。
- 移动端 390×844 截图：约 `390 × 844 / 750 ≈ 439 tokens`，比 1568 上限便宜 3.5 倍——移动端 review 多截几张不心疼。
- 拼图：把多张小截图合并成一张 grid 喂模型，能把 N 张图的固定开销摊到一张上（同时方便对比）。
- 极限压缩的有损 WebP（quality < 50）让小字 / 图标识别变差，但 token 数不变——**别为了省 token 去压质量，没用**。

> 一句话：**改像素尺寸，不是改格式**。一张图占 1M context 的千分之一到千分之五，循环跑 5 步 × 4 张图大概 2–3% context，不至于把对话喂爆——但 fullPage 长截图拼接出来超大的也不要无脑塞。

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
