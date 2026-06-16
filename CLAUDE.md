# 网站设计 · claude执行方法

> 本文件只写"我们怎么一起做网站"的合作约束。设计系统见 `DESIGN-SYSTEM.md`,页面结构见 `README.md`。

## 主文件 & 共享层架构（2026-06-15 重构）

- 生产页面 = 每页一个 HTML 主文件(当前 `homepage-ch.html`),**不再是单文件全内联**。
- **共享层 = 组件/样式/行为的唯一事实源,改组件改这里,不要在单页里复制**:
  - `assets/css/tokens.css` — 设计 token(`:root`)
  - `assets/css/base.css` — reset + 结构原语(grid/rails/sec-band/section/pagebg)+ `site-nav/footer` 透明包裹
  - `assets/css/components.css` — 可复用组件:nav · btn · card · pcard · ticker/tc · marquee · footer(locard/mailpill)
  - `assets/css/motion.css` — 动画状态 + reduced-motion + 窄屏兜底(**必须最后 load**,覆盖前面)
  - `assets/js/site.js` — 通用行为:reveal · count-up · nav-tuck · bgop · p-scroll(靠 data-attr/class 钩子,缺元素自动跳过)
  - `assets/js/partials.js` — `<site-nav>` / `<site-footer>` 自定义元素,**nav/footer 的 markup 也单一来源**(头部同步 load)
- **每个页面的 `<head>` load 顺序**:`tokens → base → components → 页面专属 <style> → motion`,然后 `<script src=partials.js>`;`</body>` 前 `site.js` + 页面专属 `<script>`。
- **页面专属**(hero 编排 / blueprint 竖线网格 / 各 section 布局)留在该页内联,不进共享层。
- `design-system.html` = 共享组件的**活预览**(link 同一套 css + `<site-nav>` 注入),不是副本——改了 components.css 它自动跟着变。
- **新建页面**:link 上面那套 + 写 `<site-nav>`/`<site-footer>` + 自己的内容,组件直接复用。
- **未经用户明确批准,不改生产主文件 / 共享层**。所有探索 / 候选都在 `tests/` 里做。

## 候选 → 审核 → 落地 三步法

1. **fork subagent 写候选**:一个 section / 一种样式 = 一个或多个 `tests/<name>.html`。
   需要多方案对比时,并行 fork 多个 subagent 各写一版,放进 `tests/`。
2. **主 agent 视觉审核**:候选写完后主 agent 自己先用 headless 截图过一遍
   (布局对不对、有没有 console error、动效是否如预期),再交给 Vera 在
   `localhost:8765` 上肉眼挑选。不要把没自检过的页面直接丢给用户。
3. **Vera 选定后才落地**:把中选版本的样式 / 标记**精确**写进主文件,
   只动被点名的部分,其他一律不碰("仅替换 X,其他都不要改动"是默认纪律)。

## 改主文件前

- **先 audit 现状**:主文件会被用户 / linter 改动,长出我没追踪的代码。动手前先
  read / grep 确认真实现状,基于真实代码而非记忆里的旧版来改。

## 备份

- **平常快速迭代不备份**,别次次 `cp`。
- 只在**大 audit / 大改动 / 结构性重写前**才备份,且**动手前先问 Vera"是否要备份"**,她说要再备。
- 备份一律放 `backup/` 文件夹(虽然本项目已是 git repo,但**日常快照仍用 `cp` / `mv`**,
  方便随时直接打开对比;git 只用于部署版本管理,见「部署」节)。命名 `backup/<file>.backup-<date>.html`。

## 做完必做:开页验证

- 任何 HTML 改动完成后,**自动起服务并截图验证**,不要只靠读代码就宣布完成:
  ```bash
  python3 -m http.server 8765   # 项目根
  ```
  用本机 playwright(`/tmp/node_modules/playwright-core` + `~/Library/Caches/ms-playwright`
  的 chromium-headless-shell,CommonJS `require`)截图 / 量几何 / 抓 console。
- 量布局时用 `emulateMedia({reducedMotion:'reduce'})` 抵消 `[data-reveal]` 的 +24px 位移。
- 验证脚本放 `/tmp/`(如 `/tmp/measure.js`),不进项目目录。

## 报告

- 完成后说清:改了哪几处、实测结果(几何 / 动效 / console)、有没有副作用、
  以及去哪个 URL 看(`http://localhost:8765/homepage-ch.html`)。
- 真实数据 / 真实效果拿不到就说"拉不到",不编造验证结论。

## Git 协作(与队友共仓)

- **分支按「文件夹」分,不按 session / 终端分**:同一个项目文件夹只有一套 git 状态和一套文件,
  所有指向它的终端 / 编辑器 / Claude session 看到的是**同一个分支**。`git switch` 立即改整个
  文件夹的文件,**与 push 无关**(push 只往远端同步)。
- **同一文件夹下别让两个 session 同时改同一个文件**:磁盘是后写覆盖先写、无冲突提示。
  多 session 并行时**分工改不同文件**,或同一时间只一个动手。需要真正隔离再用 `git worktree`。
- **基于队友分支做迭代**:不要直接在队友分支上改。从远端分支开自己的新分支:
  `git switch -c <我的分支> origin/<队友分支>`,然后 `git branch --unset-upstream`
  防止普通 `git push` 误推到队友分支。第一次推送用 `git push -u origin <我的分支>`。
- **想同步队友最新**:`git fetch origin`,需要时再 merge。
- **落地到线上**:review 后把分支并进 `main`(推荐开 PR 留痕)。
  并进 main 即触发 Vercel 自动部署,见下节。

## 部署(GitHub + Vercel,已配好)

- **GitHub 仓库**:`VSDesignLLC/ivy-capital-v2`(组织下,**public** —— Vercel Hobby 套餐做
  私有组织仓库的 Git 自动部署需 Pro,故选公开;发布前已扫过无密钥)。
- **Vercel 项目**:team `vsdesign` / `ivy-capital-v2`,已 `vercel git connect` 关联 GitHub。
- **客户固定链接**:`https://ivy-capital-v2-one.vercel.app`(根路径已 rewrite 到 `homepage-ch.html`)。
- **自动部署**:**push 到 `main` → Vercel 自动重新部署**,十几秒后链接更新。设计师被加进组织后同理。
  日常流程:`git add -A && git commit -m "..." && git push`。
- **部署范围由两个文件控制(已存在,别误删)**:
  - `vercel.json` —— 根 `/` rewrite 到 `homepage-ch.html`(主文件保持单一来源,不复制)。
  - `.vercelignore` —— 只发 homepage 引用的资源,排除 `backup/`、`tests/`、design-system、文档、
    以及没被引用的大视频/图。
- **大体积未引用媒体**在 `.gitignore` 里(仅本地保留,不入库不部署)。
- **CLI 手动部署**(应急/不想走 git 时):`npx vercel deploy --prod`(本机已登录 `yiweilinvera-8750`)。
- 改动上线后,验证仍按「做完必做:开页验证」,可顺手 `curl -I` 线上链接确认 200。
