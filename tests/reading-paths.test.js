import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTag, normalizeTags } from '../lib/tags.js';
import { getReadingPaths } from '../lib/readingPaths.js';

test('legacy tags resolve to one canonical label without double counting', () => {
  assert.deepEqual(normalizeTags(['IA', 'Inteligencia Artificial', 'NextJS', 'Next.js', 'Soft Skills', 'Habilidades Blandas']), ['IA', 'Next.js', 'Habilidades Blandas']);
  assert.equal(normalizeTag('  NextJS '), 'Next.js');
  assert.deepEqual(normalizeTags('Inteligencia Artificial'), ['IA']);
  assert.deepEqual(normalizeTags(), []);
});

test('reading paths preserve editorial order and omit unavailable articles', () => {
  const posts = [
    { slug: 'como-salir-del-tutorial-hell' },
    { slug: 'mejores-tecnologias-para-empezar-a-programar-2026' },
  ];
  const routes = getReadingPaths(posts);
  assert.equal(routes.length, 1);
  assert.deepEqual(routes[0].posts.map((post) => post.slug), [posts[1].slug, posts[0].slug]);
  assert.deepEqual(getReadingPaths([]), []);
});
