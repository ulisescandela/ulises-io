// src/app/about/page.js
import Header from '@/components/layout/Header';
import About from '@/components/common/about';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-16 w-screen text-center text-white font-sans">
        <About />
      </main>
    </>
  );
}