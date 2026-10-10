This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Rutas y medición de lectores

`/empieza-aqui` organiza los artículos en tres rutas definidas en
`lib/readingPaths.js`. Solo aparecen artículos publicados. Las etiquetas se
normalizan en `lib/tags.js`; las URLs antiguas redirigen a su etiqueta canónica.

La checklist gratuita está en `public/recursos/checklist-portafolio.txt`.
El seguimiento de artículos usa el RSS existente (`/rss.xml`). La suscripción
por correo aún requiere seleccionar y configurar un proveedor.

Con `NEXT_PUBLIC_GA_ID` configurado, los enlaces registran estos eventos:
`start_here_click`, `reading_path_select`, `reading_path_article`,
`resource_download` y `rss_subscribe_click`. Son clics, no suscripciones
confirmadas. Compara los eventos por página de entrada en GA4; Search Console
muestra adquisición orgánica, no estas conversiones.

Validación: `node --test tests/*.test.js`, `npx eslint` y `npm run build`.

Para comprobar las páginas reales del blog después de compilar, arranca
`npm run start` y ejecuta `node scripts/check-blog-routes.js`. Revisa artículos,
categorías, etiquetas, enlaces internos, redirecciones antiguas y respuestas 404.
Puedes pasar una URL base como argumento para otro puerto o entorno.
