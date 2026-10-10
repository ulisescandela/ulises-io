import PrivacyPage from '@/components/pages/PrivacyPage';

export const metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad del sitio web ulises.io. Información sobre recopilación de datos, cookies y enlaces a terceros.',
  alternates: {
    canonical: 'https://ulises.io/privacy',
    languages: { es: 'https://ulises.io/privacy', en: 'https://ulises.io/en/privacy' },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() { return <PrivacyPage />; }
