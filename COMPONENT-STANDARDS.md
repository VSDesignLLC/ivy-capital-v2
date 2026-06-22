# 常春藤资本官网 · 组件规范（Component Standards）

> 本文件定义**组件层**的标准：分层、命名、变体、家族分组、以及组件库预览页与 canonical CSS 都必须达到的一致性约束。
> Token 层（颜色 / 字阶 / 间距）见 `DESIGN-SYSTEM.md`；token 活预览见 `design-system.html`；组件活预览见 `component-library.html`。
> **事实源 = `assets/css` + `assets/js`（canonical 共享层）。** 本文是「目标规范」——现状未达标处，按 §五 的路线分轮重构对齐，不一次性推翻已部署代码。

---

## 〇、为什么要这份文档

组件库要做到「**用名字就能精确指代、改一处即全站同步**」，靠的是三件事：清晰的**分层**、一致的**命名**、明确的**变体边界**。当前已发现的不规范（本文要解决的）：

1. `.dot` 与 `.dot--live` 被当成两个东西——实则是**同一组件的两个变体**，且 `.dot--live` 的呼吸动效在 `homepage` 内联与 `.btn .dot` 里**各存一份**（forked）。
2. `.pcard__badge` 只有「带徽章」一种呈现，缺**「无徽章」变体**的明确表达。
3. `.card`（策略卡）与 `.pcard`（项目卡）命名上各自为政，**看不出同属一个 card 家族**——命名缺少「文件树」式的层级感。

---

## 一、行业依据（best practice）

| 方法论 | 取用要点 | 来源 |
|---|---|---|
| **Atomic Design**（Brad Frost） | 由小到大分层组装、「build systems, not pages」：atoms → molecules → organisms（→ templates/pages）。每层是上一层的构件。 | atomicdesign.bradfrost.com |
| **BEM** | `block__element--modifier`：block=组件，`__`=子元素，`--`=**变体/状态**。规则：modifier 不单独用（须与基类同在）；元素别深套（需要 `block__a__b` 时就该拆新 block）；block 名描述**用途**非外观。 | getbem / sparkbox |
| **变体 vs 独立组件** | 经验法则：**「同一解剖结构、不同状态 → 变体；不同解剖结构 → 独立组件」**。显隐某个层（如徽章）属「次要构成变化」→ 用变体/标记控制，不另立组件。 | alicepackarddesign / penpot |
| **分类（Nathan Curtis）** | 组件归入**家族/类别**；「a component contains a component, it happens」允许层级嵌套；用**朴素易懂的名字**而非神秘代码；指南写在组件自己的页面上。 | eightshapes.com |

---

## 二、分层规范（Tiering）

沿用原子设计，本项目落为**四层**（与 `component-library.html` 的四区一致）：

| 层 | 定义 | 判定标准 | 例 |
|---|---|---|---|
| **原子 Atoms** | 不可再分的最小单元 | 不含其它具名组件 | `dot` · `caption` · `corner` · `tag` · `badge` |
| **分子 Molecules** | 原子组合、可独立使用的小部件 | 含 ≥1 个原子，自身仍单一职责 | `btn`(含 dot) · `mailpill`(含 dot) · `sec-band`(含 corner+sec-head) · `marquee` |
| **复合 Composites** | 分子/原子拼装的完整功能块 | 构成一个独立区段或卡片 | `card-*` 家族 · `ticker` · `nav` · `footer` |
| **布局骨架 Layout** | 页面级结构原语，非可见 UI | 容器 / 网格 / 背景层 | `page` · `grid-overlay` · `rails-top` · `section` · `pagebg` |

**升降层判定**：一个东西若开始包含别的具名组件，它就升一层；若一个「组件」其实只是另一个的状态切换，它不升层、降为**变体**。

---

## 三、命名规范（Naming）—— 要有「文件树」感

### 3.1 基本语法 = BEM
- **组件（block）** = 用途名词：`btn` / `card-project` / `footer`。
- **子元素** = `block__element`：`card-project__badge` / `footer__social`。**不超过一层** `__`；要写第二层就拆成新 block。
- **变体 / 状态** = `block--modifier`：`dot--live` / `btn--ghost`。**modifier 必须与基类连用**（`class="dot dot--live"`），不可单独使用。

### 3.2 家族 = 名字前缀（这就是「文件树」感）
同一类、解剖结构不同的组件，用**共同前缀**归为一个家族；前缀即「目录」，成员即「文件」：

