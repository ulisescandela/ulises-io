import AboutPage from '@/components/pages/AboutPage';
export const metadata = { title: 'About me', alternates: { canonical: 'https://ulises.io/en/about', languages: { es: 'https://ulises.io/about', en: 'https://ulises.io/en/about' } } };
export default function Page() { return <AboutPage language="en" />; }
