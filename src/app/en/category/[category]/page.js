import { notFound } from 'next/navigation';
import { getEnglishPosts } from '@lib/translations';
import { decodeRouteParam } from '@lib/routeParams';
import CollectionPage from '@/components/pages/CollectionPage';
import BlogShell from '@/components/pages/BlogShell';
export function generateStaticParams() { return [...new Set(getEnglishPosts().map(post => post.frontMatter.category))].map(category => ({ category })); }
export async function generateMetadata({ params }) { const { category } = await params; const label = decodeRouteParam(category); return { title: `${label} articles`, alternates: { canonical: `https://ulises.io/en/category/${encodeURIComponent(label)}` }, robots: { index: true, follow: true } }; }
export default async function Page({ params }) { const { category } = await params; const label = decodeRouteParam(category); const posts = getEnglishPosts().filter(post => post.frontMatter.category === label); if (!posts.length) notFound(); return <BlogShell language="en"><CollectionPage kind="category" label={label} posts={posts} language="en" /></BlogShell>; }
