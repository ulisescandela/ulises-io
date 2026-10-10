import test from 'node:test';
import assert from 'node:assert/strict';
import { getAllPostsData, getPostBySlug, preparePostContent } from '../lib/posts.js';
import { getEnglishPosts, getEnglishPost, getEnglishTranslation, languageAlternates } from '../lib/translations.js';

const codeBlocks = (content) => [...content.matchAll(/^```[^\n]*\n[\s\S]*?^```\s*$/gm)].map((match) => match[0].trim());

test('every published Spanish article has one complete English counterpart', () => {
  const spanish = getAllPostsData();
  const english = getEnglishPosts();
  assert.equal(english.length, spanish.length);
  assert.equal(new Set(english.map((post) => post.sourceSlug)).size, spanish.length);
  for (const source of spanish) {
    const translated = getEnglishTranslation(source.slug);
    assert.ok(translated, source.slug);
    assert.ok(translated.content.length > source.content.length * 0.5, source.slug);
    assert.equal(translated.frontMatter.date, source.frontMatter.date);
    assert.deepEqual(codeBlocks(translated.content), codeBlocks(source.content), source.slug);
    assert.ok(!translated.content.includes('ZZXPH'), source.slug);
    const alternates = languageAlternates(source.slug, translated.slug);
    assert.equal(alternates.es, `https://ulises.io/blog/${source.slug}`);
    assert.equal(alternates.en, `https://ulises.io/en/${translated.slug}`);
    assert.deepEqual(getEnglishPost(translated.slug), translated);
  }
});

test('English references point to existing English articles', () => {
  for (const post of getEnglishPosts()) {
    assert.ok(!/\]\(\/blog\//.test(post.content), post.slug);
    for (const match of post.content.matchAll(/\]\(\/en\/([a-z0-9-]+)(?:#[^)]*)?\)/g)) {
      assert.ok(getEnglishPost(match[1]), `${post.slug}: ${match[1]}`);
    }
  }
});

test('missing translations and duplicate leading titles are handled safely', () => {
  assert.equal(getEnglishPost('../history'), null);
  assert.equal(getEnglishPost('unknown-article'), null);
  assert.equal(getPostBySlug('unknown-article'), null);
  assert.equal(preparePostContent('# Title\n\n## A section\n\nBody'), '## A section\n\nBody');
});
