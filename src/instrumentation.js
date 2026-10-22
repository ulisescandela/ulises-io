// Check every new Node.js server instance, including managed Functions.
import { assertSupportedNodeVersion } from '../scripts/node-security-policy.mjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      assertSupportedNodeVersion(process.versions.node);
      console.log(`[node-security] Runtime Node.js ${process.versions.node}: minimum security version satisfied.`);
    } catch (error) {
      // Keep the application available while the managed runtime is checked.
      // The health endpoint reports a failing status for an unsupported runtime.
      console.error('[node-security]', error instanceof Error ? error.message : 'Unsupported runtime');
    }
  }
}
