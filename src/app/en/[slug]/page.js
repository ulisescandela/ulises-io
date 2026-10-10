import { notFound } from 'next/navigation';
import { getEnglishPost, getEnglishPosts, languageAlternates } from '@lib/translations';
import ArticlePage from '@/components/pages/ArticlePage';
import BlogShell from '@/components/pages/BlogShell';

export function generateStaticParams() {
  return getEnglishPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getEnglishPost(slug);
  if (!post) return { title: 'Article not found', robots: { index: false } };
  const url = `https://ulises.io/en/${slug}`;
  const fm = post.frontMatter;
  return {
    title: fm.title, description: fm.excerpt,
    alternates: { canonical: url, languages: languageAlternates(post.sourceSlug, slug) },
    openGraph: { type: 'article', locale: 'en_US', title: fm.title, description: fm.excerpt, url,
      publishedTime: fm.date, authors: ['Ulises Rodríguez Candela'],
      images: [`${url}/opengraph-image`] },
    twitter: { card: 'summary_large_image', title: fm.title, description: fm.excerpt },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = getEnglishPost(slug);
  if (!post) notFound();
  return <BlogShell language="en"><ArticlePage post={post} language="en" /></BlogShell>;
}
