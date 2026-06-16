# assets 资源命名规范

> 本目录是站点静态资源的单一来源。新增图片 / 视频请遵循以下命名，避免再出现哈希乱码、空格、中文、`(1)` 等脏名。

## 命名格式

```
<区域|用途>-<描述>[-NN].<ext>
```

- **全小写 kebab-case**，纯 ASCII，**不要**空格 / 中文 / `(1)` / 哈希串。
- **扩展名必须正确齐全**（`.jpg` `.png` `.svg` `.mp4`）。
- 多张同类用 `-NN` 两位补零编号（`01` 起）。

## 区域 / 用途前缀

| 前缀 | 用途 | 示例 |
|------|------|------|
| `hero-` | 首页 / 子页 hero 背景图 | `hero-flow.png` |
| `about-` | 关于页专属 | `about-flow.png` |
| `strategy-` | 投资策略 section | `strategy-flow.png` |
| `philosophy-` | 投资哲学 section 背景（按 IVY 命名） | `philosophy-integrity.jpg` · `philosophy-vision.jpg` · `philosophy-yearning.jpg` |
| `proj-` | 代表项目 / 被投企业卡片图（含占位） | `proj-3817.png` · `proj-3831.jpg` |
| `team-` | 团队成员图 | `team-placeholder.png` |
| `footer-` | 页脚地点 / 背景图 | `footer-shanghai.jpg` · `footer-hongkong.jpg` · `footer-bg.jpg` |
| `logo` `social-` | 品牌 / 社交图标 | `logo.png` · `social-1.svg` |
| `placeholder-` | 未指派用途的通用占位 | `placeholder-texture.png` |
| `kling-` | Kling 生成的背景视频 | `kling-20260612-4326.mp4` |

## 视频

```
kling-<YYYYMMDD>-<slug或编号>.mp4
```
去掉「作品」「以上传图为首帧」等中文、空格与 `(1)`。例：`kling-20260612-3648.mp4`。
> 现存两个生产页背景视频仍为旧中文名（`kling_20260612_作品_…_4326_0.mp4` / `…_2668_0.mp4`），被多个生产页引用，待统一改名时再一起处理。

## 大体积 / 未引用媒体

- 不部署、仅本地保留的大文件（未用的 kling 视频、超大原图）写进 `.gitignore` + `.vercelignore`，**用新规范的文件名**。
- 占位图（如 `proj-38xx`、`placeholder-*`）默认入库；真实素材就位后替换同名文件即可，无需改引用。

## 改名注意

- 改任何**被引用**的资源名，必须同步更新所有引用（生产页 `*.html` + `assets/css` + `assets/js/partials.js` + `tests/`），`backup/` 是冻结快照不动。
- 改名后起服务截图验证引用未断（参考根 `CLAUDE.md`「做完必做：开页验证」）。
