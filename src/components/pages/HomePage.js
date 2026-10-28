import Hero from '@/components/common/Hero';
import ReadingPaths from '@/components/common/ReadingPaths';
import LatestPosts from '@/components/common/LatestPosts';
import Header from '@/components/layout/Header';

export default function HomePage({ language = 'es' }) {
  const en = language === 'en';
  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Ulises.io', url: en ? 'https://ulises.io/en' : 'https://ulises.io', inLanguage: language, description: en ? 'Personal blog about programming, technology and software development.' : 'Blog personal sobre programación, tecnología y desarrollo de software.', author: { '@type': 'Person', name: 'Ulises Rodriguez Candela', url: en ? 'https://ulises.io/en/about' : 'https://ulises.io/about' } };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <a href="#main-content" className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[100] focus-visible:p-3 focus-visible:bg-blue-600 focus-visible:text-white focus-visible:rounded-lg focus-visible:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">{en ? 'Skip to content' : 'Saltar al contenido'}</a>
    <Header language={language} />
    <main id="main-content" className="pt-16 w-full text-center text-slate-900 font-sans">
      <Hero language={language} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left"><ReadingPaths language={language} /><LatestPosts language={language} /></div>
    </main>
  </>;
}
