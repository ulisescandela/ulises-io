'use client';

import { useState } from 'react';

export default function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);
  
  const getCodeText = (node) => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(getCodeText).join('');
    if (node?.props?.children) return getCodeText(node.props.children);
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
        className="absolute right-3 top-3 px-2 py-1 text-xs rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
      >
        {copied ? '✓ Copiado' : 'Copiar'}
      </button>
      <pre className="bg-zinc-900 text-zinc-100 p-4 pt-10 rounded-lg overflow-x-auto border border-zinc-700 text-sm font-mono leading-relaxed [&>code]:bg-transparent [&>code]:border-0 [&>code]:p-0 [&>code]:text-inherit">
        {children}
      </pre>
    </div>
  );
}
