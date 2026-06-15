# 常春藤资本官网 · Design System（审计 + 规范）

> 从 Figma 设计稿（node `83:1158` / 1440w light）提取，并对不规范的 token 做了归一化。
> 原则：**视觉静态排版保持 ~100% 还原**，仅把"脏值"收敛到干净的 scale，使每个改动 ≤2px、肉眼不可分辨。
>
> **事实源 = `homepage-ch.html`（生产主文件）。** 本文档与 `design-system.html` 均以它反向审计对齐；§一/六.1/六.2 为历史记录，最新状态见 **§六.3 v3 更新**，冲突处以 v3 为准。
> 最近一次对齐：2026-06-15（V5 浮动胶囊 nav · 液态玻璃按钮 · B5 footer · 奖项文字 ticker · 正方项目卡 · `--c-accent-2` 提升为 token）。

---

## 一、Audit：设计稿里发现的 token 不规范

| # | 现象 | Figma 原始值 | 问题 | 规范化处理 |
|---|------|------------|------|-----------|
| 1 | 同一个 11px 大写 caption，字距漂移 | `2.2px` / `1.98px` / `1.65px` / `0.33px` | 同一语义 token 出现 4 种 tracking | 收敛为 `--tracking-caption: 0.15em`（≈1.65/11），tag 用 `0.03em` |
| 2 | 卡片标题字号是缩放脏值 | `31.7px` / lh `32.95` / `-0.317` | 来自 ~0.99 缩放因子，非整数 | → `32px` / lh `33` / `-0.32` |
| 3 | Hero 主标题不在 token 表内 | `108px` Bold | 最大字号没建 token | 新增 `--fs-display: 108px` |
| 4 | 背景奶白色有两个近似值 | `#fafaf7` vs `rgba(250,248,247)` | 两个肉眼相同的 cream | 统一 `--c-bg: #faf9f6`（取中值） |
| 5 | 栅格间距脏值 | `43.2` / `29.8` / `23.04` / `226.453` | 缩放产生的小数 | → `44` / `30` / `24` （8pt-ish scale） |
| 6 | 卡片描边有 3 套 | `#d8d4c8` / `rgba(13,27,42,.1)` / `rgba(13,27,42,.25)` | 暖灰 + 两档冷灰透明 | 保留为 3 个语义 token（divider / hairline / tag） |
| 7 | Award 标题与 Card 标题字号不一致 | `28px` vs `31.7px` | 相似语义不同字号 | 各自保留（确属不同层级），但 lh/tracking 对齐 |

---

## 二、Color Tokens

```css
--c-bg:        #faf9f6;   /* 页面奶白底 (统一 #fafaf7 / 250,248,247) */
--c-ink:       #0d1b2a;   /* 主文字 / 深色区底 (navy ink) */
--c-slate:     #2c3a4a;   /* 次级正文 */
--c-muted:     #7a7e8a;   /* caption / eyebrow 灰 */
--c-accent:    #1849c6;   /* 品牌蓝 (唯一强调色) */
--c-accent-2:  #8db4ff;   /* 浅蓝；玻璃描边环 / 奖项卡 hover，以 color-mix 调透明度 */

--c-divider:   #d8d4c8;   /* 暖灰分隔线 */
--c-hairline:  rgba(13,27,42,.10);  /* 卡片细描边 */
--c-tag-line:  rgba(13,27,42,.25);  /* 标签胶囊描边 */

--c-accent-wash: rgba(24,73,198,.05); /* marquee / 按钮底 */
--c-accent-line: rgba(24,73,198,.20); /* 蓝色细线 / 徽章描边 */

--c-grid:      #b6bdcd;   /* 蓝图网格线 / 导轨（冷灰） */
--cream-grad:  rgba(250,249,246,1);  /* hero / footer 渐隐用（≈ --c-bg） */
```

> `--c-accent-2` 现为真 token；带透明度的用法统一写成 `color-mix(in srgb, var(--c-accent-2) N%, transparent)`（N = 28 / 50 / 85）。

