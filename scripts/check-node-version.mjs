import { assertSupportedNodeVersion } from './node-security-policy.mjs';

try {
  assertSupportedNodeVersion(process.versions.node);
  console.log(`[node-security] Node.js ${process.versions.node}: minimum security version satisfied.`);
} catch (error) {
  console.error(`[node-security] ${error.message}`);
  process.exitCode = 1;
}
