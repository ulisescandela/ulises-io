import { notFound } from 'next/navigation';
import { getEnglishPosts } from '@lib/translations';
import { decodeRouteParam } from '@lib/routeParams';
import CollectionPage from '@/components/pages/CollectionPage';
import BlogShell from '@/components/pages/BlogShell';
export function generateStaticParams() { return [...new Set(getEnglishPosts().flatMap(post => post.frontMatter.tags))].map(tag => ({ tag })); }
export async function generateMetadata({ params }) { const { tag } = await params; const label = decodeRouteParam(tag); return { title: `Posts about ${label}`, alternates: { canonical: `https://ulises.io/en/tag/${encodeURIComponent(label)}` }, robots: { index: false, follow: true } }; }
export default async function Page({ params }) { const { tag } = await params; const label = decodeRouteParam(tag); const posts = getEnglishPosts().filter(post => post.frontMatter.tags.includes(label)); if (!posts.length) notFound(); return <BlogShell language="en"><CollectionPage kind="tag" label={label} posts={posts} language="en" /></BlogShell>; }
