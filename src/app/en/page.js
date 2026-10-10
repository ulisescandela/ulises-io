import Link from 'next/link';
import { getEnglishPosts } from '@lib/translations';

export const metadata = {
  title: 'Programming articles in English',
  alternates: { canonical: 'https://ulises.io/en', languages: { en: 'https://ulises.io/en', es: 'https://ulises.io/blog' } },
};

export default function EnglishIndex() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-white">
      <h1 className="text-4xl sm:text-5xl font-bold mb-5">Build your skills as a developer</h1>
      <p className="text-zinc-400 text-lg mb-10">Programming, AI and career guides. Choose an article and put what you learn into practice.</p>
      <div className="grid gap-6 md:grid-cols-2">
        {getEnglishPosts().map((post) => (
          <article key={post.slug} className="glass-card rounded-2xl p-6">
            <p className="text-sm text-zinc-400 mb-3">{post.frontMatter.category} · {post.frontMatter.readTime} read</p>
            <h2 className="text-2xl font-bold mb-3"><Link href={`/en/${post.slug}`} className="hover:text-blue-300">{post.frontMatter.title}</Link></h2>
            <p className="text-zinc-400 mb-4">{post.frontMatter.excerpt}</p>
            <Link href={`/en/${post.slug}`} className="text-blue-300 hover:text-white">Read article <span aria-hidden>→</span></Link>
          </article>
        ))}
      </div>
    </main>
  );
}
