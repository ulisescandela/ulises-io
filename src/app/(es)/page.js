import HomePage from '@/components/pages/HomePage';

export const metadata = { title: 'Aprende programación y construye proyectos reales', description: 'Guías prácticas de programación, proyectos de portafolio y uso de IA con criterio. Aprende fundamentos y construye software con Ulises Rodríguez Candela.', openGraph: { title: 'Aprende programación y construye proyectos reales | Ulises.io', description: 'Guías prácticas, fundamentos y proyectos para crecer como desarrollador.', url: 'https://ulises.io' }, twitter: { card: 'summary_large_image', title: 'Aprende programación y construye proyectos reales | Ulises.io', description: 'Guías prácticas, fundamentos y proyectos para crecer como desarrollador.' }, alternates: { canonical: 'https://ulises.io', languages: { es: 'https://ulises.io', en: 'https://ulises.io/en' } } };

export default function Page() { return <HomePage language="es" />; }
