"use client";

import { useState } from "react";
import PostCard from "../blog/postCard";

export default function PostsListClient({ initialPosts = [], initialCount = 3, increment = 2 }) {
  const [visible, setVisible] = useState(initialCount);

  const handleLoadMore = () => setVisible((v) => Math.min(v + increment, initialPosts.length));

  if (!initialPosts || initialPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-base sm:text-lg">No hay posts publicados aún.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-1">
        {initialPosts.slice(0, visible).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {visible < initialPosts.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
}
