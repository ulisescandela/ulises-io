import { ImageResponse } from 'next/og';
import { getPostBySlug, generateStaticParams as postParams } from '../../../../lib/posts';

export const alt = 'Ulises.io — Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Prerenderiza una imagen OG estática por cada post publicado.
export const generateStaticParams = postParams;

// Imagen Open Graph generada dinámicamente por post (para compartir en redes).
export default async function Image({ params }) {
  const { slug } = await params;
  let title = 'Ulises.io';
  let category = '';
  try {
    const post = getPostBySlug(slug);
    title = post.frontMatter.title || title;
    category = post.frontMatter.category || '';
  } catch {
    // Si el post no existe, se usa el fallback genérico.
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #020617 0%, #0f172a 60%, #1e293b 100%)',
          padding: '80px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {category ? (
            <div
              style={{
                fontSize: 30,
                color: '#93c5fd',
                background: 'rgba(37, 99, 235, 0.25)',
                padding: '8px 24px',
                borderRadius: 9999,
                fontWeight: 600,
              }}
            >
              {category}
            </div>
          ) : (
            <div style={{ fontSize: 30, color: '#93c5fd', fontWeight: 600 }}>Blog</div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: title.length > 60 ? 60 : 72,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', fontSize: 34, color: '#cbd5e1' }}>
          <span style={{ fontWeight: 700, color: 'white' }}>ulises.io</span>
          <span style={{ margin: '0 16px', color: '#475569' }}>•</span>
          <span>Ulises Rodríguez Candela</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
