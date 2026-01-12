// lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

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
  
  const postDate = new Date(post.frontMatter.date);
  const currentDate = new Date();
  
  return postDate <= currentDate;
}

export function getAllPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { slug, frontMatter: data, content };
  });
  
  // Filtra solo los posts que deberían mostrarse y los ordena por fecha descendente
  return allPosts
    .filter(shouldShowPost)
    .sort((a, b) => {
      if (a.frontMatter.date < b.frontMatter.date) {
        return 1;
      } else {
        return -1;
      }
    });
}

export function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => ({
    slug: fileName.replace(/\.md$/, ''),
  }));
}

export function getPostBySlug(slug) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { slug, frontMatter: data, content };
}
