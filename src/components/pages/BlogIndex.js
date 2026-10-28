import Link from 'next/link';
import LatestPosts from '@/components/common/LatestPosts';
import CategoriesSection from '@/components/common/CategoriesSection';
import { getAllPostsData } from '@lib/posts';
import { getEnglishPosts } from '@lib/translations';

export default function BlogIndex({ language = 'es' }) {
  const en = language === 'en';
  const posts = en ? getEnglishPosts() : getAllPostsData();
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-slate-900">
    <h1 className="text-4xl sm:text-5xl font-bold mb-8">Blog</h1>
    <CategoriesSection posts={posts} language={language} />
    <Link href={en ? '/blog' : '/en/blog'} hrefLang={en ? 'es' : 'en'} lang={en ? 'es' : 'en'} className="inline-block text-blue-700 hover:text-blue-700 underline underline-offset-4 mb-6">{en ? 'Leer en español →' : 'Read in English →'}</Link>
    <LatestPosts language={language} />
    <section aria-labelledby="all-posts" className="py-8">
      <h2 id="all-posts" className="text-3xl font-bold mb-6">{en ? 'All articles' : 'Todos los artículos'}</h2>
      <p className="text-slate-600 mb-6">{en ? 'Find a guide by topic; every article is available from this list.' : 'Encuentra una guía por tema; todos los artículos están disponibles desde esta lista.'}</p>
      <ul className="grid gap-4 sm:grid-cols-2">{posts.map(post => <li key={post.slug} className="border-b border-slate-200 pb-4"><span className="block text-xs text-slate-600 mb-1">{post.frontMatter.category}</span><Link href={`${en ? '/en' : '/blog'}/${post.slug}`} className="text-blue-700 hover:text-blue-700">{post.frontMatter.title}</Link></li>)}</ul>
    </section>
  </div>;
}