```
card-                     ← 家族（卡片）
├─ card-strategy          投资方向/策略卡（378 高、渐变带、角标）
│   ├─ __bg __grad __top __foot __title
│   └─ （tags 在 hover 展开）
├─ card-project           被投企业卡（正方 1:1、霜玻璃 plate）
│   ├─ __bg __plate __badge __foot(.t/.d)
│   ├─ --no-badge         无徽章变体  ← 见 §四.2
│   └─ --wall             名称墙变体（portfolio：默认整卡居名，hover 图淡入+磨砂带升起；+--ondark 反色）  ← 见 §四.4
├─ card-member            团队成员卡（正方 photo + 玻璃名牌 corner L 角；team 用）
│   └─ __photo __plate(.corner) __txt(.t/.d)
├─ card-award             奖项文字卡（navy 翻色；作用域 .ticker .card-award）
│   └─ __kick __quote __org __award
└─ card-location          地址定位卡（200²、hover 浮出天际线；footer 用）
    ├─ __tex __scrim .city .addr
    └─ --sh / --hk         城市纹理对位变体

dot
└─ --live                 呼吸态变体（= dot + dot-halo 光晕；现困在 .btn，R2 提取）  ← 见 §四.1
```

规则：
- **家族前缀描述「是什么类」**（card / btn / nav），成员后缀描述「哪一种」（strategy / project / award）。
- 同库内**单一扁平可搜索**：在各层区里平铺，靠前缀聚类，不另造神秘编号（拒绝 `G03v1` 式代码）。
- 命名描述**用途**不描述外观（用 `card-project` 不用 `card-square`）。

---

## 四、变体规范（Variants）—— 解决三处反馈

### 4.1 `dot` / `dot--live` = 一个组件两个变体
- `dot` = 静态蓝点（基类，`base.css`）。
- `dot--live` = **变体**：在 dot 上叠加 `dot-halo` 呼吸光晕。解剖结构相同、只多了动效 → 判定为变体，用 `--live`。
- **三者厘清（dot / dot-halo / dot--live）**：`.dot` = 静态原子；`@keyframes dot-halo` = 呼吸动画 keyframes（motion 原语，**不是组件**、不单独上页）；`.dot--live` = `.dot` + halo `::before` 组成的**呼吸变体原子**，应能**独立渲染**。一句话：`dot-halo` 是「怎么呼吸」，`dot--live` 是「会呼吸的点」。
- **单一来源约束**：呼吸光晕的配方（`::before` + `dot-halo`）**只定义一次**，落在 `dot--live::before`（`components.css`）。`btn` 内的呼吸点改为**组合** `class="dot dot--live"`，不再在 `.btn .dot::before` 另写一份。→ 改一次呼吸点，btn / hero / 未来的 card 全同步。
- **深浅双变体（R2a audit 发现）**：halo 在浅底用蓝核、深底（homepage hero 视频）用白核 → `.dot--live`（默认蓝，单一来源）+ `.dot--live--on-dark`（仅覆盖光晕背景为白）。是「同源 + 变体调色」范例，未破坏单一来源。
- **组件库呈现**：`dot` 与 `dot--live` 同一条目并排两态。⚠️ 现状 halo 困在 `.btn .dot::before`，`.dot--live` 单独放**不会呼吸**——故**不能借按钮冒充原子预览**；须 R2 把配方提到 `.dot--live::before` 后才真正可独立预览（在此之前库里只诚实展示静态 `.dot` + 标注）。

### 4.2 `card-project__badge` = 可选元素，带/不带两态
- 徽章是 `card-project` 的**可选子元素**。显隐属「次要构成变化」→ 由**标记是否包含该元素**控制（默认有；无徽章即不写该 `__badge`）。
- 若「无徽章」需要布局微调（如标题上移），加表意修饰符 `card-project--no-badge`（肯定式命名，避免双重否定）。
- **组件库呈现**：`card-project` 条目同时展示「**有徽章 / 无徽章**」两态。

