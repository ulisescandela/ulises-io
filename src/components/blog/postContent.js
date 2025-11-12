// src/components/blog/PostContent.js
import { MDXRemote } from 'next-mdx-remote/rsc';

const customComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold text-zinc-200 mb-6 mt-8 pb-3">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold text-zinc-200 mb-4 mt-8">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold text-zinc-200 mb-3 mt-6">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-zinc-200 mb-3 mt-6">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-zinc-200 leading-relaxed mb-6 text-lg">
      {children}
    </p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 italic text-zinc-200">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-zinc-200 border">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 border">
      {children}
    </pre>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-6 text-zinc-200 space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-6 text-zinc-200 space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-lg leading-relaxed [&>p]:inline [&>p]:m-0 mb-6">
      {children}
    </li>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-800 underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-zinc-200">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-zinc-200">
      {children}
    </em>
  ),
  img: ({ src, alt, width, height }) => (
    <img
      src={src}
      alt={alt}
      className="max-w-full h-auto rounded-sm my-6 border-1 border-gray-200 shadow-sm"
      style={{ width: width || '100%', height: height || 'auto' }}
    />
  ),
};

export default function PostContent({ content }) {
  return (
    <article className="max-w-none">
      <MDXRemote source={content} components={customComponents} />
    </article>
  );
}
