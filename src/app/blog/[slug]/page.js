// src/app/blog/[slug]/page.js

import { getPostBySlug, generateStaticParams, shouldShowPost } from '../../../../lib/posts';
import PostContent from '@/components/blog/postContent';
import PostHeader from '@/components/blog/postHeader';
import { notFound } from 'next/navigation';

export { generateStaticParams };

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);

  if (!shouldShowPost(post)) {
    return {
      title: 'Post Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: post.frontMatter.title,
    description: post.frontMatter.excerpt,
    date: post.frontMatter.date,
  };
}

export default async function BlogPost({ params }) {
  const slug = params.slug;
  const post = getPostBySlug(slug);

  if (!shouldShowPost(post)) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PostHeader
        title={post.frontMatter.title}
        date={post.frontMatter.date}
        readTime={post.frontMatter.readTime}
        tags={post.frontMatter.tags}
      />

      <PostContent content={post.content} />
    </div>
  );
}

