import CollectionPage from '@/components/pages/CollectionPage';
import { decodeRouteParam } from '@lib/routeParams';
import { getAllTags, getPostsByTag } from '@lib/posts';
import { normalizeTag } from '@lib/tags';
import { notFound, permanentRedirect } from 'next/navigation';

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }) {
  const { tag } = await params;
  const rawTag = decodeRouteParam(tag);
  const label = normalizeTag(rawTag);
  return {
    title: `Posts sobre ${label}`,
    description: `Artículos sobre ${label} en el blog de Ulises Rodríguez Candela.`,
    alternates: { canonical: `https://ulises.io/blog/tag/${encodeURIComponent(label)}` },
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }) { const { tag } = await params; const raw = decodeRouteParam(tag); const label = normalizeTag(raw); const posts = getPostsByTag(label); if (!posts.length) notFound(); if (raw !== label) permanentRedirect(`/blog/tag/${encodeURIComponent(label)}`); return <CollectionPage kind="tag" label={label} posts={posts} />; }
