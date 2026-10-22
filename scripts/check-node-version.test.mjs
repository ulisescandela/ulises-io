import assert from 'node:assert/strict';
import { test } from 'node:test';
import { assertSupportedNodeVersion } from './node-security-policy.mjs';

test('accepts the security release and subsequent stable Node 24 updates', () => {
  for (const version of ['24.22.1', 'v24.22.1', '24.22.2', '24.23.0', '24.100.0']) {
    assert.doesNotThrow(() => assertSupportedNodeVersion(version));
  }
});

test('rejects unpatched versions at and below the security boundary', () => {
  for (const version of ['24.22.0', '24.21.99', '24.19.0', '24.0.0']) {
    assert.throws(() => assertSupportedNodeVersion(version), /CVE-2026-111497/);
  }
});

test('rejects unsupported majors, prereleases and malformed versions', () => {
  for (const version of ['20.20.0', '22.23.4', '25.0.0', '26.12.1', '24.22.1-rc.1', '24.22', '', 'latest']) {
    assert.throws(() => assertSupportedNodeVersion(version), /Use stable Node/);
  }
});
