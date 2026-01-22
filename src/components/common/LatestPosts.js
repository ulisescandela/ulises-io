import { getAllPostsData } from "../../../lib/posts";
import PostCard from "../blog/postCard";
import { FcNext } from "react-icons/fc";

export default function LatestPosts() {
  const posts = getAllPostsData();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 text-left">
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-200 mb-6 sm:mb-8 flex items-center gap-2">
        <FcNext />
        Últimos posts
      </h2>
      {posts.length > 0 ? (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-1">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-base sm:text-lg">No hay posts publicados aún.</p>
        </div>
      )}
    </section>
  );
}