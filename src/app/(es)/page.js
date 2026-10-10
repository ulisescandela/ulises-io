import HomePage from '@/components/pages/HomePage';

export const metadata = { alternates: { canonical: 'https://ulises.io', languages: { es: 'https://ulises.io', en: 'https://ulises.io/en' } } };

export default function Page() { return <HomePage language="es" />; }
