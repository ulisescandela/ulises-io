---
title: "Construye una API REST persistente con Node.js y SQLite: tutorial completo"
category: "Programación"
date: "2026-11-24"
excerpt: "Crea una API persistente de tareas con Node.js y SQLite, sentencias preparadas, validación y CRUD."
published: true
tags: ["Node.js", "SQLite", "JavaScript", "API REST", "Backend", "Tutorial"]
---

Una API que guarda tareas en un arreglo las pierde cuando se detiene el proceso. SQLite guarda tablas en un archivo, proporcionando almacenamiento local duradero a una aplicación pequeña sin ejecutar un servidor de base de datos independiente. En este tutorial construirás una API completa de tareas, escribirás consultas SQL, asociarás parámetros, validarás peticiones y comprobarás que las tareas sobreviven a un reinicio.

Este es el capítulo 2 de Backend Engineering from Scratch, pero todo el código está incluido aquí. El [primer capítulo](/blog/primera-api-rest-nodejs-26-principiantes) explica la misma interfaz HTTP con almacenamiento en memoria. Puedes seguir cualquiera de forma independiente.

## Requisitos y proyecto

Instala [Node.js 26](https://nodejs.org/en/download) y comprueba `node --version`. También necesitas una terminal con `curl`. El módulo integrado `node:sqlite` apareció en Node 22.5 y se clasifica como candidato a versión estable en la documentación de Node 26; revisa su estado en tu versión. Utilizamos CommonJS y módulos integrados de Node, sin paquetes que instalar.

Crea una carpeta `persistent-api` con dos archivos: `database.js` y `server.js`. No coloques un `package.json` con `"type": "module"` en esa carpeta: el código usa `require`. El archivo `tasks.db` se crea junto a `database.js`.

## Diseña la tabla

Cada fila es una tarea. `id INTEGER PRIMARY KEY AUTOINCREMENT` la identifica; los ID automáticos de filas confirmadas anteriormente no se reutilizan, pero puede haber huecos. `title` no puede ser nulo. `completed` se guarda como 0 o 1, con una restricción de base de datos; SQLite no tiene una clase de almacenamiento booleana propia. `STRICT` pide a SQLite que aplique los tipos declarados de forma más estricta.

Guarda esto como `database.js`:
```javascript
const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");

const db = new DatabaseSync(
  path.join(__dirname, "tasks.db")
);

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
      CHECK (completed IN (0, 1))
  ) STRICT
`);

module.exports = db;
```
`path.join(__dirname, "tasks.db")` fija la base al directorio del script, de modo que cambiar el directorio de trabajo no cree silenciosamente otra base. `CREATE TABLE IF NOT EXISTS` inicializa una base nueva al arrancar; no es un sistema de migraciones y no actualiza una tabla existente.

## Crea la API HTTP

El servidor relaciona las mismas operaciones con SQL:

| HTTP | Operación | Sentencia |
|---|---|---|
| POST /tasks | Crear | INSERT |
| GET /tasks y GET /tasks/1 | Leer | SELECT |
| PATCH /tasks/1 | Actualizar finalización | UPDATE |
| DELETE /tasks/1 | Eliminar | DELETE |

Guarda este archivo completo como `server.js` en la misma carpeta:
```javascript
const http = require("node:http");
const db = require("./database");

const queries = {
  list: db.prepare(
    "SELECT * FROM tasks ORDER BY id"
  ),

  get: db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ),

  create: db.prepare(
    "INSERT INTO tasks (title) VALUES (?)"
  ),

  update: db.prepare(
    "UPDATE tasks SET completed = ? WHERE id = ?"
  ),

  remove: db.prepare(
    "DELETE FROM tasks WHERE id = ?"
  )
};

function serialize(task) {
  return {
    ...task,
    completed: Boolean(task.completed)
  };
}

function send(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify(data));
}

async function readBody(req) {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;

    if (size > 10_000) {
      const error = new Error("Request too large");
      error.status = 413;
      throw error;
    }

    chunks.push(chunk);
  }

  const body = JSON.parse(
    Buffer.concat(chunks).toString("utf8")
  );

  if (!body || typeof body !== "object" ||
      Array.isArray(body)) {
    const error = new Error("Expected a JSON object");
    error.status = 400;
    throw error;
  }

  return body;
}

