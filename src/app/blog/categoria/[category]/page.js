import PostsListClient from '@/components/common/PostsListClient';
import { getAllCategories, getPostsByCategory } from '../../../../../lib/posts';
import { getCategoryMeta } from '@/components/common/categoryMeta';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ category: encodeURIComponent(c) }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const rawCategory = category ? decodeURIComponent(category) : '';
  return {
    title: `Artículos sobre ${rawCategory}`,
    description: `Todos los artículos sobre ${rawCategory} en el blog de Ulises Rodríguez Candela: guías, consejos y experiencias para desarrolladores.`,
    alternates: {
      canonical: `https://ulises.io/blog/categoria/${encodeURIComponent(rawCategory)}`,
    },
    openGraph: {
      title: `${rawCategory} - Blog de Ulises.io`,
      description: `Artículos sobre ${rawCategory} en el blog de Ulises Rodríguez Candela.`,
      url: `https://ulises.io/blog/categoria/${encodeURIComponent(rawCategory)}`,
      siteName: 'Ulises.io',
      locale: 'es_ES',
      type: 'website',
    },
    // Las categorías SÍ se indexan: son páginas pilar con contenido sustancial.
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const rawCategory = category ? decodeURIComponent(category) : '';
  const posts = getPostsByCategory(rawCategory);

  if (posts.length === 0) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${rawCategory} - Blog de Ulises.io`,
    description: `Artículos sobre ${rawCategory} en el blog de Ulises Rodríguez Candela.`,
    url: `https://ulises.io/blog/categoria/${encodeURIComponent(rawCategory)}`,
    inLanguage: 'es',
  };

  const meta = getCategoryMeta(rawCategory);
  const Icon = meta.icon;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-zinc-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-zinc-400 mb-6">
        <Link href="/blog" className="hover:text-zinc-200 transition-colors">Blog</Link>
        <span className="mx-2 text-zinc-600">/</span>
        <span className="text-zinc-300">{rawCategory}</span>
      </nav>

      <div className="flex items-center gap-4 mb-3">
        <span
          className={`shrink-0 grid place-items-center h-14 w-14 rounded-2xl text-2xl ${meta.iconClass}`}
          aria-hidden
        >
          <Icon />
        </span>
        <div>
          <h1 className="text-4xl font-bold leading-tight">{rawCategory}</h1>
          <p className="text-zinc-400 mt-1">{meta.desc}</p>
        </div>
      </div>

      <p className="mb-8 text-sm text-zinc-500">
        {posts.length} {posts.length === 1 ? 'artículo' : 'artículos'}
      </p>

      <PostsListClient initialPosts={posts} initialCount={10} increment={10} />
    </div>
  );
}
