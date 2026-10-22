export function assertSupportedNodeVersion(version) {
  const match = /^(?:v)?(\d+)\.(\d+)\.(\d+)$/.exec(version);
  const major = Number(match?.[1]);
  const minor = Number(match?.[2]);
  const patch = Number(match?.[3]);
  const minimum = new Map([[22, [23, 4]], [24, [22, 1]], [26, [12, 1]]]).get(major);
  if (!match || !minimum || minor < minimum[0] || (minor === minimum[0] && patch < minimum[1])) {
    throw new Error(
      `Unsupported Node.js ${version}. Use stable Node.js 22.23.4+, 24.22.1+ or 26.12.1+ within those major versions; ` +
      'older runtimes lack the October 21, 2026 security fixes (including CVE-2026-111497). ' +
      'Install the version in .nvmrc and restart the process.'
    );
  }
}
