// src/app/blog/page.js
import LatestPosts from '@/components/common/LatestPosts';
import { getAllPostsData } from '../../../lib/posts';
import CategoriesSection from '@/components/common/CategoriesSection';

export const metadata = {
  title: 'Blog',
  description: 'Artículos sobre programación, tecnología, desarrollo web, carrera profesional en IT y más.',
  alternates: {
    canonical: 'https://ulises.io/blog',
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
      <LatestPosts />
    </div>
  );
}
