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

  const { title, category, date, excerpt, readTime } = post.frontMatter;
  const meta = getCategoryMeta(category || "", language);
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
        {category && (
          <span className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue-700">{category}</span>
        )}

        <h3 className="text-xl sm:text-2xl font-bold leading-snug tracking-tight mb-3 line-clamp-3 text-slate-900 group-hover:text-blue-700 transition-colors">
          {title}
        </h3>

        {excerpt && (
          <p className="mb-5 text-slate-600 line-clamp-2 leading-relaxed">{excerpt}</p>
        )}

        <p className="mt-auto text-xs text-slate-500">
          {formattedDate}
          {readTime && <> · {readTime} {language === "en" ? "read" : "de lectura"}</>}
        </p>
      </Link>
    </article>
  );
}
