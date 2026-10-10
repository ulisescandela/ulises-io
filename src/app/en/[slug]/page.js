import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEnglishPost, getEnglishPosts, languageAlternates } from '@lib/translations';
import { extractHeadings } from '@lib/toc';
import PostHeader from '@/components/blog/postHeader';
import PostCard from '@/components/blog/postCard';
import ReaderResources from '@/components/common/ReaderResources';
import ScrollToTop from '@/components/common/ScrollToTop';
import PostContent from '@/components/blog/postContent';
import TableOfContents from '@/components/blog/TableOfContents';
import ArticleAnalytics from '@/components/blog/ArticleAnalytics';
import ReadingProgress from '@/components/blog/ReadingProgress';
import LanguageSwitch from '@/components/blog/LanguageSwitch';

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

export default async function EnglishArticle({ params }) {
  const { slug } = await params;
  const post = getEnglishPost(slug);
  if (!post) notFound();
  const fm = post.frontMatter;
  const related = getEnglishPosts().filter((other) => other.slug !== slug)
    .sort((a, b) => Number(b.frontMatter.category === fm.category) - Number(a.frontMatter.category === fm.category)).slice(0, 3);
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: fm.title, description: fm.excerpt, inLanguage: 'en',
    image: `https://ulises.io/en/${slug}/opengraph-image`,
    datePublished: fm.date, ...(fm.updated && { dateModified: fm.updated }),
    author: { '@type': 'Person', name: 'Ulises Rodríguez Candela', url: 'https://ulises.io/about' },
    mainEntityOfPage: `https://ulises.io/en/${slug}`,
    translationOfWork: { '@type': 'BlogPosting', '@id': `https://ulises.io/blog/${post.sourceSlug}` },
  };
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-8 text-white">
      <article>
        <ReadingProgress />
        <ArticleAnalytics sourceSlug={post.sourceSlug} language="en" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
        <LanguageSwitch sourceSlug={post.sourceSlug} englishSlug={slug} language="en" />
        <ScrollToTop language="en" />
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-400 mb-8 flex gap-2"><Link href="/en#posts">Articles</Link><span>/</span><Link href={`/en/category/${encodeURIComponent(fm.category)}`}>{fm.category}</Link></nav>
        <PostHeader {...fm} language="en" />
        <TableOfContents headings={extractHeadings(post.content)} language="en" />
        <PostContent content={post.content} />
        <Link href="/en#posts" className="inline-flex mt-12 text-sm text-blue-300">← Back to articles</Link>
        <ReaderResources language="en" portfolio={post.sourceSlug === 'proyectos-valiosos-para-tu-cv-programador'} />
        <aside className="mt-12"><h2 className="text-2xl font-bold mb-5">Keep reading</h2><div className="grid gap-6">{related.map(other => <PostCard key={other.slug} post={other} language="en" />)}</div></aside>
      </article>
    </main>
  );
}
