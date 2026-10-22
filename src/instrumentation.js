// Check every new Node.js server instance, including managed Functions.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { assertSupportedNodeVersion } = await import('../scripts/node-security-policy.mjs');
    assertSupportedNodeVersion(process.versions.node);
    console.log(`[node-security] Runtime Node.js ${process.versions.node}: minimum security version satisfied.`);
  }
}
