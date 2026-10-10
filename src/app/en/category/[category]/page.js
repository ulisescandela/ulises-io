import { notFound } from 'next/navigation';
import { getEnglishPosts } from '@lib/translations';
import { decodeRouteParam } from '@lib/routeParams';
import PostsListClient from '@/components/common/PostsListClient';
export function generateStaticParams() { return [...new Set(getEnglishPosts().map(p => p.frontMatter.category))].map(category => ({ category })); }
export async function generateMetadata({ params }) { const { category } = await params; const name = decodeRouteParam(category); return { title: `${name} articles`, alternates: { canonical: `https://ulises.io/en/category/${encodeURIComponent(name)}` } }; }
export default async function Category({ params }) { const { category } = await params; const name = decodeRouteParam(category); const posts = getEnglishPosts().filter(p => p.frontMatter.category === name); if (!posts.length) notFound(); return <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-12 text-white"><h1 className="text-4xl font-bold mb-8">{name}</h1><PostsListClient initialPosts={posts} language="en" initialCount={posts.length} /></main>; }
