# Validación de la propuesta editorial

Fecha: 21 de octubre de 2026. Base remota: `d1672dbc9f5891fc734fef369dddc8e0e95e0f92`.

## Alcance comprobado

- 43 artículos publicados españoles inventariados; 42 optimizados y uno histórico protegido.
- 42 reportes individuales con los campos solicitados del SEO REPORT, universo semántico, estructura final, FAQ, alternativas de title/description y enlace al artículo completo.
- 11 artículos clasificados como pillar, 29 como satellite y dos como standalone dentro de los 42 editados. Son decisiones de arquitectura editorial, no clasificaciones de Google.
- 48 archivos de contenido editados: 42 españoles y seis versiones inglesas. Cinco ingleses sincronizan los ejemplos nuevos con contexto; el sexto amplía la reflexión para mantener el contrato de extensión del catálogo.
- Sin cambios en código de la aplicación, slugs, fechas de publicación, mapas de traducción, canonical ni redirecciones.
- El borrador sigue sin publicarse.

## Comprobaciones ejecutadas

| Comprobación | Resultado |
| --- | --- |
| `node --test tests/*.test.js` | Pasan los cuatro archivos de pruebas existentes |
| `npm run build` | Compilación y generación de 391 páginas correctas; sitemap generado |
| `node scripts/check-blog-routes.js` contra la compilación local | 143 rutas y enlaces correctos; cuatro rutas inexistentes y tres redirecciones antiguas comprobadas |
| `node scripts/check-bilingual-routes.js` | 43 pares bilingües, hreflang recíproco, canonical, idioma, H1 e índices correctos |
| Inspección de HTML generado de los 42 artículos editados | Un H1 por página y canonical igual a la URL existente |
| Comprobación estática de enlaces en las propuestas españolas | 182 referencias contextuales apuntan a artículos existentes |
| Integridad del paquete | 42 reportes presentes, campos requeridos completos y entre 5 y 10 FAQ por artículo |
| `git diff --check` | Sin errores de espacios ni líneas finales añadidas |

La compilación emite una advertencia ya existente por el uso de `<img>` en `src/components/blog/postContent.js`. No se modificó ese componente ni se desactivó la regla.

## Integridad de la referencia histórica

Los hashes de blob Git locales coinciden con los del árbol remoto original:

| Archivo protegido | SHA de blob |
| --- | --- |
| `posts/evolucion-programacion-historia-2026.md` | `db5326779a544320d4e4fde76a272409d1ebdf8d` |
| `posts/en/history-of-programming-languages-and-technologies.md` | `f1cf7b56a72ea45fe8b6240eeb77d875af539a7d` |
| `posts/DRAFT-insertar-imagenes-en-blog.md` | `d4d2ce941283088be9362852270d3f7ce9443798` |

Se verifica así el archivo completo, incluidos metadatos y enlaces, no únicamente el título. Las otras 37 traducciones que no se editaron coinciden con el snapshot original.

## Límites de la validación

Estas pruebas comprueban contenido, enlaces y comportamiento técnico de la compilación local. No prueban una mejora de rankings, CTR, clics ni impresiones. No hubo datos de Search Console ni análisis de SERP.

Las descripciones de funciones de Antrapost y AntraPro se conservaron a partir de los artículos originales. No se ejecutaron operaciones en esos productos para verificar su estado actual. No se añaden funciones internas ni integraciones nuevas como hechos.

Las seis ediciones inglesas necesarias para mantener las comprobaciones del catálogo no equivalen a una optimización o sincronización editorial completa de los 43 artículos ingleses. Las correcciones generales de estadísticas de los posts españoles tienen una tarea de traducción pendiente, documentada en el análisis global.

Los archivos se preparan para revisión en una rama y un pull request en borrador. No se fusiona ni se solicita un despliegue desde esta tarea.
