import Header from '@/components/layout/Header';
import About from '@/components/common/about';
export default function AboutPage({ language = 'es' }) { return <><Header language={language} /><main className="pt-16 w-full text-center text-slate-900 font-sans"><About language={language} /></main></>; }
