import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { computeReadTime, getAllPostsData, getPostBySlug, shouldShowPost } from './posts.js';

import { translateTag, translateCategory } from './locales.js';

const directory = path.join(process.cwd(), 'posts', 'en');

export function getEnglishPost(slug) {
  if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  let text;
  try { text = fs.readFileSync(path.join(directory, `${slug}.md`), 'utf8'); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
  const { data, content } = matter(text);
  if (!shouldShowPost({ frontMatter: data })) return null;
  // Translations reference a published Spanish source; original English posts
  // have no sourceSlug and must remain independently publishable.
  const source = data.sourceSlug ? getPostBySlug(data.sourceSlug) : null;
  if (data.sourceSlug && !shouldShowPost(source)) return null;
  const frontMatter = source
    ? { ...data, category: translateCategory(source.frontMatter.category), tags: (source.frontMatter.tags || []).map(translateTag), date: source.frontMatter.date }
    : { ...data, tags: Array.isArray(data.tags) ? data.tags : [] };
  return {
    slug, content, ...(source ? { sourceSlug: data.sourceSlug } : {}),
    frontMatter: { ...frontMatter, readTime: computeReadTime(content) },
  };
}

export function getEnglishPosts() {
  if (!fs.existsSync(directory)) return [];
  const posts = fs.readdirSync(directory).filter(file => file.endsWith('.md'))
    .map(file => getEnglishPost(file.slice(0, -3))).filter(Boolean);
  return posts.sort((a, b) => String(b.frontMatter.date || '').localeCompare(String(a.frontMatter.date || '')));
}

export function getEnglishTranslation(sourceSlug) {
  return getEnglishPosts().find((post) => post.sourceSlug && post.sourceSlug === sourceSlug) || null;
}

export function languageAlternates(sourceSlug, englishSlug) {
  return {
    es: `https://ulises.io/blog/${sourceSlug}`,
    en: `https://ulises.io/en/${englishSlug}`,
  };
}
