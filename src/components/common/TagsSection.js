import { normalizeTags } from "../../../lib/tags";
import Link from "next/link";

export default function TagsSection({ posts = [], language = "es" }) {
  if (!posts || posts.length === 0) return null;

  const tagMap = {};
  posts.forEach((p) => {
    (language === "en" ? [p.frontMatter.category].filter(Boolean) : normalizeTags(p.frontMatter?.tags)).forEach((key) => {
      if (!tagMap[key]) tagMap[key] = [];
      tagMap[key].push(p);
    });
  });

  const tags = Object.keys(tagMap).sort();

  return (
    <div className="w-full py-12 text-left">
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-8 flex items-center gap-3">
        <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500" />
        {language === "en" ? "Explore by topic" : "Explora por tema"}
      </h2>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={language === "en" ? `/en/category/${encodeURIComponent(tag)}` : `/blog/tag/${encodeURIComponent(tag)}`}
            aria-label={language === "en" ? `Articles about ${tag}` : `Ver posts con la etiqueta ${tag}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-blue-400/50 hover:bg-blue-600/10 transition"
          >
            <span className="font-medium">{tag}</span>
            <span className="text-xs text-zinc-500">{tagMap[tag].length}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
