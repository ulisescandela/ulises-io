---
title: "Build a Persistent REST API with Node.js and SQLite: A Complete Tutorial"
sourceSlug: api-rest-persistente-nodejs-sqlite-tutorial
category: "Programación"
date: "2026-11-24"
excerpt: "Build a persistent task API with Node.js and SQLite, prepared SQL statements, validation, and CRUD."
published: true
tags: ["Node.js", "SQLite", "JavaScript", "API REST", "Backend", "Tutorial"]
---

An API that stores tasks in an array loses them when its process stops. SQLite stores tables in a file, giving a small application durable local storage without running a separate database server. In this tutorial you will build a complete task API, write SQL queries, bind parameters, validate requests, and verify that tasks survive a restart.

This is chapter 2 of Backend Engineering from Scratch, but all the code is included here. The [first API chapter](/en/build-rest-api-nodejs-26-beginners-tutorial) explains the same HTTP interface with in-memory storage. You can follow either chapter independently.

## Requirements and project

Install [Node.js 26](https://nodejs.org/en/download) and check `node --version`. You also need a terminal with `curl`. The built-in `node:sqlite` module was introduced in Node 22.5 and is classified as a release candidate in the Node 26 documentation; check its status for your actual version. We use CommonJS and Node's built-in modules, with no packages to install.

Create a folder called `persistent-api` containing two files, `database.js` and `server.js`. Do not put a `package.json` with `"type": "module"` in this folder: the code uses `require`. The database file `tasks.db` is created alongside `database.js`.

## Design the table

A row is one task. `id INTEGER PRIMARY KEY AUTOINCREMENT` identifies it; automatic IDs are not reused from previously committed rows, but gaps are normal. `title` cannot be null. `completed` is stored as 0 or 1, with a database check; SQLite has no dedicated Boolean storage class. `STRICT` asks SQLite to enforce the declared column types more strictly.

Save this as `database.js`:
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
`path.join(__dirname, "tasks.db")` anchors the database to the script directory, so changing the working directory does not silently create another database. `CREATE TABLE IF NOT EXISTS` initializes a new database on startup; it is not a schema migration system and does not update an existing table.

## Create the HTTP API

The server maps the same operations to SQL:

| HTTP | Operation | Statement |
|---|---|---|
| POST /tasks | Create | INSERT |
| GET /tasks and GET /tasks/1 | Read | SELECT |
| PATCH /tasks/1 | Update completion | UPDATE |
| DELETE /tasks/1 | Delete | DELETE |

Save this complete file as `server.js` in the same folder:
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
## Why the implementation works

`db.prepare` compiles a statement for reuse. A `?` is a placeholder: `queries.get.get(id)` binds the ID as a value instead of concatenating it into SQL. Bound values prevent SQL injection through those parameters; they do not make dynamically constructed table names or SQL fragments safe. `run()` returns `changes` and `lastInsertRowid`, letting the API find the created record or detect a missing one.

`serialize()` converts SQLite's integer flag into a JSON boolean. `readBody()` reads request chunks, enforces a 10,000-byte accepted body limit, parses JSON and requires an object. The handler validates the title, boolean, and positive safe integer ID before querying. Invalid input returns 400, a missing task returns 404, and a successful creation returns 201. The example returns 404 for unknown methods as well as paths; an expanded API could use 405 where appropriate.

## Run the project

Start the server from the project folder:

```bash
node server.js
```

In another terminal, run:

```bash
curl -i http://127.0.0.1:3000/tasks
curl -i -X POST http://127.0.0.1:3000/tasks -H 'Content-Type: application/json' -d '{"title":"Learn SQLite"}'
curl -i http://127.0.0.1:3000/tasks/1
curl -i -X PATCH http://127.0.0.1:3000/tasks/1 -H 'Content-Type: application/json' -d '{"completed":true}'
```

On a fresh database, POST returns an object like `{"id":1,"title":"Learn SQLite","completed":false}`. The next GET shows the task; PATCH returns `completed: true`. If the database already contains records, use the ID returned by POST instead of assuming 1. Stop the server with Ctrl+C, restart it, and GET `/tasks`: the row is still present. Finally delete it and check that it is gone:

```bash
curl -i -X DELETE http://127.0.0.1:3000/tasks/1
curl -i http://127.0.0.1:3000/tasks/1
```

The second command returns 404. Try an empty title, `{"completed":"true"}`, and malformed JSON: each should return 400. For an unavailable port, stop the other process or change the port in the script and commands. On Windows, use a shell with curl, such as PowerShell with `curl.exe`, and adjust shell quoting as needed.

## Security and production limits

This example listens only on loopback and has no authentication, TLS, access control, rate limiting, pagination, migration tooling, or backup strategy. Do not expose it to untrusted users. Keep `tasks.db` out of source control and protect its filesystem permissions. SQLite files need durable storage and backups; an ephemeral or read-only serverless filesystem is not a durable database.

`DatabaseSync` runs database calls synchronously on the event loop. Slow queries or lock contention can block other requests; measure performance and consider an asynchronous architecture or a separate database as needs grow. Multiple writers also require concurrency planning. A 10,000-byte body limit is useful but is not complete protection against slow or abusive clients. The demo does not validate content type or return 405 for every unsupported method.

You have now replaced process memory with persistent rows while keeping the HTTP interface recognizable. The same pattern—validate, bind parameters, execute, and serialize—applies to many backend systems, even when the database changes.

## References

- [Node.js SQLite API](https://nodejs.org/api/sqlite.html)
- [Node.js HTTP API](https://nodejs.org/api/http.html)
- [SQLite STRICT tables](https://www.sqlite.org/stricttables.html)
- [SQLite AUTOINCREMENT](https://www.sqlite.org/autoinc.html)
