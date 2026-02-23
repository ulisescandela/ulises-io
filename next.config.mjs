const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://adservice.google.com https://www.google-analytics.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.doubleclick.net;
    font-src 'self';
    connect-src 'self' https://www.google-analytics.com https://*.google.com https://*.doubleclick.net https://pagead2.googlesyndication.com;
    frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://*.google.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self';
    upgrade-insecure-requests;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
