# 0622 新素材 · 现状说明 + 使用 proposal

> **用途**：队友 0622 交付了一批重新出的素材（`assets/0622/`）。本文件是**只读 audit 的结论 + 使用建议**，给后续**写回 agent** 做选材/落地依据。
> **本文件作者只做了 audit，未改动/未改名/未移动任何素材**；下面所有"建议"都待 Vera + 写回 agent 拍板执行。
> 判重依据 = `md5` 逐字节比对；生产现状 = `grep` 真实引用；视觉差异 = ffmpeg 抽帧/缩略肉眼看。日期：2026-06-22。

---

## 一、0622 交付物总览（`assets/0622/`）

```
assets/0622/
├─ 常春藤官网-素材清单.xlsx        ← 全站素材台账（见 §四）
└─ 常春藤网站所有素材/
   ├─ bg video/      2 条 mp4（0618 出）        — 全站固定背景 氛围视频 候选
   ├─ footer/        5 张 png（ChatGPT 0619）   — 页脚底纹 候选（玻璃折射）
   ├─ glass/         99 张 jpg（哈希名）        — 磨砂/竖纹玻璃 纹理素材库
   ├─ metal/         16 张 jpg（哈希名）        — 液态铬/水银 纹理素材库
   └─ selected images/  成品 png（已策展）      — strategy / philosophy / empower
```

---

## 二、逐类现状 + 判定

### ① `selected images/` — 已策展成品（最关键）

| 子组 | 文件 | 与生产对比（实测） | 判定 |
|---|---|---|---|
| **strategy 策略 3** | `01·AI（软件及硬件）` / `02·芯片与半导体` / `03·智能制造` | **md5 与生产 `strategy-ai/chip/manufacturing.png` 逐字节相同** | 🟰 **纯重复**，生产已有，丢弃副本 |
| **philosophy 哲学 3 (+1变体)** | `01·原则 Integrity` / `02·愿景 Vision` / `03·初心 Yearning`（另有 `原则 Integrity i` 变体） | 全新高清 PNG（~1.7–1.9MB）；**艺术方向与现用不同**：新=金属树/光隧道/水波纹、横构图；现用 `philosophy-*.jpg`=磨砂玻璃、竖构图、低清(76–268KB) | 🔁 **替换候选**，需定"换不换方向" |
| **empower 赋能 3概念×2变体** | `智囊后援`×2 / `生态共振`×2 / `伴跑者`×2 | 当前 about「投后赋能」3 卡用的是**占位图**（见 §三） | 🆕 **真新增**，补占位坑；每概念**二选一** |

md5 对照（strategy 三张 = 纯重复，可直接确认）：
```
strategy-ai.png            fd1a8647bf374863ec3e3277d49a5459 == 01·AI（软件及硬件）.png
strategy-chip.png          499c0f867d24f9cd702fa00d5ba7257b == 02·芯片与半导体.png
strategy-manufacturing.png a5ed4e0cc060ac32945324ea3d49a54c == 03·智能制造.png
```

### ② `bg video/` — 2 条新氛围视频（0618）
- `kling_20260618_…5213_0.mp4`、`kling_20260618_…5242_0.mp4`。
- **比现用明显更白、更淡**（接近纯氛围底色）；现用 `home-bg.mp4`(=5219) / 首页已选 `4945` 都是带蓝紫流体、更显色。
- 不与任何现有视频重复，是"更极简"方向的备选。**需在背景透明度测试里和 4945 对比后定**。

### ③ `footer/` — 5 张页脚底纹候选（ChatGPT 0619）
- 全是**冰晶/虹彩玻璃折射**（静态图），与现用 `footer-bg.jpg`（暗调）不同方向。
- ⚠ **方向冲突提醒**：页脚背景**刚定为「视频 B（5143_0.mp4）+ 全屏宽度 + 60%」**（见 `tests/0618/footer/footer-final.html`）。这 5 张是**静态图路线**，与已定的视频路线互斥——除非 Vera 想推翻回静态图，否则这批可能不用。**留作备选，标注与现方向冲突。**

### ④⑤ `glass/`(99) + `metal/`(16) — 原始纹理素材库
- glass = 绿/蓝/teal 调磨砂玻璃、竖纹、bokeh；metal = 液态铬/水银漩涡。
- **不是成品**：哈希命名、数量大、风格杂，是供挑选的 **source pool**。
- 判定：**整体留在 `assets/0622/` 作素材池，不进 `assets/` 根、不入部署**。需要时从中挑图，挑中再按规范改名落地。

---

## 三、生产现状（grep 实测，作落地锚点）

