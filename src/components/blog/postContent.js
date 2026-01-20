// src/components/blog/PostContent.js
'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { useState } from 'react';

// Componente para bloques de código con botón de copiar
function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);
  
  const getCodeText = (children) => {
    if (typeof children === 'string') return children;
    if (children?.props?.children) return getCodeText(children.props.children);
    if (Array.isArray(children)) return children.map(getCodeText).join('');
    return '';
  };

  const handleCopy = async () => {
    const code = getCodeText(children);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 px-2 py-1 text-xs rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        {copied ? '✓ Copiado' : 'Copiar'}
      </button>
      <pre className="bg-zinc-900 text-zinc-100 p-4 pt-10 rounded-lg overflow-x-auto border border-zinc-700 text-sm font-mono leading-relaxed">
        {children}
      </pre>
    </div>
  );
}

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
