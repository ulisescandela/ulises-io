import assert from 'node:assert/strict';
import { getAllPostsData, getAllTags, getAllCategories } from '../lib/posts.js';

const base = process.argv[2] || 'http://127.0.0.1:3003';
const routes = new Set([
  '/blog',
  ...getAllPostsData().map((post) => `/blog/${post.slug}`),
  ...getAllCategories().map((category) => `/blog/categoria/${encodeURIComponent(category)}`),
  ...getAllTags().map((tag) => `/blog/tag/${encodeURIComponent(tag)}`),
]);
// Include internal links embedded in articles, beyond the directory listings.
for (const post of getAllPostsData()) {
  for (const match of post.content.matchAll(/\]\((\/blog\/[^\s)#]+)(?:#[^\s)]*)?\)/g)) {
    routes.add(match[1]);
  }
}
const failures = [];
const queue = [...routes];
async function worker() {
  while (queue.length) {
    const route = queue.shift();
    try {
      const response = await fetch(new URL(route, base), { signal: AbortSignal.timeout(15000) });
      await response.arrayBuffer();
      if (response.status !== 200) failures.push(`${response.status} ${route}`);
    } catch (error) {
      failures.push(`${route}: ${error.message}`);
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
assert.deepEqual(failures, [], failures.join('\n'));
for (const route of ['/blog/no-existe', '/blog/tag/no-existe', '/blog/categoria/no-existe', '/blog/tag/unknown%25tag']) {
  const response = await fetch(new URL(route, base), { signal: AbortSignal.timeout(15000) });
  await response.arrayBuffer();
  assert.equal(response.status, 404, route);
}
for (const [from, to] of [['NextJS', 'Next.js'], ['Inteligencia Artificial', 'IA'], ['Soft Skills', 'Habilidades Blandas']]) {
  const response = await fetch(new URL(`/blog/tag/${encodeURIComponent(from)}`, base), { redirect: 'manual', signal: AbortSignal.timeout(15000) });
  await response.arrayBuffer();
  assert.equal(response.status, 308, from);
  assert.equal(response.headers.get('location'), `/blog/tag/${encodeURIComponent(to)}`, from);
}
console.log(`Verified ${routes.size} blog routes and internal article links, 4 missing routes and 3 legacy redirects.`);
