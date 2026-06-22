# 写回任务 · 首页背景素材 + 滚动透明度（bgop）

> 给写回 agent 的标注。**只动下面点名的地方，其余不碰。** 改前先 re-audit 现状，用唯一字符串锚定（不要靠行号）。
> 选定测试页：`tests/0618/home-bg/home-bg-final.html`（整页副本，可直接对照效果）。
> 目标生产文件：`homepage-ch.html`（主文件 / 共享层，需 Vera 已批准方可写回）。

## 1. 背景素材：换 `#pagebg` 视频

`homepage-ch.html` 内 `<video class="pagebg" id="pagebg" …>` 的 `<source>`：

- 原：`assets/home-bg.mp4`
- 新：`assets/0617/kling_20260617_VIDEO_无缝循环_hero__4945_0.mp4`

find→replace 锚点（唯一）：
```
assets/home-bg.mp4  →  assets/0617/kling_20260617_VIDEO_无缝循环_hero__4945_0.mp4
```
> 注意：此素材当前在 `assets/0617/`，且 `assets/` 默认被 `.gitignore` 忽略 / 未在 `.vercelignore` 白名单内。写回后需确认该 mp4 已纳入部署白名单（参考 `home-bg.mp4` 的处理），否则线上背景空白。

## 2. 滚动透明度方案（`data-bgop`，按 section）

透明度变化「以内容 section 为准，一节一遍」。逐处改 / 删：

| section | 锚点（现状） | 改为 |
|---|---|---|
| hero | `<header class="hero" data-bgop="0">` | **不变**（0） |
| about | `id="about" data-bgop="0.18"` | `id="about" data-bgop="0.20"` |
| strategy | `id="strategy" data-bgop="0.04"` | `id="strategy" data-bgop="0.12"` |
| 跑马灯 marquee | `class="marquee-wrap" data-bgop="0.45"` | `class="marquee-wrap"`（**删掉整个 `data-bgop="0.45"`**，节点删除→承接 strategy 的 0.12） |
| projects | `id="projects" data-bgop="0.04"` | `id="projects" data-bgop="0.20"` |
| breather / quote | `class="quote" data-bgop="0.55"` | `class="quote" data-bgop="0.40"` |
| awards | `id="awards" data-bgop="0.12"` | **不变**（0.12） |

> `#strategy` 与 `#projects` 现状都是 `0.04`，**务必按 id 锚定分别替换**，不要全局替换 `0.04`。

## 3. 不改动

- bgop 机制本身（`assets/js/site.js` 的 IntersectionObserver / `--pgop`）不动。
- `.pagebg` CSS（`assets/css/base.css`，`opacity:var(--pgop,0)`）不动。
- 其余 section 结构、文案、hero 自身视频（`hero-loop.mp4`）均不动。

## 4. 写回后自检

- headless 跑全页：滚到各 section 实测 `#pagebg` computed opacity = about 0.20 / strategy 0.12 / 跑马灯处承接 0.12 / projects 0.20 / breather 0.40 / awards 0.12。
- console 无错、无断链；背景视频能播放。
- 线上（合并 main 后）`curl -I` 该 mp4 返回 200。

---
最终方案速记：`hero 0 · about 0.20 · strategy 0.12 · 跑马灯删节点 · projects 0.20 · breather 0.40 · awards 0.12`，背景视频 = `…4945_0.mp4`。
