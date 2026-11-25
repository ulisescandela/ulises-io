---
title: "Cómo probar una API REST con Node.js y SQLite sin librerías externas"
category: "Programación"
date: "2026-11-25"
excerpt: "Aprende a probar una API REST con node:test, fetch y bases SQLite aisladas mediante seis pruebas de integración."
published: true
tags: ["Node.js", "SQLite", "Testing", "Backend", "Tutorial"]
---

Una petición manual con curl resulta útil mientras desarrollas una API, pero no puede avisarte automáticamente si el cambio de mañana rompe el comportamiento de ayer. Una prueba repetible convierte una expectativa en código ejecutable. En este tercer capítulo de Backend Engineering from Scratch construiremos una pequeña API HTTP y la probaremos mediante peticiones reales, utilizando únicamente Node.js y SQLite.

El [capítulo anterior](/blog/api-rest-persistente-nodejs-sqlite-tutorial) introdujo un CRUD persistente. Aquí reducimos deliberadamente la API a crear y listar tareas para concentrarnos en la arquitectura de pruebas. Es un proyecto independiente, no un reemplazo del CRUD anterior. Una vez entendido el patrón, podrás aplicarlo a PATCH y DELETE.

## ¿Qué estamos probando realmente?

Una prueba unitaria comprueba una pieza pequeña de lógica, como una función que valida un título. Una prueba de integración comprueba que varios componentes colaboren: un controlador HTTP, el análisis de JSON y una consulta a la base de datos, por ejemplo. Una prueba de extremo a extremo suele abarcar un sistema desplegado más amplio, posiblemente con navegador, autenticación e infraestructura.

Nuestras pruebas son de integración. Envían peticiones HTTP a un servidor local real y utilizan una base de datos SQLite real, sin depender de un servicio externo. Esto importa porque una función puede validar correctamente un título mientras el controlador HTTP devuelve un estado incorrecto o no guarda el registro.

| Capa | Ejemplo de comprobación |
|---|---|
| HTTP | POST devuelve 201 |
| Serialización | La respuesta contiene un objeto JSON |
| Regla de negocio | Se rechazan títulos vacíos |
| Base de datos | Una petición rechazada no crea registros |

## Preparar el proyecto

Utiliza Node.js 22.13 o posterior con el módulo SQLite incorporado, preferiblemente una versión LTS con soporte. SQLite era experimental en Node 22 y su clasificación de estabilidad varía según la versión. Comprueba node --version. No necesitas paquetes npm. Crea una carpeta nueva con app.js y app.test.js. Utiliza CommonJS; no configures type como module en package.json.

## Diseñar una aplicación fácil de probar

Un error común al comenzar es iniciar un servidor en cuanto se importa su módulo. Importarlo desde una prueba puede ocupar el puerto 3000 y dejar el proceso ejecutándose. En lugar de eso, crea una función fábrica que devuelva el servidor y la base de datos. Quien llama a la función decide cuándo escuchar peticiones y cuándo cerrar los recursos.

Guarda app.js:

```javascript
const http = require("node:http");
const { DatabaseSync } = require("node:sqlite");

function createApp(filename = ":memory:") {
  const db = new DatabaseSync(filename);
  db.exec("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT NOT NULL)");
  const list = db.prepare("SELECT * FROM tasks ORDER BY id");
  const insert = db.prepare("INSERT INTO tasks (title) VALUES (?)");
  const get = db.prepare("SELECT * FROM tasks WHERE id = ?");
  function send(res, status, data) {
    res.writeHead(status, {"Content-Type": "application/json"});
    res.end(JSON.stringify(data));
  }
  const server = http.createServer(async (req, res) => {
    try {
      if (req.url === "/tasks" && req.method === "GET")
        return send(res, 200, list.all());
      if (req.url === "/tasks" && req.method === "POST") {
        let size = 0;
        const chunks = [];
        for await (const chunk of req) {
          size += chunk.length;
          if (size <= 10000) chunks.push(chunk);
        }
        if (size > 10000) return send(res, 413, {error: "Too large"});
        const body = JSON.parse(Buffer.concat(chunks).toString());
        if (!body || typeof body.title !== "string" ||
            !body.title.trim() || body.title.length > 200)
          return send(res, 400, {error: "Invalid title"});
        const result = insert.run(body.title.trim());
        return send(res, 201, get.get(result.lastInsertRowid));
      }
      return send(res, 404, {error: "Not found"});
    } catch (error) {
      if (res.destroyed) return;
      return send(res, error instanceof SyntaxError ? 400 : 500,
        {error: "Request failed"});
    }
  });
  return {server, db};
}

if (require.main === module) {
  const {server} = createApp("tasks-test-demo.db");
  server.listen(3000, "127.0.0.1");
}
module.exports = {createApp};
```

