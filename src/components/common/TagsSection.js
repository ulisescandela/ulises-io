import PostCard from "../blog/postCard";
import Link from "next/link";

export default function TagsSection({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  const tagMap = {};
  posts.forEach((p) => {
    const tags = p.frontMatter?.tags || [];
    if (Array.isArray(tags)) {
      tags.forEach((t) => {
        const key = String(t);
        if (!tagMap[key]) tagMap[key] = [];
        tagMap[key].push(p);
      });
    } else if (tags) {
      const key = String(tags);
      if (!tagMap[key]) tagMap[key] = [];
      tagMap[key].push(p);
    }
  });

  const tags = Object.keys(tagMap).sort();

  return (
    <div className="w-full py-12 text-left">
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-200 mb-6 sm:mb-8">
        Elegir por tags
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog/tag/${encodeURIComponent(tag)}`}
            aria-label={`Ver posts con la etiqueta ${tag}`}
            className="block p-4 rounded-lg bg-white/5 border border-white/6 hover:scale-101 transition h-full"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between h-12">
                <span className="text-lg font-semibold">{tag}</span>
                <span className="text-sm text-zinc-300">{tagMap[tag].length}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
