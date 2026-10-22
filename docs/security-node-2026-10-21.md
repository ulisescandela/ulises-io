# Actualización de seguridad de Node.js — 21 de octubre de 2026

Este repositorio requiere **Node.js estable >=24.22.1 <25**. `.nvmrc` y `.node-version` fijan 24.22.1 para desarrollo reproducible. Se permiten los parches posteriores de la rama 24 para recibir nuevas correcciones.

El [aviso oficial de Node.js](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) incluye CVE-2026-111497, un fallo del decodificador Brotli que puede permitir ejecución de código, además de fallos de DNS, TLS y otros componentes. Las versiones corregidas son 22.23.4, 24.22.1 y 26.12.1. Este proyecto elige la rama 24 LTS; no se intenta parchear el runtime mediante `npm audit fix`, una dependencia `node` o cambios del contenido editorial.

## Desarrollo y servidores propios

```sh
nvm install
nvm use
node scripts/check-node-version.mjs
node --test scripts/check-node-version.test.mjs
```

Instalar las dependencias con el lockfile del proyecto y ejecutar sus pruebas y compilación. Los hooks `predev`, `prebuild` y `prestart` comprueban la versión antes de ejecutar los comandos habituales. En proyectos con `vercel-build` también se comprueba ese comando. Una invocación directa a `next` o un comando que omita scripts no ejecuta esos hooks. Por eso `instrumentation.register` también comprueba la versión en cada nueva instancia del servidor Node de Next.js, incluidas Functions, y detiene su inicio si no cumple. No aplica a Edge, que no ejecuta Node. Un proceso ya encendido requiere reinicio para ejecutar el código nuevo.

En un VPS, contenedor, worker, cron o backend externo: actualizar el binario/base de Node, reconstruir y reiniciar **todos** los procesos. Cambiar este archivo o `engines.node` no reemplaza el binario de un servidor. Los servicios PostgreSQL y pgAdmin de Docker Compose no son runtimes Node y no se modifican por este aviso.

## Vercel

`engines.node` selecciona Node 24 para nuevos despliegues. [Vercel administra las versiones menores y de parche](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions); el repositorio no puede fijar por sí solo el parche exacto de las Functions administradas. El check imprime la versión efectiva de **build** y falla si está por debajo del mínimo. Un build correcto demuestra la versión del build; no demuestra por sí solo la versión de cada Function en producción. La comprobación en `instrumentation.register` verifica adicionalmente el proceso que atiende las solicitudes y registra su versión al iniciar.

Según el [aviso de Vercel](https://vercel.com/ja/kb/bulletin/node-js-security-advisory), su WAF mitiga el vector de entrada conocido, pero no sustituye el parche ni cubre respuestas comprimidas que la aplicación obtiene de terceros. Vercel está distribuyendo los runtimes corregidos; Node 20 está fuera de soporte y debe reemplazarse. Confirmar el estado del proveedor y la versión efectiva del runtime en sus registros después del despliegue. Si la plataforma aún ofrece un runtime anterior, mantener el despliegue bloqueado y solicitar la actualización al proveedor; no eliminar el check para forzarlo.

No se ejecutan exploits, no se escriben datos de negocio y no se aplican migraciones para comprobar este cambio. Las comprobaciones locales usan configuración ficticia cuando la compilación requiere variables; los secretos de producción permanecen en el proveedor.

## Validación local — 22 de octubre de 2026

Compilación completa con Next 15.5.14 (391 rutas de compilación); lint del build pasa con una advertencia previa de img.

Las pruebas de la política pasan en este repositorio. La función register acepta Node 24.22.1, rechaza el runtime local anterior 24.19.0 y no ejecuta el control en Edge. Se usa el binario oficial de Node 24.22.1 para Linux, con SHA-256 comparado con SHASUMS256.txt de nodejs.org. No se ejecutan migraciones ni operaciones de negocio. El estado de producción debe verificarse después del despliegue; estos resultados locales no lo sustituyen.
