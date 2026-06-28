import Link from "next/link";
import { getCategoryMeta } from "./categoryMeta";

// Muestra las categorías canónicas del blog como páginas pilar navegables,
// cada una con su icono, color de acento y descripción.
export default function CategoriesSection({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  const counts = {};
  posts.forEach((p) => {
    const cat = p.frontMatter?.category;
    if (!cat) return;
    counts[cat] = (counts[cat] || 0) + 1;
  });

  const categories = Object.keys(counts).sort();
  if (categories.length === 0) return null;

  return (
    <div className="w-full py-10 text-left">
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-8 flex items-center gap-3">
        <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-blue-400 to-purple-500" />
        Explora por categoría
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const meta = getCategoryMeta(cat);
          const Icon = meta.icon;
          return (
            <Link
              key={cat}
              href={`/blog/categoria/${encodeURIComponent(cat)}`}
              aria-label={`Ver artículos de la categoría ${cat}`}
              className={`glass-card group flex items-start gap-4 p-5 rounded-2xl ${meta.hoverBorder}`}
            >
              <span
                className={`shrink-0 grid place-items-center h-11 w-11 rounded-xl text-xl ${meta.iconClass}`}
                aria-hidden
              >
                <Icon />
              </span>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">
                    {cat}
                  </span>
                  <span className="text-xs text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full">
                    {counts[cat]}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 mt-1 leading-snug">{meta.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
