import test from 'node:test';
import assert from 'node:assert/strict';
import { decodeRouteParam } from '../lib/routeParams.js';

test('route labels handle spaces, accents and malformed escaping', () => {
  for (const label of ['Programación', 'AI Engineer', 'Habilidades Blandas']) {
    assert.equal(decodeRouteParam(encodeURIComponent(label)), label);
    assert.equal(decodeRouteParam(label), label);
  }
  assert.equal(decodeRouteParam('unknown%tag'), 'unknown%tag');
});
