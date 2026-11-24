---
title: "Construye tu primera API REST con Node.js 26: tutorial para principiantes"
category: "Programación"
date: "2026-11-23"
excerpt: "Construye y prueba una API REST con Node.js desde cero mientras aprendes HTTP, JSON, rutas y CRUD."
published: true
tags: ["Node.js", "JavaScript", "API REST", "Backend", "Tutorial"]
---

Una API REST permite que los programas intercambien recursos mediante HTTP. En este tutorial construirás una API pequeña de tareas con el módulo HTTP integrado en Node.js. Crea, enumera, consulta, actualiza y elimina tareas, y valida el JSON recibido. No necesitas framework ni dependencias de npm.

Este es el capítulo 1 de Backend Engineering from Scratch. Es independiente: puedes ejecutar todo sin otro proyecto. Los datos viven en un arreglo y desaparecen cuando termina el proceso; el [capítulo 2](/blog/api-rest-persistente-nodejs-sqlite-tutorial) los guarda en SQLite.

## Requisitos y preparación

Instala [Node.js 26](https://nodejs.org/en/download) y comprueba `node --version`. Utiliza una terminal con `curl`. Crea una carpeta `first-api`, entra en ella y crea `server.cjs`. La extensión `.cjs` selecciona CommonJS explícitamente, así que no necesitas `package.json` ni `npm install`. Ejecuta los comandos dentro de esa carpeta.

## HTTP en un minuto

Un cliente envía un método y una ruta; el servidor devuelve un estado y un cuerpo JSON. Aquí una tarea es un recurso y su `id` numérico identifica un elemento.

| Método y ruta | Significado | Éxito |
|---|---|---|
| GET /tasks | Listar tareas | 200 |
| POST /tasks | Crear a partir de `title` | 201 |
| GET /tasks/1 | Consultar una | 200 |
| PATCH /tasks/1 | Cambiar `completed` | 200 |
| DELETE /tasks/1 | Eliminar | 200 |

El JSON incorrecto o los valores inválidos producen 400, y los recursos inexistentes producen 404. El ejemplo usa 404 para métodos y rutas no reconocidos; una implementación HTTP más completa podría devolver 405 con un encabezado `Allow`.

## Construye el servidor

Guarda este archivo completo como `server.cjs`:
```javascript
const http = require('node:http');
let tasks = [];
let nextId = 1;
function send(res, status, data) {
  res.writeHead(status, {'Content-Type': 'application/json; charset=utf-8'});
  res.end(JSON.stringify(data));
}
async function readJson(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 10000) { const e = new Error('Body too large'); e.status = 413; throw e; }
    chunks.push(chunk);
  }
  let value;
  try { value = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { const e = new Error('Invalid JSON'); e.status = 400; throw e; }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    const e = new Error('Expected an object'); e.status = 400; throw e;
  }
  return value;
}
const server = http.createServer(async (req, res) => {
  try {
    const path = new URL(req.url, 'http://localhost').pathname;
    if (path === '/tasks' && req.method === 'GET') return send(res, 200, tasks);
    if (path === '/tasks' && req.method === 'POST') {
      const data = await readJson(req);
      if (typeof data.title !== 'string' || !data.title.trim() || data.title.trim().length > 200)
        return send(res, 400, {error: 'title must contain 1–200 characters'});
      const task = {id: nextId++, title: data.title.trim(), completed: false};
      tasks.push(task);
      return send(res, 201, task);
    }
    const match = /^\/tasks\/(\d+)$/.exec(path);
    if (match) {
      const id = Number(match[1]);
      if (!Number.isSafeInteger(id) || id < 1) return send(res, 400, {error: 'Invalid ID'});
      const task = tasks.find(item => item.id === id);
      if (!task) return send(res, 404, {error: 'Not found'});
      if (req.method === 'GET') return send(res, 200, task);
      if (req.method === 'PATCH') {
        const data = await readJson(req);
        if (typeof data.completed !== 'boolean') return send(res, 400, {error: 'completed must be boolean'});
        task.completed = data.completed;
        return send(res, 200, task);
      }
      if (req.method === 'DELETE') {
        tasks = tasks.filter(item => item.id !== id);
        return send(res, 200, {message: 'Deleted'});
      }
    }
    return send(res, 404, {error: 'Route not found'});
  } catch (error) {
    if (!res.headersSent && !res.destroyed)
      send(res, error.status || 500, {error: error.status ? error.message : 'Internal server error'});
    if (!error.status) console.error(error);
  }
});
server.listen(3000, '127.0.0.1', () => console.log('http://127.0.0.1:3000'));
```
## Entiende el recorrido de una petición

`http.createServer` ejecuta la función para cada petición. `new URL(...).pathname` separa la ruta de los parámetros de consulta antes de elegir una respuesta. `send` establece el estado y el tipo JSON y termina la respuesta. Si olvidas `res.end()`, el cliente puede quedarse esperando.

Para POST y PATCH, `readJson` lee fragmentos, limita el tamaño aceptado a 10,000 bytes, interpreta JSON y exige un objeto. El título debe ser una cadena no vacía de hasta 200 caracteres después de quitar espacios. `completed` debe ser booleano, no la cadena `"true"`. El ID debe ser un entero positivo seguro. `nextId` asigna identificadores; al borrar una tarea no disminuye. El arreglo y el contador se reinician al detener el proceso.

## Ejecuta y prueba

Inicia el servidor con `node server.cjs`. Escucha únicamente en `127.0.0.1:3000`, tu propia máquina. En otra terminal:

```bash
curl -i http://127.0.0.1:3000/tasks
curl -i -X POST http://127.0.0.1:3000/tasks -H 'Content-Type: application/json' -d '{"title":"Learn HTTP"}'
curl -i http://127.0.0.1:3000/tasks/1
curl -i -X PATCH http://127.0.0.1:3000/tasks/1 -H 'Content-Type: application/json' -d '{"completed":true}'
curl -i -X DELETE http://127.0.0.1:3000/tasks/1
```

La primera respuesta contiene `[]`. POST devuelve 201 y una tarea como `{"id":1,"title":"Learn HTTP","completed":false}`. PATCH devuelve la misma tarea con `completed: true`; GET después de DELETE devuelve 404. En Windows puedes usar una terminal con curl, por ejemplo PowerShell con `curl.exe`, ajustando las comillas cuando sea necesario.

Prueba un título vacío y JSON inválido: ambos deben responder 400. Crea otra tarea, detén el servidor con Ctrl+C, reinícialo y consulta la lista. El arreglo estará vacío: la memoria del proceso no es almacenamiento persistente.

## Límites y siguientes pasos

Este servidor sirve para aprender y no está listo para exponerse a internet: carece de autenticación, límite de peticiones, TLS, paginación y almacenamiento duradero. El límite del cuerpo reduce los datos aceptados, pero no reemplaza un proxy inverso ni protección completa frente a clientes lentos. Evita exponerlo públicamente. Las rutas no reconocidas producen 404 y las excepciones se registran sin revelar detalles internos al cliente. Si el puerto está ocupado, detén el otro proceso o cambia el puerto tanto en el servidor como en los comandos curl.

El siguiente capítulo mantiene la misma interfaz HTTP pero guarda las tareas en SQLite, introduce sentencias preparadas y verifica los datos tras reiniciar. Continúa con [Construye una API REST persistente con Node.js y SQLite](/blog/api-rest-persistente-nodejs-sqlite-tutorial).

## Referencias

- [Documentación HTTP de Node.js](https://nodejs.org/api/http.html)
- [Documentación URL de Node.js](https://nodejs.org/api/url.html)
- [Semántica HTTP, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110)
