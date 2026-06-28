// src/components/blog/PostContent.js
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import CodeBlock from './codeBlock';

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
    <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-zinc-800/50 italic text-zinc-300">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-zinc-800 px-1.5 py-0.5 rounded-md text-sm font-mono text-emerald-400 border border-zinc-700">
      {children}
    </code>
  ),
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
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
  a: ({ children, href }) => {
    const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
    const className =
      'text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors';
    if (isInternal) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
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
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-zinc-700 rounded-lg overflow-hidden">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-zinc-800">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-zinc-700">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-zinc-800/50 transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-200 border-b border-zinc-700">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-sm text-zinc-300 border-b border-zinc-800">
      {children}
    </td>
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
      <MDXRemote 
        source={content} 
        components={customComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </article>
  );
}
