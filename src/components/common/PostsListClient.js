"use client";

import { useState, useMemo } from "react";
import PostCard from "../blog/postCard";

export default function PostsListClient({
  initialPosts = [],
  initialCount = 3,
  increment = 2,
  sortable = true,
}) {
  const [visible, setVisible] = useState(initialCount);
  const [order, setOrder] = useState("recent"); // "recent" | "old"

  const handleLoadMore = () =>
    setVisible((v) => Math.min(v + increment, initialPosts.length));

  // initialPosts ya viene ordenado de más reciente a más antiguo.
  const sorted = useMemo(
    () => (order === "recent" ? initialPosts : [...initialPosts].reverse()),
    [initialPosts, order]
  );

  if (!initialPosts || initialPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400 text-base sm:text-lg">No hay posts publicados aún.</p>
      </div>
    );
  }

  return (
    <div>
      {sortable && initialPosts.length > 1 && (
        <div className="flex items-center justify-end mb-5">
          <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 text-sm">
            <SortButton active={order === "recent"} onClick={() => setOrder("recent")}>
              Recientes
            </SortButton>
            <SortButton active={order === "old"} onClick={() => setOrder("old")}>
              Antiguos
            </SortButton>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
        {sorted.slice(0, visible).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {visible < sorted.length && (
        <div className="flex justify-center mt-8">
          <button onClick={handleLoadMore} className="btn-ghost">
            Ver más artículos
            <span aria-hidden>↓</span>
          </button>
        </div>
      )}
    </div>
  );
}

function SortButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`px-4 py-1.5 rounded-full transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "text-zinc-300 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
