# 网站设计 · claude执行方法

> 本文件只写"我们怎么一起做网站"的合作约束。设计系统见 `DESIGN-SYSTEM.md`,页面结构见 `README.md`。

## 主文件

- 生产主文件 = `homepage-ch.html`(单文件:内联 CSS tokens + JS 动效) （每个页面一个主文件）。
- **未经 Vera 明确批准,不改主文件**。所有探索 / 候选都在 `tests/` 里做。

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
