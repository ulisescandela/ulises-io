---
title: "Build Your First REST API with Node.js 26: A Complete Beginner’s Tutorial"
sourceSlug: primera-api-rest-nodejs-26-principiantes
category: "Programación"
date: "2026-11-23"
excerpt: "Build and test a Node.js REST API from scratch while learning HTTP, JSON, routing, and CRUD."
published: true
tags: ["Node.js", "JavaScript", "API REST", "Backend", "Tutorial"]
---

A REST API lets programs exchange resources over HTTP. In this tutorial you will build a small task API using the built-in Node.js HTTP module. It creates, lists, reads, updates and deletes tasks, and it validates incoming JSON. You need no framework or npm dependencies.

This is chapter 1 of Backend Engineering from Scratch. It stands alone: you can run everything below without another project. Storage lives in an array and disappears when the process stops; [chapter 2](/en/nodejs-sqlite-rest-api-complete-tutorial) replaces it with SQLite.

## Prerequisites and setup

Install [Node.js 26](https://nodejs.org/en/download) and check `node --version`. Use a terminal with `curl`. Create a folder `first-api`, enter it, and create `server.cjs`. The `.cjs` extension explicitly selects CommonJS, so no `package.json` or `npm install` is necessary. Run commands in that folder.

## HTTP in one minute

A client sends a method and path; the server returns a status and JSON body. Here a task is a resource, and its numeric `id` identifies one item.

| Method and path | Meaning | Success |
|---|---|---|
| GET /tasks | List tasks | 200 |
| POST /tasks | Create from `title` | 201 |
| GET /tasks/1 | Read one | 200 |
| PATCH /tasks/1 | Change `completed` | 200 |
| DELETE /tasks/1 | Delete | 200 |

Malformed JSON or invalid values produce 400, and missing resources produce 404. The sample uses 404 for unmatched methods and paths; a fuller HTTP implementation could return 405 with an `Allow` header.

## Build the server

Save this complete file as `server.cjs`:
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
## Understand the request lifecycle

`http.createServer` invokes the callback for every incoming request. `new URL(...).pathname` removes the query string before routing. The `send` function sets the status and JSON content type, then ends the response. Forgetting `res.end()` can leave the client waiting.

For POST and PATCH, `readJson` reads chunks, limits accepted body size to 10,000 bytes, parses JSON and requires an object. A title must be a nonempty string of at most 200 characters after trimming. `completed` must be a boolean, not the string `"true"`. The ID is checked as a positive safe integer. `nextId` assigns IDs; deleting a task does not decrease it. The array and counter reset when the process restarts.

## Run and test

Start the server with `node server.cjs`. It listens only on `127.0.0.1:3000`, your own machine. In a second terminal:

```bash
curl -i http://127.0.0.1:3000/tasks
curl -i -X POST http://127.0.0.1:3000/tasks -H 'Content-Type: application/json' -d '{"title":"Learn HTTP"}'
curl -i http://127.0.0.1:3000/tasks/1
curl -i -X PATCH http://127.0.0.1:3000/tasks/1 -H 'Content-Type: application/json' -d '{"completed":true}'
curl -i -X DELETE http://127.0.0.1:3000/tasks/1
```

The first response contains `[]`. The POST returns status 201 and a task such as `{"id":1,"title":"Learn HTTP","completed":false}`. PATCH returns the same task with `completed: true`; GET after DELETE returns 404. Windows users can run these commands in a shell with curl, such as PowerShell using `curl.exe`, adjusting shell quoting if needed.

Try an empty title and invalid JSON: both should return 400. Create another task, stop the server with Ctrl+C, restart it, and list tasks. The array is empty: process memory is not persistent storage.

## Limits and next steps

This is a learning server, not an internet-ready service: it has no authentication, rate limiting, TLS, pagination, or durable storage. The body limit reduces accepted input but does not replace a reverse proxy or complete protection against slow clients. Avoid exposing it publicly. Unsupported paths return 404, and exceptions are logged without exposing internal details to the client. If the port is occupied, stop the other process or change the port in both server and curl commands.

The next chapter keeps the same HTTP interface but saves tasks in SQLite, introduces prepared statements, and verifies data after restarting. See [Build a Persistent REST API with Node.js and SQLite](/en/nodejs-sqlite-rest-api-complete-tutorial).

## References

- [Node.js HTTP documentation](https://nodejs.org/api/http.html)
- [Node.js URL documentation](https://nodejs.org/api/url.html)
- [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110)
