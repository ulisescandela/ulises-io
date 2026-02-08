import { getAllPostsData } from "../../../lib/posts";
import PostsListClient from "@/components/common/PostsListClient";
import TagsSection from "@/components/common/TagsSection";
import { FcNext } from "react-icons/fc";

export default function LatestPosts() {
  const posts = getAllPostsData();

  return (
    <section id="posts" className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 text-left">
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-200 mb-6 sm:mb-8 flex items-center gap-2">
        <FcNext />
        Últimos posts
      </h2>

      <PostsListClient initialPosts={posts} initialCount={3} increment={2} />

      <TagsSection posts={posts} />
    </section>
  );
}