# 卡尔洛 Kiallo · 创作资产库

[中文](README.md) | [English](docs/README-en.md)

卡尔洛的角色故事、参考图与创作素材。基于 npm + Vite + React，支持中文 / English，以及手机和电脑布局。

## 本地运行

需要 Node.js 22.12+ 和 npm。

```sh
npm ci
npm run dev
```

默认地址为 http://127.0.0.1:5173/kiallo/ 。

```sh
npm run build
npm run preview
```

构建产物位于 `dist/`。默认子路径 `/kiallo/`，可通过 `VITE_BASE_PATH` 调整，需包含首尾斜杠。

## GitHub Pages

1. 推送至 `KialloOfficial/kiallo` 的 `main` 分支。
2. 仓库 Settings → Pages → Source 选择 GitHub Actions。
3. `.github/workflows/pages.yml` 会自动安装依赖、构建并发布，也支持手动运行。
4. 发布成功后预期地址为 https://kialloofficial.github.io/kiallo/ 。

工作流按仓库名设置子路径；若用于用户名.github.io 仓库，将工作流中的 `VITE_BASE_PATH` 改为 `/`。

## 内容与维护

现行角色内容以网站展示的基础故事、识别特征、图片与参考提示词为准。卡尔洛的 v1 参考还会继续细化与迭代；早期设计过程与未定稿笔记不作为现行设定发布。

- `docs/README-en.md` 与 `docs/ASSET-LICENSE-en.md`：英文项目说明及资产许可译文。
- `src/main.jsx`：双语文案、素材清单和页面组件。
- `src/prompts.js`：四组参考提示词及英文版本。
- `src/AssetPrompt.jsx`：参考提示词展示与复制。
- `src/style.css`：视觉样式与响应式布局。
- `public/assets/`：网站使用的四组角色原图及 WebP 展示图、最新版海滩背景。
- `legacy/2026-10-24/`：未定稿笔记、旧背景、早期标志、制作过程原图和预览截图，已忽略，不提交、不发布；移动记录见该目录下 `MANIFEST.txt`。

当前背景先以角色为主体生成，再扩展为海滩全景，网页使用 `public/assets/beach-story-refined.webp`。旧版与制作过程资料仅在本地归档。

语言选择保存在浏览器中。GitHub Star 数量加载时读取公共 API，此后每 60 秒刷新；失败时显示 `—`，可重试。关联项目提供真实仓库和投稿入口。字体有系统回退。导航使用锚点，无需服务端路由。

## 官方平台与创作参考

[官方 B 站](https://space.bilibili.com/86249048) 是主要活跃平台，顶栏与 GitHub 并列展示。

每张角色图附约 500 字中文参考提示词及英文版本，可以展开并复制。提示词根据图片整理，并非原始生成记录；大多数图像生成模型难以稳定复现角色形象，建议结合参考图使用。剪贴板不可用时会选中文本，方便手动复制。

## 授权范围

网站代码采用 [MIT 许可](LICENSE)。角色形象、设定与美术素材采用 [卡尔洛角色素材二创许可](ASSET-LICENSE.md)，不属于 MIT 的自由商业使用范围。

欢迎二创。不直接收费的视频、图片等作品，包括普通播放或广告分成，无需单独授权；以卡尔洛为首要主角开展商业服务需要作者明确书面许可，欢迎通过 GitHub Issue 申请。署名与来源链接属于友好建议。

角色素材许可以根目录 [ASSET-LICENSE.md](ASSET-LICENSE.md) 中文版为准，[英文译文](docs/ASSET-LICENSE-en.md) 位于 `docs/`。网站按当前语言链接相应文件，不在 `public/docs` 中生成副本。

页面参考了 [鲸鱼娘开源资产库](https://treapgogo.github.io/deepseek-whale-girl/index.html) 的资料整理思路，未复制代码或角色素材。