### 4.3 card 家族：strategy / project / award / location 统一前缀
- 四者**解剖结构各异**（策略卡矩形+渐变带 · 项目卡正方+霜玻璃 plate · 奖项卡文字翻色 · 地址卡 200² 天际线）→ 按法则各为**独立组件**，但**同属 `card-` 家族**，用前缀体现「文件树」层级（见 §3.2）。
- 成员定名（✅ R3 已落地 2026-06-22）：`.card → .card-strategy` · `.pcard → .card-project` · `.ticker .tc → .card-award` · `.locard → .card-location`。canonical + 全部 5 页 + partials.js + 2 预览页均已改名。
- 边界：奖项卡的滚动容器 `.ticker`（及 `__track`/`__group`）**保留原名**——它是与 `.marquee` 同级的滚动 organism，非卡片本体；基础样式作用域随之为 `.card-award`（含 `.ticker .card-award` 后代选择器）。容器 `.cards`（策略卡网格）同样保留，非家族成员。

### 4.4 `card-project--wall` = 名称墙变体；`card-member` = 家族新成员（✅ Pass 2 已落地 2026-06-22）
- **`card-project--wall`**：portfolio 名称墙是 `card-project` 的**变体**（解剖结构同源——`__bg/__name--wall/__group/__name/__foot`——只是默认态/hover 编排不同）→ 用修饰符 `--wall` 而非新组件。默认整卡居中显示名称、hover 项目图淡入 + 底部满宽磨砂带升起（全文描述）+ 名称移到带顶上方 14px。深底卡再叠 `--ondark`（由 portfolio ondark JS 采样判定）让 hover 名称翻白。
  - **作用域设计**：变体规则一律写成 `.card-project--wall …`（与原 `.rgrid .card-project …` **特异性逐条相等**，因 `.rgrid` 与 `.card-project--wall` 同为单 class）；网格容器 `.rgrid`（列数 + 响应式）属 **portfolio 页面布局**，留页面内联，不进 canonical。变体置于 canonical base `.card-project` **之后**，同权重靠源序覆盖。
- **`card-member`**：团队成员卡解剖结构与现有卡均不同（正方 photo + 玻璃名牌 corner L 角）→ 按法则为**独立组件**，归入 `card-` 家族。名牌玻璃质感沿用 `card-project__plate` 语言。网格容器 `.team-grid`（5 列 + 响应式）同理属 team 页面布局，留内联。
- **hero `.hax`（子页通用 hero composite）**：about/team/portfolio/news 四页 hero 原是**逐字相同的 4 份内联** → 抽进 canonical 单一来源（4→1）。⚠ 首页 hero 是另一套 `.hero__ivy`（打字机 + glowNodeC），且 components.css 加载早于页面内联 `<style>`，故子页 ivy 选择器（`.hero__ivy/.ivy-t/.ivy-line/.ivy-glow`）一律**限定 `.hax` 作用域**避免裸选择器泄漏到首页；`.hax__*`/`flowDown`/`haxRise` 首页不使用，可裸放。

---

## 五、单一来源 / 组合优于复制（Composition over Duplication）

这是组件库可维护性的核心，也是命名/变体的底层目的：

- **值层面**已由 token 实现（改 `--c-accent` → 全站同步）。
- **配方层面**（多属性打包）凡**真重复**必须提成原子并被组合，不在各组件里重抄。已落地：呼吸点 → `.dot--live`（R2a）；玻璃描边环 → `.glass-ring`、玻璃质感滤镜 → `--glass-feel` token（R2b）；组件在 markup 里组合（`class="dot dot--live"` / `"btn glass-ring"` / `"nav glass-ring"`）。
- **重要校正（R2b audit）**：去重前必先 audit「是否真重复」。本项目玻璃「主体」（btn vs nav 的 blur/底色/阴影）与 3 个简易磨砂胶囊**并非重复，而是按场景有意调的不同设计** → 不强行归一（属设计改动而非重构）。每实例的合理差异（blur 半径等）保留自定，不破坏单一来源。
- **物理顺序不动**：`components.css` 的书写顺序保持现状（层叠安全）；分层只体现在**命名 + 组件库分区 + 本文档**，不靠重排文件。

---

## 六、组件库预览页（`component-library.html`）呈现规范

1. **零样式复制**：只 link canonical（`tokens→base→components→页面chrome→motion`），改 CSS 自动同步。
2. **一个组件 = 一个条目**，条目内**并列展示其全部变体/状态**（dot 的静/呼吸；card-project 的有/无徽章；btn 的 default/hover）。变体不拆成多个独立条目。
3. 每条目给出：**类名引用句柄**（含家族前缀）+ 源文件 + 关键 token + hover 行为 + 活渲染舞台。
4. 按四层分区、家族前缀聚类；玻璃组件放图底/navy 舞台显质感。
5. 指南写在条目自身（terminology / 用法 / 何时用哪个变体）。

