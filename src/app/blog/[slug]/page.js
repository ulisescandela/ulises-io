// src/app/blog/[slug]/page.js

import { getPostBySlug, generateStaticParams, shouldShowPost, getRelatedPosts } from '../../../../lib/posts';
import { extractHeadings } from '../../../../lib/toc';
import PostContent from '@/components/blog/postContent';
import PostHeader from '@/components/blog/postHeader';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ReadingProgress from '@/components/blog/ReadingProgress';
import TableOfContents from '@/components/blog/TableOfContents';
import ScrollToTop from '@/components/common/ScrollToTop';
import Link from 'next/link';
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
      card: 'summary_large_image',
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

  const url = `https://ulises.io/blog/${slug}`;
  const ogImage = post.frontMatter.coverImage || `${url}/opengraph-image`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontMatter.title,
    description: post.frontMatter.excerpt,
    image: ogImage,
    inLanguage: 'es',
    datePublished: post.frontMatter.date,
    dateModified: post.frontMatter.updated || post.frontMatter.date,
    ...(post.frontMatter.category && { articleSection: post.frontMatter.category }),
    ...(post.frontMatter.tags && { keywords: post.frontMatter.tags }),
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
      '@id': url,
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://ulises.io' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://ulises.io/blog' },
      ...(post.frontMatter.category
        ? [{
            '@type': 'ListItem',
            position: 3,
            name: post.frontMatter.category,
            item: `https://ulises.io/blog/categoria/${encodeURIComponent(post.frontMatter.category)}`,
          }]
        : []),
      {
        '@type': 'ListItem',
        position: post.frontMatter.category ? 4 : 3,
        name: post.frontMatter.title,
        item: url,
      },
    ],
  };

  const related = getRelatedPosts(slug, 3);
  const headings = extractHeadings(post.content);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <ReadingProgress />
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav className="text-sm text-zinc-400 mb-8 flex items-center gap-2 flex-wrap">
        <Link href="/blog" className="hover:text-zinc-200 transition-colors">Blog</Link>
        {post.frontMatter.category && (
          <>
            <span className="text-zinc-600">/</span>
            <Link
              href={`/blog/categoria/${encodeURIComponent(post.frontMatter.category)}`}
              className="hover:text-zinc-200 transition-colors"
            >
              {post.frontMatter.category}
            </Link>
          </>
        )}
      </nav>

      <PostHeader
        title={post.frontMatter.title}
        category={post.frontMatter.category}
        date={post.frontMatter.date}
        readTime={post.frontMatter.readTime}
        tags={post.frontMatter.tags}
      />

      <TableOfContents headings={headings} />

      <PostContent content={post.content} />

      <div className="mt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span aria-hidden>←</span> Volver al blog
        </Link>
      </div>

      <RelatedPosts posts={related} />
    </article>
  );
}

