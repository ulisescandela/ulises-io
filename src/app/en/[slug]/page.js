import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEnglishPost, getEnglishPosts, languageAlternates } from '@lib/translations';
import { extractHeadings } from '@lib/toc';
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
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-white">
      <article>
        <ReadingProgress />
        <ArticleAnalytics sourceSlug={post.sourceSlug} language="en" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
        <LanguageSwitch sourceSlug={post.sourceSlug} englishSlug={slug} language="en" />
        <header className="mb-8 border-b border-white/10 pb-8">
          <p className="text-blue-300 mb-3">{fm.category}</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">{fm.title}</h1>
          <p className="text-zinc-400 text-sm">By Ulises Rodríguez Candela · <time dateTime={fm.date}>{new Date(`${fm.date}T00:00:00Z`).toLocaleDateString('en', { dateStyle: 'long', timeZone: 'UTC' })}</time> · {fm.readTime} read</p>
        </header>
        <TableOfContents headings={extractHeadings(post.content)} language="en" />
        <PostContent content={post.content} />
        <aside className="mt-12 border-t border-white/10 pt-8">
          <h2 className="text-2xl font-bold mb-5">Keep reading</h2>
          <ul className="space-y-4">{related.map((other) => <li key={other.slug}><Link className="text-blue-300 hover:text-white underline underline-offset-4" href={`/en/${other.slug}`}>{other.frontMatter.title}</Link></li>)}</ul>
          <Link href="/en" className="btn-ghost mt-8">All articles</Link>
        </aside>
      </article>
    </main>
  );
}
