# 其他页面 · 背景滚动透明度（bgop）proposal

> **这是 proposal，不是写回指令**。基于首页定稿的「感觉」外推，**每页仍需逐页起测试页肉眼确认**后再定稿、再交写回。
> 首页定稿参考：`hero 0 · about 0.20 · strategy 0.12 · 跑马灯删节点 · projects 0.20 · breather 0.40 · awards 0.12`。
> 背景**素材**（哪个视频）是另一件事：首页已定 `…4945_0.mp4`；其余页现共用 `assets/kling_20260612_…4326_0.mp4`，待逐页测素材时再定。本文件只谈**透明度**。

## 首页提炼出的规则（外推依据）
- **hero = 0**：hero 自带视频（其他页是 `.hax__bg`），`#pagebg` 在 hero 期间不出。建议各页 hero 显式加 `data-bgop="0"`，让滚进内容段时从 0 **淡入**（否则 initPick 会让顶部就停在内容段值、没有淡入感）。
- **内容段 = 0.12 ~ 0.20**：标准内容 0.20；密集卡片/网格压到 0.12（凸显卡片）。
- **奖项 / ticker / marquee = 0.12，且不起尖峰**（首页把跑马灯节点删掉）。
- **舒朗 / breather 段 = 0.40**（背景透出更多、更有呼吸）。

## 提案值（按页 · 按 section 顺序）

### about-ch.html（4 段，最接近首页节奏）
| section | 锚点（现状） | 建议 |
|---|---|---|
| hero | `<header class="hero hax">`（无 bgop） | 加 `data-bgop="0"` |
| directions 投资方向 | `id="directions" data-bgop="0.04"` | **0.20** |
| philosophy 投资哲学 | `id="philosophy" data-bgop="0.05"` | **0.40**（本页 breather；若行内文字偏多压不住，回落 0.20） |
| recognition 行业认可 | `id="recognition" data-bgop="0.04"` | **0.12**（含 `.ticker`，对标首页 awards） |
| empower 投后赋能 | `id="empower" data-bgop="0.05"` | **0.20** |
节奏：`0 → 0.20 → 0.40 → 0.12 → 0.20`

### team-ch.html（hero + 单网格）
| section | 锚点 | 建议 |
|---|---|---|
| hero | `<header class="hero hax">` | 加 `data-bgop="0"` |
| team 成员网格 | `id="team" data-bgop="0.04"` | **0.12**（密集卡片网格；如显平可上调 0.20） |

### portfolio-ch.html（hero + 单网格）
| section | 锚点 | 建议 |
|---|---|---|
| hero | `<header class="hero hax">` | 加 `data-bgop="0"` |
| portfolio 企业网格 | `id="portfolio" data-bgop="0.04"` | **0.12**（最密图文网格） |

### news-ch.html（hero + 单段）
| section | 锚点 | 建议 |
|---|---|---|
| hero | `<header class="hero hax">` | 加 `data-bgop="0"` |
| news 资讯卡 | `id="news" data-bgop="0.04"` | **0.20**（留白较多） |

## ★ hero→内容 交界过渡渐变（必做，已在测试页验证）

**问题**：`.hax` hero 底部是不透明奶白（`hax__fade` 渐变到 `cream-grad = rgba(--c-bg,1)`），下方内容区透出固定的 `#pagebg` 视频——两者交界处有一条**硬的水平接缝**（奶白↑ / 视频↓），滚动到此不流畅。首页观感更顺是因为交界处背景仍很淡、内容落在干净奶白上。

**修法**：在每页**第一个内容段**顶部叠一层 `奶白→透明` 竖向渐变，让背景从交界处**淡入**而非硬切。

逐页落点（渐变只加在 hero 下面那**第一个** section；section 之间是 content→content，靠 bgop 的 .9s 淡变已平滑，不需要）：
- about → `#directions`
- team → `#team`
- portfolio → `#portfolio`
- news → `#news`

CSS（已验证；**堆叠层级是关键**——渐变要盖住 `#pagebg` 但被内容压住）：
```css
/* 把 SECTION 换成该页第一个内容段 id */
#SECTION{ position:relative; z-index:1; }
#SECTION > *{ position:relative; z-index:1; }          /* 内容压在渐变之上 */
#SECTION::before{ content:""; position:absolute; left:0; right:0; top:0; height:480px;
  z-index:0; pointer-events:none;                       /* z-index:0 在 #pagebg 之上、内容之下 */
  background:linear-gradient(180deg, var(--c-bg) 0%, var(--c-bg) 8%, rgba(var(--c-bg-rgb),0) 100%); }
```
> 踩坑记录：第一次用 `z-index:-1` 渐变跑到 `#pagebg` **底下**（无效）。必须给 section 建栈（`position:relative;z-index:1`）+ 内容 `z-index:1` + 渐变 `z-index:0`。
> 高度 480px 为测试值，可按交界观感微调。顶部用 `var(--c-bg)`（=`cream-grad` 同色），与 hero 奶白底无缝衔接。

**建议做成共享层可复用规则**（比逐页 id 干净）：给首个内容段加个类 `bg-fade-top`，在 `base.css` 写一条 `.bg-fade-top{…}` + `.bg-fade-top::before{…}`，各页 hero 下第一个 section 挂这个 class 即可。

**首页是否同款**：首页交界目前靠"背景淡 + 内容落奶白"已较顺；为四页统一观感，建议首页第一个内容段（`#about`）也挂同款 `bg-fade-top`（待 Vera 确认）。

## 待确认 / 风险点
1. **philosophy = 0.40** 是最不确定的一档（取决于该段实际留白/文字量），起测试页时重点看。
2. 单段页只有一个值，背景"在 / 不在"全靠这一档；0.12 偏稳，0.20 更显素材——测时两档都扫一眼。
3. 各页背景**素材**未定，透明度观感会随素材明暗变化，定素材后可能要微调这些数值。
4. hero 加 `data-bgop="0"` 是行为微调（统一淡入），如不想改可不加（视觉差别细微）。
