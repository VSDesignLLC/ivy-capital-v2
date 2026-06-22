# 网站设计 · claude执行方法

> 本文件只写"我们怎么一起做网站"的合作约束。设计系统见 `DESIGN-SYSTEM.md`,页面结构见 `README.md`。

## 主文件 & 共享层架构（2026-06-15 重构）

- 生产页面 = 每页一个 HTML 主文件(当前 `homepage-ch.html`),**不再是单文件全内联**。
- **共享层 = 组件/样式/行为的唯一事实源,改组件改这里,不要在单页里复制**:
  - `assets/css/tokens.css` — 设计 token(`:root`)
  - `assets/css/base.css` — reset + 结构原语(grid/rails/sec-band/section/pagebg)+ `site-nav/footer` 透明包裹
  - `assets/css/components.css` — 可复用组件:nav · btn · card-strategy · card-project · ticker/card-award · marquee · footer(card-location/mailpill)
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
   - **测样式只放 2-3 张代表卡,别把整套数据(如 16 家)重复写一遍**——看效果用最短 + 最长 + 中等
     各一张即可(覆盖极端),省 token 省时间。整页满数据留到选定整页 `final` / 写回生产再铺。
2. **写完即给 Vera 看,不做重质检**:**测试阶段不跑 headless 截图自检**(逐版起浏览器 / hover 截图
   极慢、串行无回报,得不偿失)。候选写完直接 `open` 到 Vera 浏览器里肉眼挑选(见「测试页约定」末条)。
   subagent 自检也压到最轻:最多一张全页截图 + 看 console,**不要逐卡 hover 截图**;hover 之类的动效
   验证由 Vera 肉眼过。
3. **Vera 选定后才落地**:把中选版本的样式 / 标记**精确**写进主文件,
   只动被点名的部分,其他一律不碰("仅替换 X,其他都不要改动"是默认纪律)。
   **质检(headless 截图 / console / 动效核对)只在这个写回生产阶段做**——上线前必须过。

## 测试页约定（Vera 偏好）

### 命名 & 归档（固定规范，复用）

- **测试文件名 = `<页面>-<section>-<类型>.html`**:
  - 页面 slug:`home` / `about` / `team` / `portfolio` / `news` / `ds`(design-system)。
  - section:区块或组件短名,如 `hero` / `cardgrid` / `membercard` / `popupcard`。
  - 类型:单个候选 `v1`/`v2`(或具体名如 `axis`)· 一轮横向对比 `compare` · 纵向迭代 `log` · 选定整页 `final`。
- **归档结构 = `tests/<日期>/<page-section 或 component>/`(两层)**:
  - **每日新建当日日期文件夹**(短日期,如 `tests/0618/`);
  - **在当日日期文件夹下,按 `page-section` 或 `component` 再开子文件夹**(如 `tests/0618/footer/`、
    `tests/0618/portfolio-cardgrid/`),把这批测试文件放进去。
  - **这层文件统一 `<base href="../../../">`**(比单层归档深一级,指回项目根,否则 CSS / 图片资源断链)。
  - 跨页面的迭代允许混前缀(文件名各自保留真实页面/section,子文件夹名只标这批"为谁做")。
  - (历史:更早的批次用过单层 `tests/<YYYYMMDD>-<批次>/` 或 `tests/0616 subpages/`,沿用即可,新批次按上面两层结构。)
- **日期只放在当日日期文件夹名上**;单步文件不带日期。**例外:迭代 log** 带日期标签(见下)。

### 两种测试页

- **横向对比页(一轮内多候选选一个)**:把同一轮要对比的多个版本**合并进一个测试页**,不要让 Vera 逐个打开。
  - **默认 = 单文件内联 + 包裹类作用域**(参考 `tests/0612 homepage/card-hover-variants.html`):
    token / 基础组件样式只内联一份,每版包进 `.vN`(或 `.cmp-N`)外层,差异写成 `.vN .xxx{…}` 带前缀覆盖。
    最轻、滚动顺滑、和 Vera 习惯一致。
  - **仅当候选是「结构各异的整页」**(各有自己的 nav / 全屏背景 / 独立 `<style>`,直接合并会选择器串味)
    才退而用 **iframe 堆叠 + 标签**;或先把各版 CSS 命名空间化后再内联。
  - **⚠ 反模式:按组件层级决定能否「横向并列」(side-by-side 同屏分栏)**。组件分四层:
    **atom · molecules · composites · layout**(四层定义由另一 session 在本文件维护)。
    - **atom / molecules** 层(小颗粒:按钮 / pill / 卡片 / 小组件):**在对宽度无需求是可以**横向并列对比。
    - **composites & layout** 层(hero / section / 整页布局):**绝不可**横向并列。这类设计在生产里
      **需要足够宽度**才成立,半宽 / 分栏下看不出真实效果 → **测试无效**。必须**纵向堆叠、每版占满生产宽度**测。
    - 拿不准就**纵向堆叠满宽**——最保守、永远有效。(极简记法:**test 不可横向并列,宁可全部纵向**。)
- **纵向迭代 log(跨多轮的全过程记录)**:**由 Vera 主动触发**,主要用于**和客户沟通来龙去脉**——所以**只做
  html(最直观),不另写 md**。
  - 文件名 `<页面>-<section>-log-<YYYYMMDD>.html`,**留在 `tests/` 根**(客户看的主入口)。
  - **结构**(模板参考 `tests/portfolio-cardgrid-log-20260616.html`、`tests/0616 subpages/team-popup-card-variants.html`):
    头部叙事 → 迭代 pills 线索(`R1 → R2 → … → ★`)→ 每阶段一段(编号 + 标题 + badge〔基础/关键/★〕+
    「单独打开 ↗」链接 + 说明〔含 Vera 反馈〕+ **iframe 嵌入当批归档页**)→ footer 落地说明 + 归档位置。
  - 单步探讨页归档进当批 `tests/<日期>-<批次>/`;**选定整页 `<页面>-<section>-final.html`** 也归档其中,
    被 log 的 ★ 段 iframe 嵌入。
- **写完测试 html → 直接在浏览器打开**:每次生成 / 更新测试页后,**不做 headless 自检**(理由见三步法第 2 步),
  直接用 `open http://localhost:8765/<path>`(服务未起先 `python3 -m http.server 8765`)
  在 Vera 的浏览器里打开,不用她手动点链接。质检留到写回生产阶段。

## 改主文件前

- **先 audit 现状**:主文件会被用户 / linter 改动,长出我没追踪的代码。动手前先
  read / grep 确认真实现状,基于真实代码而非记忆里的旧版来改。

## 备份

- **平常快速迭代不备份**,别次次 `cp`。
- 只在**大 audit / 大改动 / 结构性重写前**才备份,且**动手前先问 Vera"是否要备份"**,她说要再备。
- 备份一律放 `backup/` 文件夹(虽然本项目已是 git repo,但**日常快照仍用 `cp` / `mv`**,
  方便随时直接打开对比;git 只用于部署版本管理,见「部署」节)。命名 `backup/<file>.backup-<date>.html`。

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
- **角色分工(测试 vs 写回)**:测试 session 只在 `tests/` 产候选,**不碰生产页 / 共享层**;
  写回由单独 session 做。角色每次由 Vera 按 session 指派,以当前 session 的明确指令为准。
- **交付降漂移**:测试 session 交「生产形态、可直接复制的 snippet」(真路径 / 真 class 名,不带演示脚手架),
  并用**唯一字符串 find→replace(或直接 diff)当锚,不用行号**;写回前先 re-audit,匹配不上就停、别盲改。
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
