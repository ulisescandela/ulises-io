import Link from 'next/link';
import { extractHeadings } from '@lib/toc';
import { getRelatedPosts } from '@lib/posts';
import { getEnglishPosts, getEnglishTranslation } from '@lib/translations';
import PostContent from '@/components/blog/postContent';
import PostHeader from '@/components/blog/postHeader';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ReadingProgress from '@/components/blog/ReadingProgress';
import TableOfContents from '@/components/blog/TableOfContents';
import ScrollToTop from '@/components/common/ScrollToTop';
import ReaderResources from '@/components/common/ReaderResources';
import LanguageSwitch from '@/components/blog/LanguageSwitch';
import ArticleAnalytics from '@/components/blog/ArticleAnalytics';

export default function ArticlePage({ post, language = 'es' }) {
  const en = language === 'en';
  const sourceSlug = en ? post.sourceSlug : post.slug;
  const translation = en ? post : getEnglishTranslation(sourceSlug);
  const fm = post.frontMatter;
  const blog = en ? '/en/blog' : '/blog';
  const category = `${en ? '/en/category' : '/blog/categoria'}/${encodeURIComponent(fm.category)}`;
  const url = `https://ulises.io/${en ? 'en' : 'blog'}/${post.slug}`;
  const image = fm.coverImage || `${url}/opengraph-image`;
  const translations = en ? new Map(getEnglishPosts().map(item => [item.sourceSlug, item])) : null;
  const related = getRelatedPosts(sourceSlug, 3).map(item => en ? translations.get(item.slug) : item).filter(Boolean);
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: fm.title, description: fm.excerpt,
    image, inLanguage: language, datePublished: fm.date, dateModified: fm.updated || fm.date,
    ...(fm.category && { articleSection: fm.category }), ...(fm.tags && { keywords: fm.tags }),
    author: { '@type': 'Person', name: 'Ulises Rodriguez Candela', url: `https://ulises.io${en ? '/en/about' : '/about'}` },
    publisher: { '@type': 'Person', name: 'Ulises Rodriguez Candela' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(en && { translationOfWork: { '@type': 'BlogPosting', '@id': `https://ulises.io/blog/${sourceSlug}` } }),
  };
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: en ? 'Home' : 'Inicio', item: `https://ulises.io${en ? '/en' : ''}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://ulises.io${blog}` },
      ...(fm.category ? [{ '@type': 'ListItem', position: 3, name: fm.category, item: `https://ulises.io${category}` }] : []),
      { '@type': 'ListItem', position: fm.category ? 4 : 3, name: fm.title, item: url },
    ],
  };
  return <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
    <ReadingProgress /><ArticleAnalytics sourceSlug={sourceSlug} language={language} />
    {translation && <LanguageSwitch sourceSlug={sourceSlug} englishSlug={translation.slug} language={language} />}
    <ScrollToTop language={language} />
    {[schema, breadcrumb].map((data, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />)}
    <nav className="text-sm text-zinc-400 mb-8 flex items-center gap-2 flex-wrap">
      <Link href={blog} className="hover:text-zinc-200 transition-colors">Blog</Link>
      {fm.category && <><span className="text-zinc-600">/</span><Link href={category} className="hover:text-zinc-200 transition-colors">{fm.category}</Link></>}
    </nav>
    <PostHeader {...fm} language={language} />
    <TableOfContents headings={extractHeadings(post.content)} language={language} />
    <PostContent content={post.content} />
    <div className="mt-12"><Link href={blog} className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"><span aria-hidden>←</span>{en ? 'Back to the blog' : 'Volver al blog'}</Link></div>
    <ReaderResources portfolio={sourceSlug === 'proyectos-valiosos-para-tu-cv-programador'} language={language} />
    <RelatedPosts posts={related} language={language} />
  </article>;
}
