import PostsListClient from '@/components/common/PostsListClient';
import { getAllTags, getPostsByTag } from '../../../../../lib/posts';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((t) => ({ tag: encodeURIComponent(t) }));
}

export async function generateMetadata({ params }) {
  const rawTag = params?.tag ? decodeURIComponent(params.tag) : '';
  return {
    title: `Posts sobre ${rawTag}`,
    description: `Artículos y posts etiquetados con "${rawTag}" en el blog de Ulises Rodríguez Candela.`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function TagPage({ params }) {
  const rawTag = params?.tag ? decodeURIComponent(params.tag) : '';
  const posts = getPostsByTag(rawTag);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-zinc-200">
      <h1 className="text-4xl font-bold mb-6">Etiqueta: {rawTag}</h1>
      <p className="mb-6 text-zinc-300">Mostrando {posts.length} posts para la etiqueta <strong>{rawTag}</strong>.</p>

      <PostsListClient initialPosts={posts} initialCount={5} increment={5} />
    </div>
  );
}
