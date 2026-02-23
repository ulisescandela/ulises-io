// src/app/blog/[slug]/page.js

import { getPostBySlug, generateStaticParams, shouldShowPost } from '../../../../lib/posts';
import PostContent from '@/components/blog/postContent';
import PostHeader from '@/components/blog/postHeader';
import { notFound } from 'next/navigation';

export { generateStaticParams };

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

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
    alternates: {
      canonical: `https://ulises.io/blog/${slug}`,
    },
    openGraph: {
      title: post.frontMatter.title,
      description: post.frontMatter.excerpt,
      url: `https://ulises.io/blog/${slug}`,
      siteName: 'Ulises.io',
      locale: 'es_ES',
      type: 'article',
      publishedTime: post.frontMatter.date,
      authors: ['Ulises Rodriguez Candela'],
      tags: post.frontMatter.tags,
    },
    twitter: {
      card: 'summary',
      title: post.frontMatter.title,
      description: post.frontMatter.excerpt,
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!shouldShowPost(post)) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontMatter.title,
    description: post.frontMatter.excerpt,
    datePublished: post.frontMatter.date,
    author: {
      '@type': 'Person',
      name: 'Ulises Rodriguez Candela',
      url: 'https://ulises.io',
    },
    publisher: {
      '@type': 'Person',
      name: 'Ulises Rodriguez Candela',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ulises.io/blog/${slug}`,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

