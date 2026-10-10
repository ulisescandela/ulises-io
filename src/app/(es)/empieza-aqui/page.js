import StartPage from '@/components/pages/StartPage';

export const metadata = {
  title: 'Empieza aquí: rutas para desarrolladores',
  description: 'Aprende a programar, prepara tu portafolio y usa la IA con criterio. Tres rutas de lectura con guías en orden.',
  alternates: { canonical: 'https://ulises.io/empieza-aqui', languages: { es: 'https://ulises.io/empieza-aqui', en: 'https://ulises.io/en/start-here' } },
};

export default function Page() { return <StartPage language="es" />; }
