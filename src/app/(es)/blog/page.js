import BlogIndex from '@/components/pages/BlogIndex';

export const metadata = {
  title: 'Blog',
  description: 'Artículos sobre programación, tecnología, desarrollo web, carrera profesional en IT y más.',
  alternates: {
    canonical: 'https://ulises.io/blog',
    languages: { es: 'https://ulises.io/blog', en: 'https://ulises.io/en/blog' },
  },
  openGraph: {
    title: 'Blog - Ulises.io',
    description: 'Artículos sobre programación, tecnología, desarrollo web, carrera profesional en IT y más.',
    url: 'https://ulises.io/blog',
    siteName: 'Ulises.io',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function Page() { return <BlogIndex language="es" />; }
