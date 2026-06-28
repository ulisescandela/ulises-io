import Link from "next/link";
import { formatDate } from "./postHeader";

// Lista de posts relacionados que se muestra al final de cada artículo.
// Refuerza el enlazado interno (SEO) y la navegación.
export default function RelatedPosts({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-white/10">
      <h2 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-3">
        <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-blue-400 to-purple-500" />
        Sigue leyendo
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const { title, category, date, readTime } = post.frontMatter;
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass-card group p-5 rounded-2xl flex flex-col"
            >
              {category && (
                <span className="text-xs font-semibold text-blue-200 bg-blue-600/20 border border-blue-500/30 px-2.5 py-1 rounded-full w-fit mb-3">
                  {category}
                </span>
              )}
              <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors line-clamp-3 mb-3">
                {title}
              </h3>
              <div className="mt-auto flex items-center gap-2 text-xs text-zinc-400">
                {date && <time>{formatDate(date)}</time>}
                {readTime && (
                  <>
                    <span className="text-zinc-600">•</span>
                    <span>{readTime}</span>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
