import Hero from '@/components/common/Hero';
import ReadingPaths from '@/components/common/ReadingPaths';
import LatestPosts from '@/components/common/LatestPosts';
import ReaderResources from '@/components/common/ReaderResources';
export const metadata = { title: 'Learn programming and build real projects', alternates: { canonical: 'https://ulises.io/en', languages: { en: 'https://ulises.io/en', es: 'https://ulises.io' } } };
export default function EnglishHome() { return <><a href="#main-content" className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:z-[100] focus-visible:bg-blue-600 focus-visible:p-3 focus-visible:text-white">Skip to content</a><main id="main-content" className="pt-16 w-full text-center text-white font-sans"><Hero language="en" /><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left"><ReadingPaths language="en" /><LatestPosts language="en" /><ReaderResources language="en" /></div></main></>; }
