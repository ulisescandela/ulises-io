import { getAllPostsData } from "../../../lib/posts";
import { getEnglishPosts } from "../../../lib/translations";
import PostsListClient from "@/components/common/PostsListClient";
import Link from "next/link";

export default function LatestPosts({ language = "es" }) {
  const posts = language === "en" ? getEnglishPosts() : getAllPostsData();

  return (
    <section id="posts" className="w-full py-12 text-left">
      <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-8 flex items-center gap-3">
        <span className="h-7 w-1.5 rounded-full bg-gradient-to-b from-blue-400 to-purple-500" />
        {language === "en" ? "Latest articles" : "Últimos posts"}
      </h2>

      <PostsListClient initialPosts={posts} initialCount={4} increment={4} language={language} />

      <Link href={language === "en" ? "/en/blog" : "/blog"} className="inline-block mt-8 text-blue-300 underline underline-offset-4">{language === "en" ? "Explore all programming guides" : "Explora todas las guías de programación"} →</Link>
    </section>
  );
}