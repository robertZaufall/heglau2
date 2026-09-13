import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

const production = process.argv.includes("--dist");
const root = resolve(production ? "dist" : ".");
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
};

createServer(async (req, res) => {
  try {
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405);
      res.end();
      return;
    }
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    const relative = pathname === "/" ? "/index.html" : pathname;
    // Development serves only application files, never reference snapshots or tooling.
    if (
      !production &&
      !/^\/(index\.html$|src\/|assets\/|favicon\.svg$|THIRD-PARTY-NOTICES\.txt$)/.test(
        relative,
      )
    ) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const asset = /^\/(assets\/|favicon\.svg$|THIRD-PARTY-NOTICES\.txt$)/.test(
      relative,
    );
    const base = !production && asset ? resolve(root, "public") : root;
    const file = resolve(base, "." + relative);
    if (!file.startsWith(base + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    const info = await stat(file);
    if (!info.isFile()) throw new Error("Not a file");
    const headers = {
      "Content-Type": mime[extname(file)] || "application/octet-stream",
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    };
    const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range) {
      const start = Number(range[1]);
      const end = Math.min(
        range[2] ? Number(range[2]) : info.size - 1,
        info.size - 1,
      );
      if (start > end) {
        res.writeHead(416, { "Content-Range": `bytes */${info.size}` });
        res.end();
        return;
      }
      res.writeHead(206, {
        ...headers,
        "Content-Range": `bytes ${start}-${end}/${info.size}`,
        "Content-Length": end - start + 1,
      });
      if (req.method === "HEAD") res.end();
      else createReadStream(file, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { ...headers, "Content-Length": info.size });
      if (req.method === "HEAD") res.end();
      else createReadStream(file).pipe(res);
    }
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(
    `Heglau is ready at http://localhost:${port}${production ? " (production build)" : ""}`,
  ),
);
