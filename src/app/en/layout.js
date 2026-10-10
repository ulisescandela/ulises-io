import RootDocument from '@/components/layout/RootDocument';
import Link from 'next/link';

export const metadata = {
  metadataBase: new URL('https://ulises.io'),
  title: { default: 'Programming and Software Engineering | Ulises.io', template: '%s | Ulises.io' },
  description: 'Practical articles on programming, software engineering, AI and developer careers by Ulises Rodríguez Candela.',
  authors: [{ name: 'Ulises Rodríguez Candela' }],
};

export default function EnglishLayout({ children }) {
  return (
    <RootDocument lang="en">
      <header className="border-b border-white/10 text-white">
        <nav aria-label="Main navigation" className="max-w-5xl mx-auto px-4 py-5 flex flex-wrap gap-6 items-center">
          <Link href="/en" className="text-xl font-bold text-blue-300">ulises.io</Link>
          <Link href="/en" className="text-zinc-300 hover:text-white">Articles</Link>
          <Link href="/blog" hrefLang="es" lang="es" className="text-zinc-300 hover:text-white">Español</Link>
        </nav>
      </header>
      {children}
    </RootDocument>
  );
}
