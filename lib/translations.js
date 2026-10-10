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
  const source = getPostBySlug(data.sourceSlug);
  if (!shouldShowPost(source) || !shouldShowPost({ frontMatter: data })) return null;
  return {
    slug, content, sourceSlug: data.sourceSlug,
    frontMatter: { ...data, category: translateCategory(source.frontMatter.category), tags: source.frontMatter.tags.map(translateTag), date: source.frontMatter.date, readTime: computeReadTime(content) },
  };
}

export function getEnglishPosts() {
  if (!fs.existsSync(directory)) return [];
  const translated = new Map(fs.readdirSync(directory).filter(file => file.endsWith('.md'))
    .map(file => getEnglishPost(file.slice(0, -3))).filter(Boolean).map(post => [post.sourceSlug, post]));
  return getAllPostsData().map(source => translated.get(source.slug)).filter(Boolean);
}

export function getEnglishTranslation(sourceSlug) {
  return getEnglishPosts().find((post) => post.sourceSlug === sourceSlug) || null;
}

export function languageAlternates(sourceSlug, englishSlug) {
  return {
    es: `https://ulises.io/blog/${sourceSlug}`,
    en: `https://ulises.io/en/${englishSlug}`,
  };
}
