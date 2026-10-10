import PostsListClient from '@/components/common/PostsListClient';
import { getAllTags, getPostsByTag } from '@lib/posts';
import { normalizeTag } from '@lib/tags';
import { decodeRouteParam } from '@lib/routeParams';
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

export default async function TagPage({ params }) {
  const { tag } = await params;
  const rawTag = decodeRouteParam(tag);
  const label = normalizeTag(rawTag);
  const posts = getPostsByTag(label);
  if (!posts.length) notFound();
  if (rawTag !== label) permanentRedirect(`/blog/tag/${encodeURIComponent(label)}`);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-zinc-200">
      <h1 className="text-4xl font-bold mb-6">Etiqueta: {label}</h1>
      <p className="mb-6 text-zinc-300">Mostrando {posts.length} posts para la etiqueta <strong>{label}</strong>.</p>
      <PostsListClient initialPosts={posts} initialCount={5} increment={5} />
    </div>
  );
}
