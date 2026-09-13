import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

test("every local HTML asset and section link resolves", async () => {
  const html = await readFile("index.html", "utf8");
  const ids = new Set(
    [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
  );
  for (const [, href] of html.matchAll(/\bhref="#([^"]+)"/g))
    assert.ok(ids.has(href), `Missing target ${href}`);
  for (const [, path] of html.matchAll(
    /\b(?:src|data-src|data-src-mobile|href)="\.\/([^"]+)"/g,
  )) {
    await access(path.startsWith("src/") ? path : `public/${path}`);
  }
});
test("page loads no external scripts, images, fonts, or embedded services", async () => {
  const html = await readFile("index.html", "utf8");
  const css = await readFile("src/styles.css", "utf8");
  assert.doesNotMatch(html, /<(script|iframe|img)\b[^>]*\bsrc="https?:/i);
  assert.doesNotMatch(css, /url\(['"]?https?:/i);
  for (const [link] of html.matchAll(/<link\b[^>]*>/gi)) {
    // Canonical metadata identifies the public URL without fetching a resource.
    if (!/\brel="canonical"/i.test(link))
      assert.doesNotMatch(link, /\bhref="(?:https?:)?\/\//i);
  }
});
