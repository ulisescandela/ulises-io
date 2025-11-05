// src/components/blog/PostContent.js
import { MDXRemote } from 'next-mdx-remote/rsc';

const customComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8 pb-3">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-8">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
      {children}
    </p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 italic text-gray-700">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800 border">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 border">
      {children}
    </pre>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-6 text-gray-700 space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-lg leading-relaxed">
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
    <strong className="font-bold text-gray-900">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-gray-800">
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
