import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { computeReadTime, getPostBySlug, shouldShowPost } from './posts.js';

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
    frontMatter: { ...data, date: source.frontMatter.date, readTime: computeReadTime(content) },
  };
}

export function getEnglishPosts() {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).filter((file) => file.endsWith('.md'))
    .map((file) => getEnglishPost(file.slice(0, -3))).filter(Boolean)
    .sort((a, b) => String(b.frontMatter.date).localeCompare(String(a.frontMatter.date)));
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
