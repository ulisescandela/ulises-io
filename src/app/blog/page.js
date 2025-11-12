// src/app/blog/page.js
import LatestPosts from '@/components/common/latestPosts';
import { getAllPostsData } from '../../../lib/posts';
import PostCard from '@/components/blog/postCard';

export default function BlogPage() {
  const posts = getAllPostsData();

  return (
    <div className="max-w-4xl mx-auto px-4 pb-8 text-zinc-200">
      <h1 className="text-5xl font-bold mb-8">Blog</h1>
      <LatestPosts />
    </div>
  );
}
