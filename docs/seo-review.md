# Ulises.io: revisión de contenido y SEO

## Hallazgos verificables

- El catálogo tiene 43 artículos publicados; los borradores se mantienen fuera del índice.
- Las listas de artículos dependían de «Ver más» para mostrar parte del catálogo.
  Las páginas /blog y /en/blog incluyen enlaces HTML a todos los artículos publicados.
- Algunos cuerpos repetían un H1 ya renderizado por la plantilla. El lector de
  Markdown elimina ese título inicial; los artículos mantienen un solo H1.
- Los tiempos de lectura se fijaban manualmente y no siempre correspondían al
  contenido. Ahora se calculan a partir del texto.
- Las URLs españolas y las fechas originales de publicación se conservan.
- Inglés usa /en/<slug>, HTML lang=en, canonical propio y hreflang recíproco.
- Se mantiene NEXT_PUBLIC_GA_ID; article_view añade content_language y article_id
  compartido por las dos versiones para comparar el mismo contenido.

## Hipótesis sobre el artículo de historia

No hay datos de Search Console adjuntos, así que no se ha demostrado la causa de
su rendimiento. El artículo tiene una intención de búsqueda concreta, cronología,
explicaciones y FAQ. Otros textos son más generales o dependen del año en el
encabezado. Eso puede influir, pero también pueden hacerlo posición, competencia,
indexación, enlaces externos o la antigüedad de cada página.

## Cómo contrastarlo con Search Console

Comparar los últimos 90 días y los 90 anteriores por página: clics, impresiones,
CTR y posición. Revisar consultas del artículo de historia y de otros tres con
impresiones; separar países y dispositivos. Inspeccionar URLs con cero impresiones
para verificar indexación y canonical elegido por Google. Para inglés usar el
filtro de página que contiene /en/, sin cambiar la propiedad existente.

Pocas impresiones: revisar demanda e indexación. Muchas impresiones con posición
baja: revisar ajuste a la intención, profundidad y competencia. Buena posición
con CTR bajo: revisar título y descripción según la consulta concreta. No cambiar
los títulos que ya funcionan sin conocer esas consultas.

## Alcance editorial

Se añaden un ejemplo evaluable al artículo de portafolio y un ejercicio al de
aprendizaje con IA. El artículo de historia conserva su título y URL; se precisan las afirmaciones sobre Ada Lovelace y C y se añaden tres fuentes históricas. Las
traducciones inglesas parten del contenido completo; el código se conserva en su
idioma original y los enlaces entre artículos apuntan a sus versiones inglesas.

Referencias: [Google: versiones localizadas](https://developers.google.com/search/docs/specialty/international/localized-versions),
[Google: contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).


## Search demand and implementation — 2026-10-12
Screenshots supplied by the owner show 361 clicks, approximately 5,530 impressions and 6.5% CTR over 28 days. The ten visible query rows total 163 clicks; this is a query subset, not an article total. The property name and query/page associations are not visible. Owner context identifies these as Ulises.io; confirm page filtering in Search Console before attributing all rows to one article. Main visible query: historia de la programación, 74 clicks / 731 impressions (10.1% CTR); structured-programming variants also appear.

Keep the winning history URL and title. Add definitions of origins/history/evolution, structured-programming history, a runnable example, concept distinctions and a primary Dijkstra source. Expand four related guides with executable examples or diagnostic/decision tables; mirror additions in English. Homepage metadata now matches learning routes; its large tag cloud is replaced by a blog link. CV gets distinct metadata from a server route. Sitemap uses content dates for edited articles and omits fabricated dates on static pages.

Validate code examples, build, internal links and rendered canonical/hreflang/H1. After deployment compare this unchanged history URL over 28-day periods by query, country and device. Do not change functioning titles based on CTR without position context. Outreach, authentic project screenshots and external backlinks remain owner/account-dependent; no outreach was sent.


Validation: production build passed. 110 sitemap URLs passed HTTP, canonical and H1 checks; Python examples executed successfully. Browser screenshot QA could not run because Chromium download failed in this environment. Visual approval, real account integration and production verification remain pending.
