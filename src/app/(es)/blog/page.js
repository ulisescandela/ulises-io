// src/app/blog/page.js
import Link from 'next/link';
import LatestPosts from '@/components/common/LatestPosts';
import { getAllPostsData } from '@lib/posts';
import CategoriesSection from '@/components/common/CategoriesSection';

export const metadata = {
  title: 'Blog',
  description: 'Artículos sobre programación, tecnología, desarrollo web, carrera profesional en IT y más.',
  alternates: {
    canonical: 'https://ulises.io/blog',
    languages: { es: 'https://ulises.io/blog', en: 'https://ulises.io/en' },
  },
  openGraph: {
    title: 'Blog - Ulises.io',
    description: 'Artículos sobre programación, tecnología, desarrollo web, carrera profesional en IT y más.',
    url: 'https://ulises.io/blog',
    siteName: 'Ulises.io',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllPostsData();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-zinc-200">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8">Blog</h1>
      <CategoriesSection posts={posts} />
      <Link href="/en" hrefLang="en" lang="en" className="inline-block text-blue-300 hover:text-white underline underline-offset-4 mb-6">Read in English →</Link>
      <LatestPosts />
      <section aria-labelledby="all-posts" className="py-8">
        <h2 id="all-posts" className="text-3xl font-bold mb-6">Todos los artículos</h2>
        <p className="text-zinc-400 mb-6">Encuentra una guía por tema; todos los artículos están disponibles desde esta lista.</p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-white/10 pb-4">
              <span className="block text-xs text-zinc-400 mb-1">{post.frontMatter.category}</span>
              <Link href={`/blog/${post.slug}`} className="text-blue-300 hover:text-white">{post.frontMatter.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
