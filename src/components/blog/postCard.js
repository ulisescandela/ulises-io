import Link from 'next/link';
import { formatDate } from './postHeader';
import { getCategoryMeta } from '../common/categoryMeta';

// Franja de color superior por categoría (valores literales para el build).
const ACCENTS = {
  Carrera: "linear-gradient(90deg,#2563eb,#60a5fa)",
  Programación: "linear-gradient(90deg,#7c3aed,#a78bfa)",
  Herramientas: "linear-gradient(90deg,#059669,#34d399)",
  IA: "linear-gradient(90deg,#0891b2,#22d3ee)",
  Reflexiones: "linear-gradient(90deg,#d97706,#fbbf24)",
};

export default function PostCard({ post, language = "es" }) {
  if (!post || !post.frontMatter) {
    return null;
  }

  const { title, category, date, excerpt, readTime, tags } = post.frontMatter;
  const meta = getCategoryMeta(category || "", language);
  const Icon = meta.icon;
  const accent = ACCENTS[meta.key] || undefined;
  const formattedDate = date
    ? language === "en"
      ? new Date(`${date}T00:00:00Z`).toLocaleDateString("en", { dateStyle: "long", timeZone: "UTC" })
      : formatDate(date)
    : null;

  return (
    <article
      className="glass-card post-card group rounded-2xl text-left h-full"
      style={accent ? { "--card-accent": accent } : undefined}
    >
      <Link href={`${language === "en" ? "/en" : "/blog"}/${post.slug}`} className="flex h-full flex-col p-6 sm:p-7 pt-7 sm:pt-8">
        <div className="flex items-center justify-between gap-3 mb-4">
          {category && (
            <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider pr-3 rounded-full ${meta.iconClass.replace(/bg-\S+/, "")}`}>
              <span className={`grid place-items-center h-7 w-7 rounded-lg text-sm ${meta.iconClass}`} aria-hidden>
                <Icon />
              </span>
              {category}
            </span>
          )}
          {readTime && (
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap">
              {readTime} {language === "en" ? "read" : "de lectura"}
            </span>
          )}
        </div>

        <h3 className="text-2xl lg:text-[1.65rem] font-bold leading-snug tracking-tight mb-3 line-clamp-3 text-slate-900 group-hover:text-blue-700 transition-colors">
          {title}
        </h3>

        {excerpt && (
          <p className="mb-5 text-slate-600 line-clamp-3 leading-relaxed">{excerpt}</p>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5 items-center">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-blue-800 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-dashed border-slate-200">
          {formattedDate && <time className="text-xs text-slate-500">{formattedDate}</time>}
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:gap-2.5 transition-all">
            {language === "en" ? "Read article" : "Leer artículo"}
            <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
