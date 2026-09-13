import { mkdir, cp, rm, writeFile, readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("src", "dist/src", { recursive: true });
// Version source URLs together, including module imports. A new deployment must
// not combine a cached controller or stylesheet with the latest document.
const sources = (await readdir("src"))
  .filter((name) => /\.(js|css)$/.test(name))
  .sort();
const sourceHash = createHash("sha256");
for (const name of sources)
  sourceHash.update(name).update(await readFile(`src/${name}`));
const revision = sourceHash.digest("hex").slice(0, 12);
for (const name of sources.filter((name) => name.endsWith(".js"))) {
  const source = await readFile(`src/${name}`, "utf8");
  await writeFile(
    `dist/src/${name}`,
    source.replace(
      /(from\s+["'])(\.\/[^"'?]+\.js)(["'])/g,
      `$1$2?v=${revision}$3`,
    ),
  );
}
const html = await readFile("index.html", "utf8");
await writeFile(
  "dist/index.html",
  html.replace(
    /(\b(?:src|href)=["'])(\.\/src\/[^"'?]+\.(?:js|css))(["'])/g,
    `$1$2?v=${revision}$3`,
  ),
);
await cp("public", "dist", {
  recursive: true,
});
await writeFile("dist/.nojekyll", "");
console.log(
  "Built self-contained static website in dist/. No network services required.",
);
