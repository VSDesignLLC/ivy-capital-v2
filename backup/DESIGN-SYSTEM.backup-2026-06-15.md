# 常春藤资本官网 · Design System（审计 + 规范）

> 从 Figma 设计稿（node `83:1158` / 1440w light）提取，并对不规范的 token 做了归一化。
> 原则：**视觉静态排版保持 ~100% 还原**，仅把"脏值"收敛到干净的 scale，使每个改动 ≤2px、肉眼不可分辨。

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
--c-accent-2:  #8db4ff;   /* 深色区上的浅蓝链接 */

--c-divider:   #d8d4c8;   /* 暖灰分隔线 */
--c-hairline:  rgba(13,27,42,.10);  /* 卡片细描边 */
--c-tag-line:  rgba(13,27,42,.25);  /* 标签胶囊描边 */

--c-accent-wash: rgba(24,73,198,.05); /* marquee / 按钮底 */
--c-accent-line: rgba(24,73,198,.20); /* 蓝色细线 / 徽章描边 */
```

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
| `award-title` | 奖项标题 | SC Regular · 28 / 33 / -0.32px |
| `proj-title`  | 项目卡标题 | SC Bold · 20 / 30 / -0.2px |
| `marquee`     | 跑马灯公司名 | SC Regular · 20 / 32 |
| `body-lg`     | 关于段落 | SC Regular · 18 / 28 / -0.3px |
| `body`        | 正文 / 按钮 | SC Regular · 16 / 28 |
| `body-sm`     | 项目卡描述 | SC Regular · 13 / 19.5 |
| `nav`         | 导航链接 | SC Bold · 14 / 21 |
| `caption`     | eyebrow 大写标注 | SC Regular · 11 / 16.5 / .15em |
| `caption-12`  | 12px 标注 | SC Regular · 12 / 18 / .12em |

## 四、Spacing / Layout Tokens

```css
--space-page-x: 80px;   /* section 左右留白 */
--space-nav-x:  40px;   /* 导航左右留白 */
--w-container: 1280px;  /* 内容最大宽 (1440 - 80*2) */
--w-canvas:    1440px;  /* 设计画板宽 */

/* 8pt-ish scale (归一化后) */
--s-2: 8px;  --s-3: 12px; --s-4: 16px; --s-5: 24px;
--s-6: 30px; --s-7: 40px; --s-8: 44px; --s-9: 80px;
--sec-pad-y:  120px;    /* 常规 section 上下 */
--hero-pad-y: 240px;    /* hero 上下 */

--radius-pill: 999px;
--radius-card: 0px;      /* 策略/项目卡为直角 */
--radius-qr:   8px;
```

## 五、Motion（参考 linear.vc 的克制动效）

- **缓动**：`cubic-bezier(.22,.61,.36,1)`（ease-out 收尾），时长 0.6–0.9s
- **进场**：scroll-reveal `opacity 0→1` + `translateY 24px→0`，同组 stagger 60–90ms
- **Hero 首屏**：eyebrow → 主标题 → 副标题 依次上浮淡入
- **统计数字**：进入视口时 count-up
- **跑马灯**：无限横向滚动（hover 暂停）
- **卡片 hover**：上移 4px + 描边变蓝 + 内图轻微放大
- **链接/按钮 hover**：圆点放大、底部下划线滑入
- **导航**：滚动后背板模糊加深
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
