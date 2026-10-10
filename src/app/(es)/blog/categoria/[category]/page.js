import CollectionPage from '@/components/pages/CollectionPage';
import { decodeRouteParam } from '@lib/routeParams';
import { getAllCategories, getPostsByCategory } from '@lib/posts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ category: c }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const rawCategory = decodeRouteParam(category);
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

export default async function Page({ params }) { const { category } = await params; const label = decodeRouteParam(category); const posts = getPostsByCategory(label); if (!posts.length) notFound(); return <CollectionPage kind="category" label={label} posts={posts} />; }
