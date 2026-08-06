import { test } from "node:test";
import assert from "node:assert/strict";

const port = process.env.PORT || 3000;

test("GET /health returns ok", async () => {
  const res = await fetch(`http://127.0.0.1:${port}/health`);
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(body.status, "ok");
});
