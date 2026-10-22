export function assertSupportedNodeVersion(version) {
  const match = /^(?:v)?(\d+)\.(\d+)\.(\d+)$/.exec(version);
  const major = Number(match?.[1]);
  const minor = Number(match?.[2]);
  const patch = Number(match?.[3]);
  if (!match || major !== 24 || minor < 22 || (minor === 22 && patch < 1)) {
    throw new Error(
      `Unsupported Node.js ${version}. Use stable Node.js >=24.22.1 <25; ` +
      'older runtimes lack the October 21, 2026 security fixes (including CVE-2026-111497). ' +
      'Install the version in .nvmrc and restart the process.'
    );
  }
}
