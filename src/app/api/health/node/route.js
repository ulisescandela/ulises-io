import { assertSupportedNodeVersion } from '../../../../../scripts/node-security-policy.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET() {
  let patched = true;
  try {
    assertSupportedNodeVersion(process.versions.node);
  } catch {
    patched = false;
  }
  return Response.json(
    { patched, nodeMajor: Number(process.versions.node.split('.')[0]), policy: '2026-10-21' },
    { status: patched ? 200 : 503, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } },
  );
}
