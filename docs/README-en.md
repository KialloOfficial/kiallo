# Kiallo · Creative Asset Archive

[中文](../README.md) | [English](README-en.md)

**Official website: [Kiallo Creative Asset Archive](https://kialloofficial.github.io/kiallo/en/) · [中文](https://kialloofficial.github.io/kiallo/)**

Kiallo’s character story, reference art and creative assets. Built with npm, Vite and React, with Chinese and English interfaces and layouts for phones and desktops.

## Local development

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

The default address is http://127.0.0.1:5173/kiallo/ .

```sh
npm run build
npm run preview
```

The build output is `dist/`. The default base path is `/kiallo/`. Override it with `VITE_BASE_PATH`, including leading and trailing slashes.

## GitHub Pages

1. Push to the `main` branch of `KialloOfficial/kiallo`.
2. In repository Settings → Pages → Source, select GitHub Actions.
3. `.github/workflows/pages.yml` installs dependencies, builds and deploys. It can also be triggered manually.
4. After successful deployment, the expected address is https://kialloofficial.github.io/kiallo/ .

The workflow derives the base path from the repository name. For a username.github.io repository, set `VITE_BASE_PATH` to `/` in the workflow.

## Content and maintenance

The current character material consists of the origin story, identifying features, images and reference prompts presented on the website. The v1 references will continue to evolve. Earlier design explorations and provisional notes are not published as current canon.

- `src/App.jsx`: bilingual copy, asset list and page components; `src/main.jsx`: browser entry point.
- `src/prompts.js`: four sets of reference prompts in Chinese and English.
- `src/AssetPrompt.jsx`: prompt display and copying.
- `src/style.css`: visual styles and responsive layouts.
- `public/assets/`: four original character images, their WebP previews and the latest beach background.
- `docs/README-en.md` and `docs/ASSET-LICENSE-en.md`: English project documentation and the asset-license translation.
- `legacy/2026-10-24/`: provisional notes, old backgrounds, early branding, production source images and preview screenshots. This local archive is ignored by Git and excluded from deployment; its `MANIFEST.txt` records archived moves.

The current background was created in two stages: a character-focused illustration, followed by an expanded beach panorama. The website uses `public/assets/beach-story-refined.webp`. Older versions and production materials remain in the local archive.

Chinese and English have separate URLs, linked by the header switch. Language preference is recorded in the browser, but the explicit URL determines which language is shown. The GitHub star count is fetched from the public API on load and refreshed every 60 seconds. On failure, it shows `—` and offers a retry. Related projects link to the repository and submission entry points. Fonts have system fallbacks. Navigation uses anchors and needs no server-side routing.

## Official platform and creative references

[Official Bilibili](https://space.bilibili.com/86249048) is the main active platform, linked in the header alongside GitHub.

Each character image includes a reference prompt of approximately 500 Chinese characters and an English version, available to expand and copy. These are descriptions inferred from the artwork, not the original generation records. Most image-generation models struggle to reproduce the character consistently, so we recommend using the prompts together with their reference images. If clipboard access is unavailable, the text is selected for manual copying.

## Licensing

Website code is covered by the [MIT License](../LICENSE). The character, lore and visual assets are covered by the [Kiallo Fan-Creation License](ASSET-LICENSE-en.md) and are outside the MIT license’s unrestricted commercial scope.

Fan creations are welcome. Videos, images and similar works without direct audience charges, including ordinary platform ad revenue or view incentives, need no separate permission. Commercial services featuring Kiallo as the primary lead require explicit written author permission; applications are welcome through GitHub Issues. Attribution and source links are friendly suggestions.

The root [Chinese asset license](../ASSET-LICENSE.md) is authoritative. Its [English translation](ASSET-LICENSE-en.md) lives in `docs/`. The website links to the appropriate document for the selected language, without generating copies in `public/docs`.

The site’s resource-organization approach was inspired by the [Whale Girl Open Asset Archive](https://treapgogo.github.io/deepseek-whale-girl/index.html). Its code and character assets were not copied.

## Search discovery

The build prerenders complete Chinese and English HTML pages. Character content, images, reference prompts and FAQs are readable without JavaScript. React hydrates the static pages to enable filters, image previews, copying and star updates. Each language has its own canonical URL, reciprocal hreflang links, sharing metadata and WebSite structured data.

- Chinese: https://kialloofficial.github.io/kiallo/
- English: https://kialloofficial.github.io/kiallo/en/
- Sitemap: https://kialloofficial.github.io/kiallo/sitemap.xml

Verify the site in Google Search Console to submit the sitemap and request indexing. These changes improve discoverability but do not guarantee immediate indexing or rankings. Since robots.txt must live at the domain root, this project does not generate an ineffective robots.txt under /kiallo/.
