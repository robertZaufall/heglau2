import test from "node:test";
import assert from "node:assert/strict";
import { proxy } from "../cloudflare/worker.js";

const request = (path, init) => new Request(`https://glaubi.net${path}`, init);
const noFetch = () => {
  throw new Error("Unexpected origin request");
};

test("HTML revalidates so new releases do not leave visitors on old controllers", async () => {
  const response = await proxy(request("/heglau2/"), async (_, init) => {
    assert.equal(init.cf.cacheTtl, 0);
    return new Response("<html></html>", {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "max-age=600",
      },
    });
  });
  assert.equal(response.headers.get("cache-control"), "no-cache");
});

test("proxy redirects the bare path and isolates other routes and methods", async () => {
  const r = await proxy(request("/heglau2?visit=1"), noFetch);
  assert.equal(r.status, 308);
  assert.equal(r.headers.get("location"), "https://glaubi.net/heglau2/?visit=1");
  for (const path of [
    "/",
    "/heglau2-extra/",
    "/solitaire/",
    "/heglau/",
    "/heglau/assets/pottery.webp",
    "/heglau2/../private",
  ])
    assert.equal((await proxy(request(path), noFetch)).status, 404);
  assert.equal(
    (await proxy(new Request("https://other.example/heglau2/"), noFetch)).status,
    404,
  );
  const post = await proxy(request("/heglau2/", { method: "POST" }), noFetch);
  assert.equal(post.status, 405);
  assert.equal(post.headers.get("allow"), "GET, HEAD");
});

test("proxy keeps range bytes, query and validators without forwarding credentials", async () => {
  const r = await proxy(
    request("/heglau2/assets/movie.mp4?v=2", {
      headers: {
        range: "bytes=2-5",
        "if-range": '"movie"',
        cookie: "private=yes",
        authorization: "Bearer private",
      },
    }),
    async (url, init) => {
      assert.equal(
        url,
        "https://robertzaufall.github.io/heglau2/assets/movie.mp4?v=2",
      );
      assert.equal(init.headers.get("range"), "bytes=2-5");
      assert.equal(init.headers.get("if-range"), '"movie"');
      assert.equal(init.headers.has("cookie"), false);
      assert.equal(init.headers.has("authorization"), false);
      assert.equal(init.redirect, "manual");
      return new Response(new Uint8Array([2, 3, 4, 5]), {
        status: 206,
        headers: {
          "content-range": "bytes 2-5/10",
          "content-type": "video/mp4",
          etag: '"movie"',
          "set-cookie": "unwanted=yes",
        },
      });
    },
  );
  assert.equal(r.status, 206);
  assert.equal(r.headers.get("content-range"), "bytes 2-5/10");
  assert.equal(r.headers.get("etag"), '"movie"');
  assert.equal(r.headers.has("set-cookie"), false);
  assert.deepEqual([...new Uint8Array(await r.arrayBuffer())], [2, 3, 4, 5]);
});

test("proxy rewrites origin redirects and rejects redirects outside the site", async () => {
  const r = await proxy(request("/heglau2/folder"), async () =>
    Response.redirect(
      "https://robertzaufall.github.io/heglau2/folder/?q=1",
      301,
    ),
  );
  assert.equal(
    r.headers.get("location"),
    "https://glaubi.net/heglau2/folder/?q=1",
  );
  for (const destination of [
    "https://example.com/",
    "https://robertzaufall.github.io/other/",
  ])
    assert.equal(
      (
        await proxy(request("/heglau2/"), async () =>
          Response.redirect(destination),
        )
      ).status,
      502,
    );
});

test("HEAD and conditional responses retain semantics; origin errors stay local", async () => {
  const head = await proxy(
    request("/heglau2/", { method: "HEAD" }),
    async (_, init) => {
      assert.equal(init.method, "HEAD");
      return new Response(null, { headers: { "content-length": "123" } });
    },
  );
  assert.equal(await head.text(), "");
  assert.equal(head.headers.get("content-length"), "123");
  const unchanged = await proxy(
    request("/heglau2/"),
    async () => new Response(null, { status: 304 }),
  );
  assert.equal(unchanged.status, 304);
  const missing = await proxy(
    request("/heglau2/missing"),
    async () => new Response("GitHub error page", { status: 404 }),
  );
  assert.equal(missing.status, 404);
  assert.equal(await missing.text(), "Seite nicht gefunden.");
  assert.equal(
    (
      await proxy(request("/heglau2/"), async () => {
        throw new Error("Offline");
      })
    ).status,
    502,
  );
});
