// src/components/blog/PostCard.js
import Link from 'next/link';
import { formatDate } from './postHeader';

export default function PostCard({ post }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-gray-300">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {post.frontMatter.title}
          </h3>
          {post.frontMatter.date && (
            <time className="text-sm text-gray-500 font-medium">
              {formatDate(post.frontMatter.date)}
            </time>
          )}
          {post.frontMatter.excerpt && (
            //truncate to 150 characters
            <p className="text-gray-600 mt-4 leading-relaxed">
              {post.frontMatter.excerpt.length > 60
                ? post.frontMatter.excerpt.substring(0, 60).trim() + '...'
                : post.frontMatter.excerpt}
            </p>
          )}
          <div className="mt-4 text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
            Leer más →
          </div>
        </div>
      </Link>
    </article>
  );
}
