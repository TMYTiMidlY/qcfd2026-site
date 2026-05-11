# archive/generated/

GPT-image-2 生成图片归档 — 这些是历史版本 / 已下架 / 备份，**不在 public/ 内**，因此不会进 production bundle，也不会被 URL 直接访问。

保留原因：未来如果设计方案回调，或想对比历史版本，比 codex `~/.codex/generated_images/` 的 hash 路径更可读。

## 当前归档清单

### 已下架（站点 section 删除或重做后留下的孤儿）
- `chair-banner.png` — 旧 ChairIntro 学者书墙 banner（2026-05-11 用户：主席的图不要了）
- `schedule-cover.png` — 旧 Schedule 摊开手册 cover（同上：回忆手册的不要了）
- `news-preview.png` / `news-recap-2024.png` / `news-recap-2025.png` — 旧 News 实物摄影缩略图（同上：新闻的不要了）
- `qcfd-mark.png` / `qcfd-mark-raw.png` — 金色 QCFD 圆形浮雕字标（同上：金色QCFD换掉）
- `topics/topic-1..6.png` — 旧 6 张 topic 卡片底图，被新 `topics-banner.png` 取代

### 备份（在用图片的旧版本，方便快速回滚）
- `hero-poster.backup-19-29.png` — 当前 `hero-poster.png` 的初代版本（1983×793，文字偏右那版，但元素好）
- `qcfd-logo.backup-v1.png` — 当前 `qcfd-logo.png` 的 v1（仅 "QCFD" 单行，无 "2026"）

## 在用图片在哪
全部在 `public/generated/` 下，由组件直接 `<img src="/generated/..." />` 引用。