| 区域 | 文件:行 | 当前用图 | 备注 |
|---|---|---|---|
| about 投资哲学 | `about-ch.html` `.phil-row` 80/82/84 | `philosophy-integrity/vision/yearning.jpg` | 终版 hover 已定（见 memory `philosophy-rows-final`），换图不应破坏其 hover 逻辑 |
| homepage 投资策略 3 卡 | `homepage-ch.html` 200/207/214 | `strategy-ai/chip/manufacturing.png` | = 0622 strategy 三张（同文件） |
| about 投资方向 3 卡 | `about-ch.html` 226/233/240 | 3 卡**都用** `strategy-flow.png`（单图） | 台账要求改成与首页策略一致的 3-独立图设计 → 可复用上面 3 张 |
| about 投后赋能 3 卡 | `about-ch.html` `ecard__bg` 333/347/361 | **占位**：`strategy-flow.png` / `footer-shanghai.jpg` / `footer-hongkong.jpg` | ← empower 新图就是填这 3 个坑 |

**内部重复**（顺带发现）：`home-bg.mp4` == `team-hero.mp4` == `0617/…5219_0.mp4`（三者同 md5 `7500a02c…`），是同一条视频。

---

## 四、`素材清单.xlsx` = 全站素材台账

队友给的清单把全站素材分为 **现有 / 新增需做 / 待补充**，很完整。要点：
- **现有**（不动）：全站背景视频、logo、社交图标、城市图、页脚底纹、首页 hero 视频、策略卡、项目卡。
- **新增需做**：4 个子页 hero 视频 + 关于·投资方向卡背景图 + 被投·logo + 被投·背景图。
- **待补充**（等真实内容）：团队成员照（~8）、文章封面（61）。
- **大头**：被投 79 家 ×(logo+官网背景) = **158 张** + 文章封面 **61 张** + 团队 ~8 ≈ **227 张**还没出，建议按上市/明星企业优先分批。
- 0622 这批主要解决：philosophy / empower 成品图 + 氛围视频候选 + 页脚纹理候选；**227 张大头未触及**。

---

## 五、使用 proposal（建议写回 agent 这样处理）

> 顺序 = 先无争议去重，再逐项选材落地。落地命名一律按 `assets/README.md`：`<区域>-<描述>[-NN].<ext>`，全小写 kebab、去空格/中文/引号/`" 2"`。

1. **strategy 三张** → 丢弃 0622 副本（生产 `strategy-*.png` 已是同文件，无需动）。
2. **glass + metal** → 整体留 `assets/0622/` 作素材池，不进生产/部署。
3. **philosophy 三张（+变体）** → Vera 选「是否换成新方向」；若换：
   - 落地名沿用现引用 `philosophy-integrity/vision/yearning.jpg`（**同名替换**，免改 about-ch.html 引用）或转 `.png`（需同步改 3 处 `--img` url）。
   - 注意不要破坏 `.phil-row` 终版 hover（绽放）。新图是横构图、现用竖构图，**换前需在 about 实际行高里试**（构图变了可能要调 `object-position`）。
4. **empower 六选三** → 每概念（智囊后援/生态共振/伴跑者）二选一，落地填 `about-ch.html` 3 个 `ecard__bg` 占位（333/347/361）。
   - 建议命名 `empower-think-tank.* / empower-ecosystem.* / empower-companion.*`（或按 IVY 序号 `empower-01/02/03`）。
5. **about 投资方向 3 卡** → 按台账改成 3-独立图设计时，可直接复用生产已有的 `strategy-ai/chip/manufacturing.png`（无需新素材）。
6. **bg video 两条（5213/5242）** → 作"更淡氛围"备选，纳入背景透明度测试与 `4945` 对比；首页已定 `4945`，子页素材未定（见 `tests/0618/home-bg/other-pages-bgop-proposal.md`），可在那一轮一起定。
7. **footer 五张** → ⚠ 与"页脚已定用视频 B"方向冲突（§二③）。**默认不用**，仅当 Vera 想推翻回静态图时再选。

### 待 Vera 拍板的点
- philosophy 换不换新方向？换的话同名替换还是转 png？
- empower 每概念选哪个变体（带"" vs 带" 2"）？
- bg video 5213/5242 是否纳入子页背景候选？
- footer 是否仍坚持视频路线（→ 5 张静态图弃用）？

---

## 附：相关文件
- 素材池/成品：`assets/0622/常春藤网站所有素材/`
- 台账：`assets/0622/常春藤官网-素材清单.xlsx`
- 背景透明度 proposal（子页待定）：`tests/0618/home-bg/other-pages-bgop-proposal.md`
- 首页背景写回 spec：`tests/0618/home-bg/home-bg-writeback.md`
- 页脚选定版：`tests/0618/footer/footer-final.html`
