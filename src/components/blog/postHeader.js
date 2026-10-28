// src/components/blog/PostHeader.js
import Link from 'next/link';

export function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function PostHeader({ title, category, date, readTime, tags, language = "es" }) {
  return (
    <header className="mb-8 pb-8 border-b border-slate-200">
      {category && (
        <Link
          href={`${language === "en" ? "/en/category" : "/blog/categoria"}/${encodeURIComponent(category)}`}
          className="inline-block mb-4 text-sm font-semibold text-blue-700 bg-blue-600/20 px-3 py-1 rounded-full hover:bg-blue-600/30 transition"
        >
          {category}
        </Link>
      )}

      <p className="text-sm text-slate-600 mb-4">{language === "en" ? "By" : "Por"} <Link href={language === "en" ? "/en/about" : "/about"} rel="author" className="text-blue-700 hover:text-blue-700">Ulises Rodríguez Candela</Link></p>

      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-2 text-slate-900">
        {date && (
          <time className="text-sm font-medium">
            {language === "en" ? new Date(`${date}T00:00:00Z`).toLocaleDateString("en", { dateStyle: "long", timeZone: "UTC" }) : formatDate(date)}
          </time>
        )}



        {readTime && (
          <>
          <span className="text-slate-600">•</span>
          <span className="text-sm italic bg-blue-50 text-blue-800 border border-blue-100 px-2 py-1 rounded-full">{readTime} {language === "en" ? "read" : "de lectura"}</span>
          </>
        )}

        {/* {tags && tags.length > 0 && (
          <div className="flex gap-2 ml-auto">
            {tags.map(tag => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )} */}

        {tags && tags.length > 0 && (
          <PostTags tags={tags} />
        )}
      </div>
    </header>
  );
}


function PostTags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {tags.map((tag) => (
        <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {tag}
        </span>
      ))}
    </div>
  );
}