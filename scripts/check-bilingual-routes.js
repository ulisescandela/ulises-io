import assert from 'node:assert/strict';
import fs from 'node:fs';
import { getAllPostsData } from '../lib/posts.js';
import { getEnglishPosts, getEnglishTranslation } from '../lib/translations.js';

const base = process.argv[2] || 'http://127.0.0.1:3003';
async function page(path) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, path);
  return response.text();
}
for (const source of getAllPostsData()) {
  const translated = getEnglishTranslation(source.slug);
  assert.ok(translated, source.slug);
  const esUrl = `https://ulises.io/blog/${source.slug}`;
  const enUrl = `https://ulises.io/en/${translated.slug}`;
  const [es, en] = await Promise.all([page(`/blog/${source.slug}`), page(`/en/${translated.slug}`)]);
  for (const [html, lang, canonical] of [[es, 'es', esUrl], [en, 'en', enUrl]]) {
    assert.ok(html.includes(`<html lang="${lang}"`), canonical);
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`), canonical);
    assert.ok(html.includes(`hrefLang="es" href="${esUrl}"`), canonical);
    assert.ok(html.includes(`hrefLang="en" href="${enUrl}"`), canonical);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, canonical);
  }
}
for (const source of getAllPostsData()) {
  const response = await fetch(new URL(`/blog/${source.slug}/opengraph-image`, base), { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, source.slug);
  assert.ok(response.headers.get('content-type').includes('image/png'), source.slug);
  await response.arrayBuffer();
}
const index = await page('/en');
for (const post of getEnglishPosts().slice(0, 4)) assert.ok(index.includes(`/en/${post.slug}`), post.slug);
for (const path of ['/', '/about', '/cv', '/contacto', '/privacy', '/empieza-aqui', '/rss.xml', '/en/start-here', '/en/rss.xml', '/recursos/portfolio-checklist.txt']) await page(path);
for (const category of new Set(getEnglishPosts().map(post => post.frontMatter.category))) {
  const html = await page(`/en/category/${encodeURIComponent(category)}`);
  for (const post of getEnglishPosts().filter(post => post.frontMatter.category === category)) assert.ok(html.includes(`/en/${post.slug}`), post.slug);
}
for (const text of ['grow as a developer', 'Choose your next step', 'Latest articles', 'Explore by topic', 'Download checklist']) assert.ok(index.includes(text), text);
const missing = await fetch(new URL('/en/no-such-article', base));
assert.equal(missing.status, 404);
const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
for (const post of getEnglishPosts()) assert.ok(sitemap.includes(`/en/${post.slug}</loc>`), post.slug);
console.log(`Verified ${getEnglishPosts().length} bilingual article pairs, reciprocal hreflang, canonical URLs, HTML language, H1s, index and existing Spanish pages.`);
