// lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

// Categorías canónicas del blog (nivel alto, indexables).
// Los tags siguen siendo libres y específicos; estas son las pocas y fijas.
export const CATEGORIES = ['Carrera', 'Programación', 'Herramientas', 'IA', 'Reflexiones'];

const WORDS_PER_MINUTE = 200;

// Calcula el tiempo de lectura a partir del contenido (fallback si no hay readTime).
export function computeReadTime(content) {
  if (!content) return '1 min';
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min`;
}

export function shouldShowPost(post) {
  // Validación de seguridad por si el post o frontmatter son undefined
  if (!post || !post.frontMatter) {
    return false;
  }

  // Verifica si el post está marcado como publicado
  if (post.frontMatter.published === false || post.frontMatter.draft === true) {
    return false;
  }

  // Verifica si la fecha de publicación es futura
  if (!post.frontMatter.date) return true; // Si no tiene fecha, asumimos que se muestra

  // Usar solo la fecha sin hora para evitar problemas de zona horaria
  const postDateStr = post.frontMatter.date.split('T')[0];
  const currentDateStr = new Date().toISOString().split('T')[0];

  return postDateStr <= currentDateStr;
}

// Lee y parsea un archivo de post, inyectando readTime calculado si falta.
function readPostFile(fileName) {
  const slug = fileName.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  if (!data.readTime) {
    data.readTime = computeReadTime(content);
  }
  return { slug, frontMatter: data, content };
}

// Lee TODOS los posts del disco (sin filtrar). Uso interno.
function readAllPostFiles() {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map(readPostFile);
}

export function getAllPostsData() {
  return readAllPostFiles()
    .filter(shouldShowPost)
    .sort((a, b) => {
      if (a.frontMatter.date < b.frontMatter.date) {
        return 1;
      } else {
        return -1;
      }
    });
}

// Solo genera rutas estáticas para posts visibles (no drafts ni futuros).
export function generateStaticParams() {
  return getAllPostsData().map((post) => ({ slug: post.slug }));
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  if (!data.readTime) {
    data.readTime = computeReadTime(content);
  }
  return { slug, frontMatter: data, content };
}

export function getAllTags() {
  const tagsSet = new Set();
  // Solo tags de posts visibles para no filtrar etiquetas de drafts.
  getAllPostsData().forEach((post) => {
    const tags = post.frontMatter?.tags || [];
    if (Array.isArray(tags)) {
      tags.forEach((t) => tagsSet.add(String(t)));
    } else if (tags) {
      tagsSet.add(String(tags));
    }
  });
  return Array.from(tagsSet).sort();
}

export function getPostsByTag(tag) {
  if (!tag) return [];
  return getAllPostsData().filter((p) => {
    const tags = p.frontMatter?.tags || [];
    if (Array.isArray(tags)) return tags.map(String).includes(String(tag));
    return String(tags) === String(tag);
  });
}

// Devuelve las categorías que realmente tienen posts visibles.
export function getAllCategories() {
  const set = new Set();
  getAllPostsData().forEach((p) => {
    if (p.frontMatter?.category) set.add(String(p.frontMatter.category));
  });
  return Array.from(set).sort();
}

export function getPostsByCategory(category) {
  if (!category) return [];
  return getAllPostsData().filter(
    (p) => String(p.frontMatter?.category || '') === String(category)
  );
}

// Devuelve posts relacionados con uno dado: prioriza misma categoría y luego
// los que comparten más tags. Excluye el propio post.
export function getRelatedPosts(slug, limit = 3) {
  const all = getAllPostsData();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];

  const currentTags = new Set(
    (Array.isArray(current.frontMatter?.tags) ? current.frontMatter.tags : []).map(String)
  );
  const currentCategory = String(current.frontMatter?.category || '');

  const scored = all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const tags = Array.isArray(p.frontMatter?.tags) ? p.frontMatter.tags.map(String) : [];
      const sharedTags = tags.filter((t) => currentTags.has(t)).length;
      const sameCategory = String(p.frontMatter?.category || '') === currentCategory && currentCategory ? 1 : 0;
      return { post: p, score: sameCategory * 3 + sharedTags };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  // Si no hay suficientes relacionados, completa con los más recientes.
  const related = scored.map((x) => x.post);
  if (related.length < limit) {
    for (const p of all) {
      if (p.slug !== slug && !related.includes(p)) related.push(p);
      if (related.length >= limit) break;
    }
  }
  return related.slice(0, limit);
}
