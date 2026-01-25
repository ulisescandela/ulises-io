import { getAllPostsData } from '../lib/posts.js';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://ulises.io';

// Obtener fecha local en formato YYYY-MM-DD
function getLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function generateSitemap() {
  const today = getLocalDate();
  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: today,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: today,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cv`,
      lastModified: today,
      priority: 0.8,
    },
  ];

  // Posts del blog (dinámico)
  const posts = getAllPostsData();
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.frontMatter.date.split('T')[0],
    priority: 0.7,
  }));

  const allPages = [...staticPages, ...blogPosts];

  // Generar XML
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  // Escribir archivo en public/
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
  console.log('✅ Sitemap generado en public/sitemap.xml');
}

generateSitemap();
