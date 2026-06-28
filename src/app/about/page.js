// src/app/about/page.js
import Header from '@/components/layout/Header';
import About from '@/components/common/about';

export const metadata = {
  title: 'Sobre mí',
  description: 'Conoce a Ulises Rodríguez Candela, desarrollador de software apasionado por crear soluciones innovadoras y compartir conocimientos.',
  alternates: {
    canonical: 'https://ulises.io/about',
  },
  openGraph: {
    title: 'Sobre mí - Ulises.io',
    description: 'Conoce a Ulises Rodríguez Candela, desarrollador de software apasionado por crear soluciones innovadoras y compartir conocimientos.',
    url: 'https://ulises.io/about',
    siteName: 'Ulises.io',
    locale: 'es_ES',
    type: 'profile',
  },
};

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