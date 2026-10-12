import { getAllPostsData, getAllCategories } from '../lib/posts.js';
import { getEnglishPosts } from '../lib/translations.js';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://ulises.io';

function generateSitemap() {
  // Páginas estáticas
  const staticPages = [
    ...["blog", "about", "contact", "privacy", "cv"].map(page => ({ url: `${baseUrl}/en/${page}`, priority: 0.6 })),
    { url: `${baseUrl}/en/start-here`, priority: 0.8 },
    { url: `${baseUrl}/en`, priority: 0.8 },
    {
      url: `${baseUrl}/empieza-aqui`,
      priority: 0.8,
    },
    {
      url: baseUrl,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cv`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacto`,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      priority: 0.4,
    },
  ];

  // Posts del blog (dinámico)
  const posts = getAllPostsData();
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: (post.frontMatter.updated || post.frontMatter.date).split('T')[0],
    priority: 0.7,
  }));

  // Páginas de categoría (indexables, páginas pilar)
  const categoryPages = getAllCategories().map((category) => ({
    url: `${baseUrl}/blog/categoria/${encodeURIComponent(category)}`,
    priority: 0.6,
  }));

  const englishPages = getEnglishPosts().map((post) => ({
    url: `${baseUrl}/en/${post.slug}`,
    lastModified: post.frontMatter.updated || post.frontMatter.translated || post.frontMatter.date,
    priority: 0.7,
  }));
  const englishCategories = [...new Set(getEnglishPosts().map(post => post.frontMatter.category))].map(category => ({ url: `${baseUrl}/en/category/${encodeURIComponent(category)}`, priority: 0.6 }));
  const allPages = [...staticPages, ...blogPosts, ...categoryPages, ...englishPages, ...englishCategories];

  // Generar XML
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    ${page.lastModified ? `<lastmod>${page.lastModified}</lastmod>` : ""}
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