---

## 七、达标检查清单（Definition of Done）

组件库与 canonical 命名达标，须满足：

- [ ] 每个组件有明确层级（原子/分子/复合/布局），升降层符合 §二判定。
- [ ] 命名遵循 BEM；家族用统一前缀，读起来有「文件树」层级感（§三）。
- [ ] 凡「同解剖+不同状态」一律用 `--变体`，不另立组件；变体在库里与基类同条目展示（§四）。
- [ ] 多属性配方（glass / 呼吸点等）单一来源 + 组合复用，无 fork（§五）。
- [ ] `component-library.html` 零复制、一组件一条目含全变体、四层+家族聚类（§六）。
- [ ] 三处具体反馈已落实：dot/dot--live 合并、card-project 有/无徽章、card 家族前缀。

---

## 八、落地路线（不破坏已部署代码）

本文是**目标**，分轮对齐：

1. **R0 · 现已完成**：`component-library.html` 四层全覆盖活预览（基线）。
2. **R1 · 库内对齐（仅改预览页）**：按 §六 把 dot/dot--live、card-project 有/无徽章并条目；标注家族前缀；不动 canonical。**先做、低风险**。
3. **R2 · 配方去重（改共享层 + 各页标记）**：
   - **R2a · dot--live 单一来源（✅ 已完成 2026-06-22）**：halo 提到 `components.css` 的 `.dot--live::before`（+ 深底变体 `.dot--live--on-dark` 把光晕核心改白），删除 `.btn .dot::before`；homepage 与 4 子页移除内联 fork，btn / eyebrow 改组合 `class="dot dot--live"`。7 页 + 2 预览页回归通过、行为保持。
   - **R2b · glass 去重（✅ 已完成 2026-06-22，范围收敛）**：audit 推翻「glass 是一份被抄多次的配方」——**只有 btn/nav 的 `::after` 描边环逐字相同**。故仅提取 `.glass-ring`（btn/nav 组合 `class="… glass-ring"`，删除两处 `::after`）+ token 化 `--glass-feel`（saturate/brightness，btn/nav 共享）。btn/nav 玻璃**主体**（blur 10/16、底色、阴影）与 3 个简易磨砂胶囊（nav__lang/mailpill/footer__social，底色 alpha .55/.45/.05）是**按场景有意调过的不同设计、非重复**，保持不动（强行归一属设计改动，已与 Vera 确认不做）。
4. **R3 · 家族改名（✅ 已完成 2026-06-22）**：`.card→.card-strategy`、`.pcard→.card-project`、`.ticker .tc→.card-award`、`.locard→.card-location`。改前 `cp` 备份（`backup/*.backup-2026-06-22-r3*`）；Python 脚本按 `pcard→locard→tc→card` 安全顺序前缀替换，负向断言保护 `.cards` 容器与 team 灯箱 JS 变量 `var card`（避免误伤），`.ticker`/`.marquee` 保留。components.css · motion.css · partials.js · 5 生产页 · 2 预览页全改；7 页 headless 回归 console-clean、DOM 零旧 class、新类 computed style 命中。
5. **0618 写回 · Pass 2 组件化（✅ 已完成 2026-06-22）**：子页选定终版「先写回（Pass 1，只落设计、内联）→ 组件化（Pass 2，纯重构抽 canonical、逐像素验证与抽前一致）」两趟分开做。Pass 2 三抽（见 §四.4）：① hero `.hax` 四页内联（4 份逐字相同，3566 字符）→ canonical 单一来源，ivy 选择器限定 `.hax` 防泄漏首页；② team `.tcard`→ canonical `card-member`（markup + lightbox JS 同步改名）；③ portfolio 名称墙 `.rgrid .card-project*`→ canonical `card-project--wall` 修饰符（16 卡 markup 加类，`.rgrid` 留布局）。每抽用 Python 机械转换 + dry-run 计数，逐项 headless 验证后全站 7 页回归 console-clean、首页零回归。

> R2 / R3 / Pass 2 触及共享层与生产页，须经 Vera 明确批准后单独执行，每轮以本文 §七 清单验收。

---

*依据来源：Atomic Design (Brad Frost) · BEM (getbem/Sparkbox) · 变体 vs 独立组件 (alicepackarddesign/penpot) · On Classification in Design Systems (Nathan Curtis, EightShapes)。*
