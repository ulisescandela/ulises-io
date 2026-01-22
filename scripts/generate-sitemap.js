import { getAllPostsData } from '../lib/posts.js';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://ulises.io';

function generateSitemap() {
  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split('T')[0],
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cv`,
      lastModified: new Date().toISOString().split('T')[0],
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
