import Link from 'next/link';
import { formatDate } from './postHeader';

export default function PostCard({ post }) {
  if (!post || !post.frontMatter) {
    return null;
  }

  const { title, category, date, excerpt, readTime, tags } = post.frontMatter;

  return (
    <article className="glass-card group p-6 sm:p-7 rounded-2xl text-left">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex flex-wrap items-center gap-3 mb-3 text-zinc-400">
          {category && (
            <span className="text-xs font-semibold text-blue-200 bg-blue-600/20 border border-blue-500/30 px-2.5 py-1 rounded-full">
              {category}
            </span>
          )}
          {date && <time className="text-xs italic">{formatDate(date)}</time>}
          {readTime && (
            <>
              <span className="text-zinc-600">•</span>
              <span className="text-xs">{readTime} de lectura</span>
            </>
          )}
        </div>

        <h3 className="text-2xl lg:text-3xl font-semibold mb-3 line-clamp-2 text-zinc-100 group-hover:text-white transition-colors">
          {title}
        </h3>

        {excerpt && (
          <p className="mb-4 text-zinc-400 line-clamp-2 leading-relaxed">{excerpt}</p>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs text-zinc-300 bg-white/5 border border-white/10 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:gap-2.5 transition-all">
          Leer artículo
          <span aria-hidden>→</span>
        </span>
      </Link>
    </article>
  );
}
