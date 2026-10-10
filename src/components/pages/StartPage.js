import Header from '@/components/layout/Header';
import ReadingPaths from '@/components/common/ReadingPaths';

export default function StartPage({ language = 'es' }) {
  const en = language === 'en';
  return <><Header language={language} /><main className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-16 text-white"><h1 className="text-4xl sm:text-5xl font-bold">{en ? 'Start here' : 'Empieza aquí'}</h1><p className="text-lg text-zinc-400 mt-5">{en ? 'You do not need to read the whole blog. Choose what you want to achieve and follow a path at your own pace.' : 'No necesitas leer todo el blog. Elige lo que quieres conseguir y sigue una ruta a tu ritmo.'}</p><ReadingPaths detailed language={language} /></main></>;
}
