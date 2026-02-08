// src/app/page.js
import Hero from '@/components/common/Hero';
import LatestPosts from '@/components/common/LatestPosts';
import Header from '@/components/layout/Header';

export default function HomePage() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only p-2 bg-white/5 text-white rounded">
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
        <LatestPosts />
      </main>
    </>
  );
}