La base de datos predeterminada es :memory:, lo que significa que cada conexión tiene una base temporal que desaparece al cerrarla. Pasar un nombre de archivo permite persistencia para experimentos manuales. La comprobación require.main inicia el servidor solamente cuando ejecutas node app.js directamente, no cuando una prueba lo importa.

Observa que los parámetros SQL se vinculan en lugar de concatenarse. La API valida el título antes de insertar. También limita el tamaño aceptado del cuerpo; esta implementación educativa consume cuerpos demasiado grandes sin almacenarlos, pero un servicio de producción debe imponer límites de tamaño y tiempo en la puerta de enlace. La API escucha en loopback para uso local y no tiene autenticación.

## Escribir pruebas de integración

Guarda app.test.js:

```javascript
const test = require("node:test");
const assert = require("node:assert/strict");
const { once } = require("node:events");
const { createApp } = require("./app");

async function fixture(t) {
  const {server, db} = createApp();
  t.after(async () => {
    try {
      if (server.listening)
        await new Promise((resolve, reject) =>
          server.close(err => err ? reject(err) : resolve()));
    } finally {
      db.close();
    }
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const base = "http://127.0.0.1:" + server.address().port;
  return (path, options) => fetch(base + path, options);
}

function post(title) {
  return {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({title})
  };
}

test("empty database", async t => {
  const request = await fixture(t);
  const res = await request("/tasks");
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), []);
});

test("create and read", async t => {
  const request = await fixture(t);
  const created = await request("/tasks", post(" Learn SQL "));
  assert.equal(created.status, 201);
  const task = await created.json();
  assert.equal(task.title, "Learn SQL");
  assert.ok(Number.isInteger(task.id));
  const list = await request("/tasks");
  assert.deepEqual(await list.json(), [task]);
});

test("reject invalid title without writing", async t => {
  const request = await fixture(t);
  const res = await request("/tasks", post(" "));
  assert.equal(res.status, 400);
  await res.json();
  assert.deepEqual(await (await request("/tasks")).json(), []);
});

test("malformed JSON", async t => {
  const request = await fixture(t);
  const res = await request("/tasks", {method: "POST", body: "{"});
  assert.equal(res.status, 400);
  await res.json();
});

test("unknown route", async t => {
  const request = await fixture(t);
  const res = await request("/missing");
  assert.equal(res.status, 404);
  await res.json();
});

test("SQL-looking text remains data", async t => {
  const request = await fixture(t);
  const title = "x'); DROP TABLE tasks; --";
  const res = await request("/tasks", post(title));
  assert.equal(res.status, 201);
  assert.equal((await res.json()).title, title);
  assert.equal((await (await request("/tasks")).json()).length, 1);
});
```

La función fixture crea una base de datos y un servidor nuevos para cada prueba. El puerto cero solicita al sistema operativo un puerto disponible, evitando conflictos con otros procesos. El evento listening indica cuándo podemos enviar peticiones. La función de limpieza cierra el servidor HTTP antes de cerrar la base de datos. Cada prueba espera sus peticiones y consume el cuerpo de la respuesta para liberar las conexiones.

La función request utiliza fetch, incorporado en las versiones modernas de Node.js. La función post construye peticiones JSON. Ninguna de ellas simula la capa HTTP ni la base de datos.

## Comprender arrange, act, assert

Cada prueba tiene tres pasos conceptuales. Arrange prepara un estado inicial conocido. Act realiza la operación que queremos comprobar. Assert compara el resultado observado con el esperado. En la prueba de creación y lectura, fixture prepara una base vacía, POST actúa sobre ella y las comprobaciones verifican tanto la respuesta como un GET posterior.

La igualdad estricta es adecuada para un código de estado o una cadena. La igualdad profunda compara arreglos y objetos por su contenido. Comprobar únicamente el código de estado es insuficiente: un servidor podría devolver 201 sin insertar nada. El GET posterior verifica un efecto observable.

