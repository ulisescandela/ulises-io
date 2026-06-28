import { getAllPostsData, getAllCategories } from '../lib/posts.js';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://ulises.io';

// Obtener fecha en zona horaria de México (America/Mexico_City)
function getLocalDate() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
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
    {
      url: `${baseUrl}/about`,
      lastModified: today,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: today,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: today,
      priority: 0.4,
    },
  ];

  // Posts del blog (dinámico)
  const posts = getAllPostsData();
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.frontMatter.date.split('T')[0],
    priority: 0.7,
  }));

  // Páginas de categoría (indexables, páginas pilar)
  const categoryPages = getAllCategories().map((category) => ({
    url: `${baseUrl}/blog/categoria/${encodeURIComponent(category)}`,
    lastModified: today,
    priority: 0.6,
  }));

  const allPages = [...staticPages, ...blogPosts, ...categoryPages];

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
