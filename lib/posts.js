// lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function shouldShowPost(post) {
  // Verifica si el post está marcado como publicado
  if (post.frontMatter.published === false || post.frontMatter.draft === true) {
    return false;
  }
  
  // Verifica si la fecha de publicación es futura
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
  
  // Filtra solo los posts que deberían mostrarse
  return allPosts.filter(shouldShowPost);
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
