// src/app/blog/page.js
import LatestPosts from '@/components/common/LatestPosts';
import { getAllPostsData } from '../../../lib/posts';
import PostCard from '@/components/blog/postCard';

export const metadata = {
  title: 'Blog - Ulises.io',
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
    <div className="max-w-4xl mx-auto px-4 pb-8 text-zinc-200">
      <h1 className="text-5xl font-bold mb-8">Blog</h1>
      <LatestPosts />
    </div>
  );
}
