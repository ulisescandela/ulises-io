import AboutPage from '@/components/pages/AboutPage';

export const metadata = {
  title: 'Sobre mí',
  description: 'Conoce a Ulises Rodríguez Candela, desarrollador de software apasionado por crear soluciones innovadoras y compartir conocimientos.',
  alternates: {
    canonical: 'https://ulises.io/about',
    languages: { es: 'https://ulises.io/about', en: 'https://ulises.io/en/about' },
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

export default function Page() { return <AboutPage />; }