## 三、Typography Tokens

字体族（均可由 Google Fonts 提供）：
```css
--ff-sc:    "Noto Sans SC";    /* 中文正文 / 标题主力 */
--ff-serif: "Noto Serif SC";   /* 章节中文标题 / 金句 / ◆ */
--ff-sans:  "Geist";           /* 拉丁数字 (统计大数) */
--ff-mono:  "Geist Mono";      /* 代码感标注 · ICP · 城市 */
--ff-ital:  "Instrument Serif";/* 罗马数字 i.ii.iii. · 年份斜体 */
```

| Token | 用途 | font / size / line / tracking |
|-------|------|------------------------------|
| `display`     | Hero 主标题 常春藤资本 | SC Bold · 108 / 112 / -0.64px |
| `h1-sub`      | Hero 副标题 | SC Regular · 54 / 64 / -0.64px |
| `stat`        | 统计大数 2007/240亿 | Geist Medium · 64 / 64 / -1.92px |
| `section`     | 章节标题 关于我们 | Serif Medium · 36 / 42 / -0.64px |
| `roman`       | 罗马数字 i. | Instrument Serif Italic · 36 / 42 |
| `quote`       | 金句 | Serif Regular · 34 / 45.9 / -0.34px |
| `card-title`  | 策略卡标题 | SC Regular · 32 / 33 / -0.32px |
| `award-org`   | 奖项卡机构名 | **Serif 600 · 26 / -0.3px**（原 award-title 28 已改） |
| `award-body`  | 奖项卡奖项名 + kicker | SC Regular 14 / 22 · kicker Mono 10 / .2em up |
| `proj-title`  | 项目卡标题 | SC Bold · **22 / 29 / -0.2px**（原 20 已改） |
| `marquee`     | 跑马灯公司名 | SC Regular · 20 / 32 |
| `footer-slogan` | Footer 标语 | **Serif Regular · 24 / 51.2 / -0.4px** |
| `footer-loc`  | Footer 地址卡 | city SC Bold 20 / 30 / -0.2 · addr SC 16 / 28（纯黑） |
| `body-lg`     | 关于段落 / intro | SC Regular · 18 / 28 / -0.3px |
| `body`        | 正文 | SC Regular · 16 / 28 |
| `body-sm`     | 项目卡描述 | SC Regular · 13 / 19.5 |
| `mailpill`    | Footer 邮箱胶囊 | SC Regular · 17 / 1 |
| `nav`         | 导航链接 | SC Medium · 14 / 21 |
| `caption`     | eyebrow 大写标注 | SC Regular · 11 / 16.5 / .15em |
| `caption-12`  | 12px 标注 | SC Regular · 12 / 18 / .12em |

> **字距说明**：`--tracking-caption:0.15em` 是基准，但生产里大写标注实际仍按语境分档——eyebrow / kicker `.2em`、统计标签 `.18em`、标签胶囊 `.03em`、ICP `≈.12em`。审计表 #1 的"统一到 .15em"为部分落地，非全量。

## 四、Spacing / Layout Tokens

生产里**真正存在的只有 4 个布局 token**（与 `homepage-ch.html` 的 `:root` 一致）：

```css
--rail:    64px;    /* 网格导轨外框 / 标题带高度；marquee·footer 内缩到此 */
--page-x:  80px;    /* section 左右留白 */
--gap:     120px;   /* 常规 section 上下节奏 */
--maxw:    1760px;  /* 页面流体自适应，最大宽 1760（非固定 1440） */
```

> 旧版 MD 里的 `--space-*` / `--w-container` / `--s-2..s-9` / `--sec-pad-y` / `--hero-pad-y` / `--radius-*` **并不是生产 token**，已移除。下面这些只是沿用的**参考刻度**，非 CSS 变量：

