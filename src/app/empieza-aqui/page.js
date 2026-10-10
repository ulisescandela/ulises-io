import Header from '@/components/layout/Header';
import ReadingPaths from '@/components/common/ReadingPaths';
import ReaderResources from '@/components/common/ReaderResources';

export const metadata = {
  title: 'Empieza aquí: rutas para desarrolladores',
  description: 'Aprende a programar, prepara tu portafolio y usa la IA con criterio. Tres rutas de lectura con guías en orden.',
  alternates: { canonical: 'https://ulises.io/empieza-aqui' },
};

export default function StartPage() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-16 text-white">
        <h1 className="text-4xl sm:text-5xl font-bold">Empieza aquí</h1>
        <p className="text-lg text-zinc-400 mt-5">No necesitas leer todo el blog. Elige lo que quieres conseguir y sigue una ruta a tu ritmo.</p>
        <ReadingPaths detailed />
        <ReaderResources />
      </main>
    </>
  );
}
