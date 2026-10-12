import BlogIndex from '@/components/pages/BlogIndex';
import BlogShell from '@/components/pages/BlogShell';
export const metadata = { title: 'Programming guides and projects', description: 'Articles about programming, technology, web development and IT careers.', alternates: { canonical: 'https://ulises.io/en/blog', languages: { es: 'https://ulises.io/blog', en: 'https://ulises.io/en/blog' } } };
export default function Page() { return <BlogShell language="en"><BlogIndex language="en" /></BlogShell>; }
