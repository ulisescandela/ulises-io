import Link from 'next/link';

export default function LanguageSwitch({ sourceSlug, englishSlug, language }) {
  return (
    <nav aria-label={language === 'en' ? 'Article language' : 'Idioma del artículo'} className="flex flex-wrap gap-4 text-sm mb-6">
      <Link href={`/blog/${sourceSlug}`} hrefLang="es" lang="es" aria-current={language === 'es' ? 'page' : undefined} className="text-blue-700 hover:text-blue-700 underline underline-offset-4">Español</Link>
      <Link href={`/en/${englishSlug}`} hrefLang="en" lang="en" aria-current={language === 'en' ? 'page' : undefined} className="text-blue-700 hover:text-blue-700 underline underline-offset-4">English</Link>
    </nav>
  );
}