const server = http.createServer(async (req, res) => {
  try {
    const path = new URL(
      req.url, "http://localhost"
    ).pathname;

    // READ ALL
    if (req.method === "GET" && path === "/tasks") {
      return send(
        res, 200, queries.list.all().map(serialize)
      );
    }

    // CREATE
    if (req.method === "POST" && path === "/tasks") {
      const body = await readBody(req);

      if (typeof body.title !== "string" ||
          !body.title.trim() ||
          body.title.length > 200) {
        return send(res, 400, {
          error: "Title must contain 1–200 characters"
        });
      }

      const result = queries.create.run(
        body.title.trim()
      );

      const task = queries.get.get(
        result.lastInsertRowid
      );

      return send(res, 201, serialize(task));
    }

    const match = path.match(/^\/tasks\/(\d+)$/);

    if (match) {
      const id = Number(match[1]);

      if (!Number.isSafeInteger(id) || id < 1) {
        return send(res, 400, {
          error: "Invalid task ID"
        });
      }

      // READ ONE
      if (req.method === "GET") {
        const task = queries.get.get(id);

        return task
          ? send(res, 200, serialize(task))
          : send(res, 404, { error: "Task not found" });
      }

      // UPDATE
      if (req.method === "PATCH") {
        const body = await readBody(req);

        if (typeof body.completed !== "boolean") {
          return send(res, 400, {
            error: "completed must be a boolean"
          });
        }

        const result = queries.update.run(
          Number(body.completed), id
        );

        if (!result.changes) {
          return send(res, 404, {
            error: "Task not found"
          });
        }

        return send(
          res, 200, serialize(queries.get.get(id))
        );
      }

      // DELETE
      if (req.method === "DELETE") {
        const result = queries.remove.run(id);

        if (!result.changes) {
          return send(res, 404, {
            error: "Task not found"
          });
        }

        return send(res, 200, {
          message: "Task deleted"
        });
      }
    }

    send(res, 404, { error: "Route not found" });

  } catch (error) {
    const status = error.status ||
      (error instanceof SyntaxError ? 400 : 500);

    send(res, status, {
      error: status === 500
        ? "Internal server error"
        : error.message
    });
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("API running at http://127.0.0.1:3000");
});
```
## Por qué funciona la implementación

`db.prepare` compila una sentencia reutilizable. Cada `?` es un marcador: `queries.get.get(id)` asocia el ID como valor en lugar de concatenarlo al SQL. Los valores asociados evitan inyección SQL a través de esos parámetros; no hacen seguros los nombres de tablas o fragmentos SQL construidos dinámicamente. `run()` devuelve `changes` y `lastInsertRowid`, con los que la API encuentra el registro creado o detecta que no existía.

`serialize()` convierte el indicador entero de SQLite en un booleano JSON. `readBody()` lee fragmentos, limita el cuerpo aceptado a 10,000 bytes, interpreta JSON y exige un objeto. El controlador valida el título, el booleano y el ID entero positivo seguro antes de consultar. Una entrada inválida devuelve 400, una tarea inexistente 404 y una creación exitosa 201. El ejemplo también devuelve 404 para métodos desconocidos; una API ampliada podría usar 405 cuando corresponda.

## Ejecuta el proyecto

Inicia el servidor desde la carpeta del proyecto:

```bash
node server.js
```

En otra terminal ejecuta:

```bash
curl -i http://127.0.0.1:3000/tasks
curl -i -X POST http://127.0.0.1:3000/tasks -H 'Content-Type: application/json' -d '{"title":"Learn SQLite"}'
curl -i http://127.0.0.1:3000/tasks/1
curl -i -X PATCH http://127.0.0.1:3000/tasks/1 -H 'Content-Type: application/json' -d '{"completed":true}'
```

En una base nueva, POST devuelve un objeto como `{"id":1,"title":"Learn SQLite","completed":false}`. El siguiente GET muestra la tarea y PATCH devuelve `completed: true`. Si la base ya tiene registros, usa el ID devuelto por POST en vez de suponer que es 1. Detén el servidor con Ctrl+C, reinícialo y consulta GET `/tasks`: la fila sigue presente. Finalmente elimínala y comprueba que desapareció:

```bash
curl -i -X DELETE http://127.0.0.1:3000/tasks/1
curl -i http://127.0.0.1:3000/tasks/1
```

El segundo comando devuelve 404. Prueba un título vacío, `{"completed":"true"}` y JSON inválido: cada uno debe devolver 400. Si el puerto está ocupado, detén el otro proceso o cambia el puerto en el script y los comandos. En Windows usa una terminal con curl, por ejemplo PowerShell con `curl.exe`, y ajusta las comillas si es necesario.

## Seguridad y límites de producción

Este ejemplo escucha solo en loopback y no tiene autenticación, TLS, control de acceso, límite de peticiones, paginación, migraciones ni estrategia de respaldos. No lo expongas a usuarios no confiables. Mantén `tasks.db` fuera del control de versiones y protege sus permisos de archivo. Las bases SQLite necesitan almacenamiento duradero y respaldos; un sistema de archivos serverless efímero o de solo lectura no es una base duradera.

`DatabaseSync` ejecuta las operaciones de forma síncrona en el event loop. Las consultas lentas o la contención de bloqueos pueden retrasar otras peticiones; mide el rendimiento y considera una arquitectura asíncrona u otra base cuando cambien tus necesidades. Múltiples escritores también requieren planificación de concurrencia. El límite de 10,000 bytes ayuda, pero no protege por completo contra clientes lentos o abusivos. La demostración no valida el tipo de contenido ni devuelve 405 para todos los métodos no soportados.

Ahora reemplazaste la memoria del proceso por filas persistentes manteniendo una interfaz HTTP reconocible. El patrón validar, asociar parámetros, ejecutar y serializar se aplica a muchos sistemas backend, aunque cambie la base de datos.

## Referencias

- [API SQLite de Node.js](https://nodejs.org/api/sqlite.html)
- [API HTTP de Node.js](https://nodejs.org/api/http.html)
- [Tablas STRICT de SQLite](https://www.sqlite.org/stricttables.html)
- [AUTOINCREMENT en SQLite](https://www.sqlite.org/autoinc.html)
