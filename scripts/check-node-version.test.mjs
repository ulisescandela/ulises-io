import assert from 'node:assert/strict';
import { test } from 'node:test';
import { assertSupportedNodeVersion } from './node-security-policy.mjs';

test('accepts each patched supported major and subsequent stable updates', () => {
  for (const version of ['22.23.4', 'v22.23.4', '22.23.5', '22.24.0', '24.22.1', 'v24.22.1', '24.22.2', '24.23.0', '24.100.0', '26.12.1', '26.13.0']) {
    assert.doesNotThrow(() => assertSupportedNodeVersion(version));
  }
});

test('rejects unpatched versions at and below the security boundary', () => {
  for (const version of ['22.23.3', '22.22.99', '24.22.0', '24.21.99', '24.19.0', '24.0.0', '26.12.0', '26.11.99']) {
    assert.throws(() => assertSupportedNodeVersion(version), /CVE-2026-111497/);
  }
});

test('rejects unsupported majors, prereleases and malformed versions', () => {
  for (const version of ['20.20.0', '23.0.0', '25.0.0', '28.0.0', '24.22.1-rc.1', '22.23.4-rc.1', '24.22', '', 'latest']) {
    assert.throws(() => assertSupportedNodeVersion(version), /Use stable Node/);
  }
});
