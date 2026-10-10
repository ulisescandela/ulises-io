# Guías de Antrapost publicadas en Ulises.io

Revisión: 2026-10-10. Diez artículos originales y sus diez traducciones completas.
La portada y las plantillas de lectura se mantienen compartidas por idioma.

## Alcance

- Siete guías sobre herramientas públicas gratuitas: redimensionado, compresión,
  conversión, carruseles, portadas, contador de caracteres y checklist.
- Tres recorridos: reutilizar un README, organizar un lanzamiento de side project
  y revisar un envío a Facebook e Instagram con el producto.
- Cada artículo declara que Antrapost es un proyecto del autor.
- Se distinguen las herramientas sin registro del producto de publicación de pago.
- No se prometen alcance, ranking, ventas ni porcentajes de ahorro garantizados.

## Fuentes públicas comprobadas

El origen canónico es https://www.antrapost.com. Los dos idiomas de cada una de
las siete herramientas respondieron HTTP 200 y presentaron el título esperado.

| Herramienta | Ruta española | Ruta inglesa |
| --- | --- | --- |
| Redimensionador | /tools/image-resizer | /en/tools/image-resizer |
| Compresor | /tools/image-compressor | /en/tools/image-compressor |
| Convertidor | /tools/image-converter | /en/tools/image-converter |
| Carruseles | /tools/carousel-maker | /en/tools/carousel-maker |
| Portadas | /tools/cover-maker | /en/tools/cover-maker |
| Contador | /tools/caption-character-counter | /en/tools/caption-character-counter |
| Checklist | /tools/post-checklist | /en/tools/post-checklist |

Referencias del flujo de publicación:
https://www.antrapost.com/social-media-scheduler y
https://www.antrapost.com/blog/programar-instagram-facebook-mismo-tiempo.
Las versiones inglesas utilizan /en/social-media-scheduler y
/en/blog/schedule-instagram-facebook-together.

## Comprobaciones funcionales

En las herramientas públicas, sin iniciar sesión ni publicar en una red:

- El texto `Hola mundo #Python` devuelve 18 caracteres, 16 sin espacios,
  3 palabras y 1 hashtag.
- Un carrusel de dos bloques separados por `---` descarga un ZIP con dos PNG.
- La portada permite descargar un PNG con un título de ejemplo.
- El checklist descarga un resumen que distingue revisados y pendientes.

Los artículos explican que convertir no elimina fondos, que ampliar no recupera
resolución, que JPG no conserva transparencia, que la compresión puede perder
calidad y que una checklist no valida automáticamente una publicación.

## Medición

Los enlaces de referencia hacia Antrapost llevan utm_source=ulises_io,
utm_medium=referral y utm_campaign=antrapost_guides. utm_content identifica
idioma y artículo. Esto etiqueta visitas; no demuestra registros ni ventas.
No se cambia la propiedad GA4 ni los identificadores compartidos de artículos.
