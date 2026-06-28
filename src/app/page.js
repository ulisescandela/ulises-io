// src/app/page.js
import Hero from '@/components/common/Hero';
import LatestPosts from '@/components/common/LatestPosts';
import Header from '@/components/layout/Header';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Ulises.io',
  url: 'https://ulises.io',
  description: 'Blog personal sobre programación, tecnología y desarrollo de software.',
  author: {
    '@type': 'Person',
    name: 'Ulises Rodriguez Candela',
    url: 'https://ulises.io',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[100] focus-visible:p-3 focus-visible:bg-blue-600 focus-visible:text-white focus-visible:rounded-lg focus-visible:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
      >
        Saltar al contenido
      </a>
      <Header />
      <main
        id="main-content"
        className="pt-16 w-screen text-center text-white font-sans"
      >
        <Hero />
        {/* <About /> */}
        {/* <Interests /> */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <LatestPosts />
        </div>
      </main>
    </>
  );
}
