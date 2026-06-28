import { getAllPostsData } from "../../../lib/posts";
import PostsListClient from "@/components/common/PostsListClient";
import TagsSection from "@/components/common/TagsSection";

export default function LatestPosts() {
  const posts = getAllPostsData();

  return (
    <section id="posts" className="w-full py-12 text-left">
      <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-8 flex items-center gap-3">
        <span className="h-7 w-1.5 rounded-full bg-gradient-to-b from-blue-400 to-purple-500" />
        Últimos posts
      </h2>

      <PostsListClient initialPosts={posts} initialCount={4} increment={4} />

      <TagsSection posts={posts} />
    </section>
  );
}