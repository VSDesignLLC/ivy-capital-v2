# 常春藤资本官网 · 动效复刻

Figma 设计稿（`83:1158` / 1440w light）的高保真 HTML 复刻，含 linear.vc 风格动效。

## 文件
- `index.html` — 单文件页面（内联 CSS tokens + JS 动效）
- `DESIGN-SYSTEM.md` — 设计系统审计 + 规范化 token 表
- `assets/` — 从 Figma 导出的真实图片资源（hero / 流体金属 / 项目卡 / logo）
- `ref/` — 设计稿截图 + 复刻截图（对比用）

## 本地预览
```bash
cd ivy-capital-v2
python3 -m http.server 8765
# 打开 http://localhost:8765/index.html   （设计为 1440px 画板宽）
```

## 动效（参考 linear.vc 的克制风格）
- 首屏 eyebrow → 标题 → 副标题 依次上浮淡入
- 滚动进场：`opacity + translateY`，同组 stagger，`cubic-bezier(.22,.61,.36,1)`
- 统计数字进入视口时 count-up
- 跑马灯无限横滚（hover 暂停）
- 卡片 hover 上浮 + 描边变蓝 + 内图微放大
- 导航滚动后背板模糊加深
- 全量尊重 `prefers-reduced-motion`

## 设计系统要点（详见 DESIGN-SYSTEM.md）
- 色：底 `#faf9f6` · 墨 `#0d1b2a` · 品牌蓝 `#1849c6` · 次文 `#2c3a4a` · 灰 `#7a7e8a`
- 字：Noto Sans SC（正文）/ Noto Serif SC（章节标题·金句）/ Geist·Geist Mono（数字·标注）/ Instrument Serif（罗马数字·年份斜体）
- 审计已归一化字距漂移（2.2/1.98/1.65/0.33 → 统一 caption scale）与缩放脏值（31.7→32、29.8→30、23.04→24、43.2→44）
