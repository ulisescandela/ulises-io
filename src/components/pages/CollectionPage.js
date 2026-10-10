import Link from 'next/link';
import PostsListClient from '@/components/common/PostsListClient';
import { getCategoryMeta } from '@/components/common/categoryMeta';

export default function CollectionPage({ kind, label, posts, language = 'es' }) {
  const en = language === 'en';
  const category = kind === 'category';
  const meta = getCategoryMeta(label, language);
  const Icon = meta.icon;
  const blog = en ? '/en/blog' : '/blog';
  const url = `https://ulises.io${en ? '/en/category' : '/blog/categoria'}/${encodeURIComponent(label)}`;
  const jsonLd = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `${label} - ${en ? 'Ulises.io Blog' : 'Blog de Ulises.io'}`, description: en ? `Articles about ${label} on Ulises Rodríguez Candela’s blog.` : `Artículos sobre ${label} en el blog de Ulises Rodríguez Candela.`, url, inLanguage: language };
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-zinc-200">
    {category ? <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <nav className="text-sm text-zinc-400 mb-6"><Link href={blog} className="hover:text-zinc-200 transition-colors">Blog</Link><span className="mx-2 text-zinc-600">/</span><span className="text-zinc-300">{label}</span></nav>
      <div className="flex items-center gap-4 mb-3"><span className={`shrink-0 grid place-items-center h-14 w-14 rounded-2xl text-2xl ${meta.iconClass}`} aria-hidden><Icon /></span><div><h1 className="text-4xl font-bold leading-tight">{label}</h1><p className="text-zinc-400 mt-1">{meta.desc}</p></div></div>
      <p className="mb-8 text-sm text-zinc-500">{posts.length} {en ? (posts.length === 1 ? 'article' : 'articles') : (posts.length === 1 ? 'artículo' : 'artículos')}</p>
    </> : <>
      <h1 className="text-4xl font-bold mb-6">{en ? 'Tag' : 'Etiqueta'}: {label}</h1>
      <p className="mb-6 text-zinc-300">{en ? `Showing ${posts.length} posts tagged ` : `Mostrando ${posts.length} posts para la etiqueta `}<strong>{label}</strong>.</p>
    </>}
    <PostsListClient initialPosts={posts} initialCount={category ? 10 : 5} increment={category ? 10 : 5} language={language} />
  </div>;
}
