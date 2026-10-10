import StartPage from '@/components/pages/StartPage';

export const metadata = { title: 'Start here: programming learning paths', alternates: { canonical: 'https://ulises.io/en/start-here', languages: { es: 'https://ulises.io/empieza-aqui', en: 'https://ulises.io/en/start-here' } } };
export default function Page() { return <StartPage language="en" />; }