La prueba de título inválido es especialmente importante. Comprueba no solamente que la API devuelve 400, sino también que la base permanece vacía. Esta distinción resulta útil en sistemas de pagos, reservas y cualquier operación donde una petición rechazada no debe modificar el estado.

## Ejecutar e interpretar las pruebas

Desde la carpeta del proyecto ejecuta:

```bash
node --test app.test.js
```

Espera seis pruebas exitosas y cero fallos. El formato exacto del reporte y los tiempos dependen de la versión de Node. El proceso termina con un código distinto de cero si alguna prueba falla, lo que permite utilizar el comando en integración continua.

Para observar un fallo deliberadamente, cambia temporalmente el estado esperado de 201 a 200 en la prueba de creación y lectura. Ejecuta nuevamente el comando. La comprobación mostrará la diferencia entre el valor real y el esperado. Restaura 201 después. Este ejercicio demuestra que la prueba puede detectar una regresión en lugar de limitarse a ejecutar código.

También puedes ejecutar node --test --watch app.test.js mientras editas. Para una comprobación manual, ejecuta node app.js en otra terminal y utiliza curl http://127.0.0.1:3000/tasks. La base manual es independiente de todas las bases de prueba.

## Por qué importa el aislamiento

Supongamos que la primera prueba crea una tarea y la segunda espera una lista vacía. Si ambas comparten una base de datos, la segunda depende del orden de ejecución. Estos fallos son difíciles de diagnosticar porque una prueba puede pasar cuando se ejecuta sola. Nuestra función fixture crea una conexión nueva cada vez, de modo que cada prueba comienza en un estado predecible.

Una base en memoria no sustituye completamente las pruebas de persistencia. Para verificar que los registros sobreviven a un reinicio, crea una carpeta temporal con node:fs, abre un archivo de base de datos allí, inserta un registro, cierra la conexión, vuelve a abrir el mismo archivo y comprueba el registro. Elimina la carpeta en un bloque finally. No utilices tu base de producción para pruebas automatizadas.

## ¿Qué deberías probar después?

Amplía la suite con títulos de longitud máxima, JSON nulo, cuerpos demasiado grandes, identificadores inexistentes, actualizaciones y eliminaciones cuando implementes esas rutas. Para cada modificación, prueba tanto el camino exitoso como el rechazado. La prueba con texto parecido a SQL demuestra que una entrada concreta se guarda literalmente; no demuestra que todas las consultas de una aplicación mayor sean seguras.

Evita comprobar detalles internos innecesariamente. Una prueba del contrato HTTP público debería sobrevivir a una migración de SQLite a PostgreSQL si el comportamiento externo permanece igual. En cambio, una migración de base de datos merece sus propias pruebas porque puede fallar independientemente de HTTP.

En proyectos mayores, ejecuta la suite en CI antes de integrar cambios. Agrega pruebas de persistencia, autenticación, autorización, concurrencia e integración con bases realistas. Mide cobertura con las herramientas compatibles con tu versión de Node, pero recuerda que ejecutar una línea no equivale a comprobar su comportamiento.

## Solución de problemas

Si no puedes importar node:sqlite, comprueba la versión e instalación de Node. Si el proceso de pruebas no termina, inspecciona servidores, conexiones y temporizadores abiertos. Si una petición falla antes de una comprobación, verifica que el servidor haya emitido listening y que la URL utilice el puerto asignado. Si las pruebas pasan individualmente pero fallan juntas, investiga el estado compartido en lugar de agregar retrasos arbitrarios.

## Conclusión

Las pruebas automatizadas son descripciones ejecutables del comportamiento. Separar la creación del servidor de su inicio y utilizar bases aisladas permite comprobar respuestas HTTP y operaciones de datos sin librerías externas de pruebas. Este patrón sigue siendo útil cuando la aplicación crece más allá de una sencilla API de tareas.

## Referencias

- [Ejecutor de pruebas de Node.js](https://nodejs.org/api/test.html)
- [Comprobaciones estrictas de Node.js](https://nodejs.org/api/assert.html)
- [SQLite en Node.js](https://nodejs.org/api/sqlite.html)
- [HTTP en Node.js](https://nodejs.org/api/http.html)
- [Bases de datos SQLite en memoria](https://www.sqlite.org/inmemorydb.html)
