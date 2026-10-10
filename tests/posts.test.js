import test from 'node:test';
import assert from 'node:assert/strict';
import { getPostBySlug, shouldShowPost, getAllPostsData } from '../lib/posts.js';

test('unknown and invalid article slugs do not throw or read other files', () => {
  for (const slug of ['no-existe', '../package', 'nested/article', 'nested\\article', '', undefined]) {
    const post = getPostBySlug(slug);
    assert.equal(post, null);
    assert.equal(shouldShowPost(post), false);
  }
});

test('published articles can all be loaded by their public slug', () => {
  for (const post of getAllPostsData()) {
    assert.equal(getPostBySlug(post.slug).frontMatter.title, post.frontMatter.title);
  }
});