- **8pt-ish 间距刻度**：`8 · 12 · 16 · 24 · 30 · 40`（社交/标签间距、卡片内距、卡片 gap、策略卡 gap、nav 链接 gap 等取自此）。
- **圆角**：胶囊 / 按钮 / nav = `999`；徽章 / 标签 = `100`；策略卡 / 项目卡 / footer 地址卡 = `0`（直角）。旧的 `--radius-qr:8px` 已无对应（B5 footer 地址卡为直角）。

## 五、Motion（参考 linear.vc 的克制动效）

**三条缓动**（生产 `:root`）：
- `--ease` = `cubic-bezier(.22,.61,.36,1)`（主，ease-out 收尾）
- `--ease-soft` = `cubic-bezier(.16,1,.3,1)`（expo-out，卡片上浮 / 霜玻璃块生长 / tags 展开）
- `--ease-io` = `cubic-bezier(.45,.05,.55,.95)`（in-out，呼吸光晕循环）

时长 0.35–1.4s。

- **进场**：scroll-reveal `opacity 0→1` + `translateY 24px→0`，同组 stagger 60–90ms（0.8s）
- **Hero 首屏 / 金句**：逐字显影（per-char opacity + translateY + blur，0.56s 左→右 stagger）；"I Value You" 首字母聚合编排
- **统计数字**：进入视口 count-up（1.4s easeOutCubic）
- **网格绘入**：竖线 `scaleY 0→1`，transform-origin top（1.4s）
- **跑马灯 / 奖项 ticker**：无限横向滚动（38s / 44s，hover 暂停）
- **策略卡 / 项目卡 hover**：上移 **6px** + 描边变蓝 + 内图 scale 1.06；项目卡底部霜玻璃块从下生长 + 描述展开
- **奖项文字卡 hover**：浅底 → 深 navy 翻色（文字转白、浅蓝 kicker/引号浮现）
- **按钮 hover**：上移 2px scale 1.015 + 高光下滑 + 蓝点放大发光
- **导航链接 hover**：底部下划线滑入；**导航整条**滚动向下时收起（tuck），向上时回落
- 全部尊重 `prefers-reduced-motion`

---

## 六、v2 更新（node `133:5262` 最终稿）

### 6.1 蓝图网格系统（Blueprint Grid）— 从属关系

设计稿未显式标注网格从属，以下为**视觉审核 + Background 层 vector 节点坐标**还原的结论：

| 层级 | 元素 | 坐标 | 实现 |
|------|------|------|------|
| **全局（贯穿全页）** | 左竖向导轨 | x=64，y 64→底 | `.grid-overlay .rail.l` |
| **全局（贯穿全页）** | 右竖向导轨 | x=1377，y 64→底 | `.grid-overlay .rail.r` |
| **跨 section（贯穿局部）** | 装饰竖线 ×5 | x=940(y1088-2676)、x=499(y1962-2676)、x=394/720(y2731-4158)、x=1046(y2738-4158) | `.grid-overlay .v1…v5`，更淡（opacity .32） |
| **section 内** | 章节标题带 | 每个 boxed 标题：上下两条满宽横线 + 居中 440px 蓝框 + 角标 | `.sec-band` / `.sec-box` |
| **section 内** | Hero 眉栏短竖线 + “I Value You” | 底部居中，h110 | `.hero__ivy` |
| **section 内** | Footer 两条满宽横线（y0、y395） | | `.footer__rule` |

> 关键：网格 overlay 的 z-index 低于各 section 内容 → 导轨只在奶白底处透出，被 Hero 大图 / 卡片等不透明元素遮挡（与设计稿一致）。
> 网格 hairline 统一色 `--c-grid:#b6bdcd`（取自 marquee 边框）。

**竖线的核心规则（v2.1 修正）：横向线条（标题带 / 跑马灯 / breather）在视觉上从左到右切分界面，这与工程上的 section 边界无关；因此每条竖线必须"从一条横线开始、到另一条横线结束"，不得越界。**
实现上用 JS 把竖线的 `top/height` 锚定到真实渲染的横向分隔元素，宽度变化时实时重算：

