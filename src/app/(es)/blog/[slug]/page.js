import { getPostBySlug, generateStaticParams, shouldShowPost } from '@lib/posts';
import { getEnglishTranslation, languageAlternates } from '@lib/translations';
import { notFound } from 'next/navigation';
import ArticlePage from '@/components/pages/ArticlePage';

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

  const translation = getEnglishTranslation(slug);
  return {
    title: post.frontMatter.title,
    description: post.frontMatter.excerpt,
    alternates: {
      canonical: `https://ulises.io/blog/${slug}`,
      ...(translation && { languages: languageAlternates(slug, translation.slug) }),
    },
    openGraph: {
      title: post.frontMatter.title,
      description: post.frontMatter.excerpt,
      url: `https://ulises.io/blog/${slug}`,
      siteName: 'Ulises.io',
      locale: 'es_ES',
      type: 'article',
      images: [post.frontMatter.coverImage || `https://ulises.io/blog/${slug}/opengraph-image`],
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

export default async function Page({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!shouldShowPost(post)) notFound();
  return <ArticlePage post={post} />;
}
