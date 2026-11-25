---
title: "How to Test a REST API with Node.js and SQLite Without External Libraries"
sourceSlug: pruebas-api-rest-nodejs-sqlite
category: "Programación"
date: "2026-11-25"
excerpt: "Learn to test a REST API using node:test, fetch and isolated SQLite databases with six integration tests."
published: true
tags: ["Node.js", "SQLite", "Testing", "Backend", "Tutorial"]
---

A manual curl request is useful while developing an API, but it cannot tell you automatically whether tomorrow's change breaks yesterday's behavior. A repeatable test turns an expectation into executable code. In this third chapter of Backend Engineering from Scratch, we build a small HTTP API and test it through real requests, using only Node.js and SQLite.

The [previous chapter](/en/nodejs-sqlite-rest-api-complete-tutorial) introduced persistent CRUD. Here we deliberately reduce the API to creating and listing tasks so we can focus on the testing architecture. This is a standalone project, not a replacement for the previous CRUD server. Once the pattern is clear, apply it to PATCH and DELETE as well.

## What are we actually testing?

A unit test exercises a small piece of logic, such as a function that validates a title. An integration test checks that components cooperate: an HTTP handler, JSON parsing and a database query, for example. An end-to-end test typically exercises a larger deployed system, potentially including a browser, authentication and infrastructure.

Our tests are integration tests. They send HTTP requests to a real local server and use a real SQLite database, without relying on an external service. This matters because a function can validate a title correctly while the HTTP handler still returns the wrong status or fails to save it.

| Layer | Example assertion |
|---|---|
| HTTP | POST returns 201 |
| Serialization | Response contains a JSON object |
| Business rule | Blank titles are rejected |
| Database | A rejected request does not create a row |

## Set up the project

Use Node.js 22.13 or newer with the built-in SQLite module, preferably a supported LTS release. SQLite was experimental in Node 22 and its stability classification varies by version. Check node --version. No npm packages are needed. Create a fresh directory containing app.js and app.test.js. Use CommonJS; do not set type to module in package.json.

## Make the application testable

A common beginner mistake is starting a server as soon as its module is imported. Importing such a module in a test can occupy port 3000 and leave the process running. Instead, create a factory function that returns the server and database. The caller decides when to listen and when to close resources.

Save app.js:

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

The default database is :memory:, which means each connection owns a temporary database that disappears when closed. Passing a filename enables persistence for manual experiments. The require.main check starts the server only when you run node app.js directly, not when a test imports it.

Notice that SQL parameters are bound rather than concatenated. The API validates the title before insertion. It also caps the accepted body size; this educational implementation drains oversized bodies without storing them, but a production service should enforce request timeouts and size limits at the gateway as well. The API is bound to loopback for local use and has no authentication.

## Write integration tests

Save app.test.js:

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

The fixture creates a new database and server for each test. Port zero asks the operating system to allocate an available port, avoiding collisions with other processes. The listening event tells us when requests can be sent. The cleanup callback closes the HTTP server before closing the database. Each test awaits its requests and consumes the response body so connections can be released.

The request helper uses fetch, which is built into modern Node.js. The post helper creates JSON requests. Neither helper mocks the HTTP or database layer.

## Understand arrange, act, assert

Every test has three conceptual steps. Arrange creates a known starting state. Act performs the operation under test. Assert compares the observed result with the expected result. In the create-and-read test, the fixture arranges an empty database, POST acts on it, and the assertions verify both the response and a subsequent GET.

Strict equality is appropriate for a status code or string. Deep equality compares arrays and objects by their contents. Checking only the status code is insufficient: a server might return 201 without inserting anything. Checking the subsequent GET verifies an observable side effect.

The invalid-title test is particularly important. It checks not just that the API returns 400, but also that the database remains empty. This distinction is useful in payment systems, booking services and any operation where a rejected request must not mutate state.

## Run and interpret the tests

From the project directory run:

```bash
node --test app.test.js
```

Expect six passing tests and zero failures. The exact reporter output and timings depend on the Node version. The process exits with a nonzero status if a test fails, which makes the command suitable for continuous integration.

To see a failure deliberately, temporarily change the expected status in the create-and-read test from 201 to 200. Run the command again. The assertion reports the difference between actual and expected values. Restore 201 afterwards. This exercise demonstrates that the test can actually detect a regression rather than merely execute code.

You can also run node --test --watch app.test.js while editing. For a manual check, run node app.js in a separate terminal and use curl http://127.0.0.1:3000/tasks. The manual database is separate from every test database.

## Why isolation matters

Suppose the first test creates a task and the second expects an empty list. If both share a database, the second test depends on execution order. Such failures are hard to diagnose because the same test may pass when run alone. Our fixture creates a new connection every time, so each test starts from a predictable state.

An in-memory database is not a complete substitute for testing persistence. To verify that records survive a restart, create a temporary directory with node:fs, open a database file there, insert a record, close the connection, reopen the same file and check the record. Remove the directory in a finally block. Do not use your production database for automated tests.

## What should you test next?

Extend the suite with maximum-length titles, null JSON, oversized bodies, missing IDs, update and delete operations when you implement those routes. For each mutation, test both the successful path and the rejected path. The SQL-looking string test demonstrates that a particular input is stored literally; it does not prove that every query in a larger application is secure.

Avoid asserting internal implementation details unnecessarily. A test that checks the public HTTP contract should survive a refactor from SQLite to PostgreSQL if the externally visible behavior stays the same. Conversely, a database migration deserves its own tests because it can fail independently of HTTP.

For larger projects, run the suite in CI before merging. Add a separate persistence suite, authentication and authorization tests, concurrency cases and realistic database integration tests. Measure coverage with the tools supported by your Node version, but remember that executing a line is not the same as checking its behavior.

## Troubleshooting

If node:sqlite cannot be imported, check your Node version and installation. If the test process does not exit, inspect open servers, connections and timers. If a request fails before an assertion, verify that the server has emitted listening and that the URL uses its actual allocated port. If tests pass alone but fail together, investigate shared state rather than adding arbitrary delays.

## Conclusion

Automated tests are executable descriptions of behavior. By separating server creation from startup and creating isolated databases, we can verify HTTP responses and persistent operations without external testing libraries. This pattern remains useful even when the application grows beyond a simple task API.

## References

- [Node.js test runner](https://nodejs.org/api/test.html)
- [Node.js strict assertions](https://nodejs.org/api/assert.html)
- [Node.js SQLite](https://nodejs.org/api/sqlite.html)
- [Node.js HTTP](https://nodejs.org/api/http.html)
- [SQLite in-memory databases](https://www.sqlite.org/inmemorydb.html)
