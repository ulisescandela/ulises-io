import { getAllPostsData } from '../../../lib/posts';

const SITE_URL = 'https://ulises.io';
const SITE_TITLE = 'Ulises.io — Blog';
const SITE_DESCRIPTION =
  'Artículos sobre programación, tecnología, inteligencia artificial y carrera profesional en IT.';

// Escapa caracteres especiales para XML.
function escapeXml(unsafe = '') {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Convierte "YYYY-MM-DD" a fecha RFC-822 (requerida por RSS).
function toRfc822(dateStr) {
  const d = new Date(`${String(dateStr).split('T')[0]}T00:00:00Z`);
  return d.toUTCString();
}

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPostsData();
  const lastBuildDate = posts[0]?.frontMatter?.date
    ? toRfc822(posts[0].frontMatter.date)
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const fm = post.frontMatter;
      return `    <item>
      <title>${escapeXml(fm.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(fm.excerpt || '')}</description>
      ${fm.category ? `<category>${escapeXml(fm.category)}</category>` : ''}
      <pubDate>${toRfc822(fm.date)}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>es</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