| 竖线 | x（≈1440 基准，随栅格列缝缩放） | 起点横线 | 终点横线 |
|------|------|---------|---------|
| 全局导轨 ×2 | left 64 / right 64 | 顶 | **直达页面底**（footer 也贯穿） |
| sA | 940（投资策略右列缝） | 关于我们标题带下沿 | 跑马灯上沿 |
| sB | 499（投资策略左列缝） | 投资策略卡片上沿 | 跑马灯上沿 |
| p1/p2/p3 | 394 / 720 / 1046（代表项目 4 列缝） | 跑马灯下沿 | 奖项标题带上沿（穿过 breather） |

其它修正：① 标题框 **II.投资策略 左对齐**（I./IV. 居中）；② **breather 文字左对齐**；③ 奖项改**自动 ticker**（无手动滚动条）；④ footer 流体图**内缩到左右导轨与底线之间**（不铺满），导轨直达底；⑤ 页面宽度 100% 自适应（max-width 1760）；⑥ 修复 hero 眉栏 `.loc` 类名与 footer 地址卡冲突导致的灰方块。

### 6.2 布局变更
- **章节标题**：I. 关于 / II. 投资策略 / IV. 奖项 → **居中蓝框 + 角标**（blueprint header）；III. 代表项目 → 左对齐内联标题。
- **关于我们**：由 2×2 stat 网格 → **左文字+按钮+图，右侧 4 个数字纵向堆叠（395px）**。
- **Hero**：底部新增 `I Value You` 斜体 + 下垂短竖线。
- **跑马灯**：左右内缩到导轨 x=64（原满宽）。
- **奖项（IV.）**：由列表 → **6 张机构卡横向画廊**（清科/投中/融资中国/甲子光年/LP智库/上海股权投资协会），可横向滚动。
- **Footer**：重做为浅色（奶白渐变 + 右侧流体图）；serif 标语 + 3 社交圆钮 + 上海/香港玻璃地址卡 + 项目投递/工作机会 胶囊按钮 + ICP。
- 新增 token：`--c-grid:#b6bdcd`（网格线）。

### 6.3 v3 更新（当前生产 = `homepage-ch.html`）

> 本节为最新状态，与 §二–五、`design-system.html` 对齐；与 6.1/6.2 冲突处以本节为准。

- **导航 → V5 浮动胶囊**：`top:14px` 居中、`h:56`、宽 `min(100%,1760)-2*80`；液态玻璃（多重 inset 高光 + 蓝调描边环 `::after`）；向下滚动收起（`.tuck`）、向上回落。
- **按钮 → 液态玻璃**：白玻璃渐变 + `::before` specular 高光（hover 下滑）+ `::after` 蓝调描边环 + `.dot` 呼吸蓝点光晕；hover 上移 2px / scale 1.015。
- **奖项（IV.）→ 自动 ticker 文字卡 `.tc`**（替代 6.2 的图片画廊）：浅底卡，hover 翻成深 navy（org 转白、浅蓝 kicker + Instrument 大引号水印）；宽 340 / min-h 200。
- **代表项目卡 `.pcard` → 正方全出血图**：底部霜玻璃块 hover 从下生长（`clip-path`）+ 蓝/白细线 + 描述展开；标题 22/29。
- **Footer → B5 融入版**：背景纹理图（去掉旧奶白渐变 `.fade`）；左 serif 标语 + 3 社交圆钮（56）；右 上海/香港**正方地址卡**（默认纯文字 + 顶线，hover 才浮出天际线底图）；分隔线下为 logo（左）+ 项目投递/工作机会 `.mailpill` 玻璃胶囊（右）+ ICP。`min-height:420`（上下间距对称）。
- **新增 token**：`--c-accent-2:#8db4ff`（玻璃描边环 / 奖项卡 hover，透明度用 `color-mix`）；`--tracking-caption:0.15em`；缓动补 `--ease-soft` / `--ease-io`。
- **布局 token 正名**：以 `--rail / --page-x / --gap / --maxw` 为准（详见 §四），旧的 `--space-* / --w-* / --s-* / --radius-*` 文档名作废。
