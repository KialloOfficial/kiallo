import { build } from 'vite';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const temporary = resolve(root, '.prerender');
const base = process.env.VITE_BASE_PATH || '/kiallo/';
const site = new URL(base, 'https://kialloofficial.github.io').href;
const pages = [
  { lang: 'zh', htmlLang: 'zh-CN', locale: 'zh_CN', path: '', title: '卡尔洛 Kiallo · 创作资产库', description: '卡尔洛 Kiallo 的官方创作资产库：角色基础故事、星光礼服、Q版与日常运动设定、官方头像、参考提示词及二创使用指南。' },
  { lang: 'en', htmlLang: 'en', locale: 'en_US', path: 'en/', title: 'Kiallo · Creative Asset Archive', description: 'The official Kiallo creative asset archive: character story, starlight dress and chibi reference sheets, everyday sporty look, official avatar, reference prompts and fan-creation guidelines.' }
];
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

try {
  await build({ root });
  const template = await readFile(resolve(root, 'dist/index.html'), 'utf8');
  await build({ root, publicDir: false, build: { ssr: 'src/entry-server.jsx', outDir: temporary, emptyOutDir: true } });
  const { render } = await import(pathToFileURL(resolve(temporary, 'entry-server.js')).href);

  for (const page of pages) {
    const url = new URL(page.path, site).href;
    const image = new URL('assets/kiallo-portrait.png', site).href;
    const alternates = pages.map(p => `<link rel="alternate" hreflang="${p.htmlLang}" href="${new URL(p.path, site).href}"/>`).join('\n');
    const head = `${alternates}
<link rel="alternate" hreflang="x-default" href="${site}"/>
<link rel="canonical" href="${url}"/>
<link rel="sitemap" type="application/xml" href="${new URL('sitemap.xml', site).href}"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="${escape(page.title)}"/>
<meta property="og:description" content="${escape(page.description)}"/>
<meta property="og:url" content="${url}"/>
<meta property="og:locale" content="${page.locale}"/>
<meta property="og:image" content="${image}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${escape(page.title)}"/>
<meta name="twitter:description" content="${escape(page.description)}"/>
<meta name="twitter:image" content="${image}"/>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: page.title, url, inLanguage: page.htmlLang, publisher: { '@type': 'Organization', name: 'KialloOfficial', url: 'https://github.com/KialloOfficial', sameAs: ['https://space.bilibili.com/86249048'] } }).replaceAll('<', '\\u003c')}</script>`;
    const html = template
      .replace('<html lang="zh-CN">', `<html lang="${page.htmlLang}">`)
      .replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`)
      .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(page.description)}"/>`)
      .replace(/<meta name="prerender-head" content=""\s*\/>/, head)
      .replace('<div id="root"></div>', `<div id="root">${render(page.lang)}</div>`);
    if (html.includes('prerender-head') || !html.includes('<h1>')) throw new Error(`Static rendering failed: ${page.lang}`);
    const directory = resolve(root, 'dist', page.path);
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, 'index.html'), html);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p => `<url><loc>${new URL(p.path, site).href}</loc></url>`).join('')}</urlset>\n`;
  await writeFile(resolve(root, 'dist/sitemap.xml'), sitemap);
  console.log('Generated static Chinese and English pages, canonical URLs, language alternates and sitemap.');
} finally {
  // Only remove this build's dedicated temporary directory inside the repository.
  if (temporary !== resolve(root, '.prerender')) throw new Error('Unexpected cleanup target');
  await rm(temporary, { recursive: true, force: true });
}
