// src/components/blog/PostHeader.js

export function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function PostHeader({ title, date, readTime, tags }) {
  return (
    <header className="mb-8 pb-8 border-b border-gray-200">
      <h1 className="text-4xl md:text-5xl font-bold text-zinc-200 mb-4 leading-tight">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-2 text-zinc-200">
        {date && (
          <time className="text-sm font-medium">
            {formatDate(date)}
          </time>
        )}



        {readTime && (
          <>
          <span className="text-zinc-400">•</span>
          <span className="text-sm italic bg-zinc-700 px-2 py-1 rounded-full">{readTime} de lectura</span>
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
        <span key={tag} className="text-xs bg-blue-600/50 text-white px-2 py-1 rounded-full">
          {tag}
        </span>
      ))}
    </div>
  );
}