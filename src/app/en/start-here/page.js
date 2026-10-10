import ReadingPaths from '@/components/common/ReadingPaths';
import ReaderResources from '@/components/common/ReaderResources';
export const metadata = { title: 'Start here: programming learning paths', alternates: { canonical: 'https://ulises.io/en/start-here' } };
export default function StartHere() { return <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-12 text-white"><h1 className="text-4xl sm:text-5xl font-bold mb-6">Start with your next goal</h1><p className="text-lg text-zinc-400">Learn the fundamentals, prepare for a job or build with AI. Follow these articles in order and put each step into practice.</p><ReadingPaths detailed language="en" /><ReaderResources language="en" /></main>; }
