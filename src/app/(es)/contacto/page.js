import ContactPage from '@/components/pages/ContactPage';

export const metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto con Ulises Rodríguez Candela a través de email, LinkedIn o Twitter.',
  alternates: {
    canonical: 'https://ulises.io/contacto',
    languages: { es: 'https://ulises.io/contacto', en: 'https://ulises.io/en/contact' },
  },
  openGraph: {
    title: 'Contacto - Ulises.io',
    description: 'Ponte en contacto con Ulises Rodríguez Candela a través de email, LinkedIn o Twitter.',
    url: 'https://ulises.io/contacto',
    siteName: 'Ulises.io',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function Page() { return <ContactPage />; }
