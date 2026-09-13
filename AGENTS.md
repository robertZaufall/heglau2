# Heglau maintenance guide

## Scope and architecture

This directory is the independent photographic redesign of Heglau. It uses plain German-language HTML, CSS and JavaScript. Keep README focused on the visitor experience; maintain technical instructions here. The reusable workflow is [skills/illustrated-scroll-site/SKILL.md](skills/illustrated-scroll-site/SKILL.md).

The public site is `https://glaubi.net/heglau2/`, hosted by GitHub Pages from `robertZaufall/heglau2` on `master`. The `heglau2-proxy` Cloudflare Worker maps only `glaubi.net/heglau2` and `glaubi.net/heglau2/*` to `https://robertzaufall.github.io/heglau2/`. The older Heglau site and its Worker are separate.

| Path                              | Responsibility                                                        |
| --------------------------------- | --------------------------------------------------------------------- |
| `index.html`                      | German content, original-photo figures, navigation and native dialogs |
| `src/styles.css`                  | Editorial design, sticky photography, responsive and motion states    |
| `src/main.js`                     | Scroll state, photo sequence, gallery, menus and accessibility        |
| `src/timeline.js`                 | Bounded progress and bidirectional chapter selection                  |
| `public/`                         | Optimized original photographs, local fonts, favicon and notices      |
| `scripts/build.mjs`               | Static output and source URL versioning                               |
| `scripts/server.mjs`              | Local development and production preview server                       |
| `tests/`                          | Local resource boundaries, asset targets and chapter behavior         |
| `docs/`                           | Content sources, photo provenance, design and verification records    |
| `skills/illustrated-scroll-site/` | Reusable photographic and illustrated site workflow                   |

## Development and validation

Use Node.js 20 or later. No dependency installation is required for development, tests or build.

```sh
npm run dev
npm test
npm run build
npm run preview
```

Both servers bind to `127.0.0.1:4173`. Run one at a time, or use `PORT=4174 npm run preview`. Inspect existing listeners before starting another process. Stop task-created servers after checking unless the user asks to keep one running.

Run `npm test`, `npm run build`, and `git diff --check` for application changes. If Git metadata is absent, state that and use `git diff --no-index --check` against the saved baseline for edited files. Documentation-only edits need link, command and whitespace checks without adding test dependencies.

For visual changes, inspect desktop, tablet, phone, small phone and short landscape layouts. Verify anchor jumps, forward/reverse scroll, mobile menu, dialog keyboard navigation and restored focus, overflow, photo failure, no JavaScript, and reduced motion. Record the browser actually tested; do not equate viewport emulation with real iPhone or Windows testing.

## Public build boundaries

The build copies only `index.html`, `src/`, and `public/` to `dist/`, plus `.nojekyll`. It adds a shared source revision to module imports, script URLs and stylesheet URLs. Runtime asset paths must remain relative for deployment below a path prefix.

Never publish the repository root, source photo downloads, research material, skills, docs, environment files or media archives. `dist/` is generated and ignored. The old synthetic imagery and movie have been archived in ignored `output/legacy-media/`; they must not reenter this photographic build.

## Photography, motion and accessibility

- Use actual photographs from the supplied businesses, not generated substitutes. Preserve original subject matter. Compression and orientation correction are allowed; do not upscale low-resolution sources.
- Record exact image URLs, source pages, retrieval dates, credit, dimensions and treatment in [docs/photo-sources.json](docs/photo-sources.json). Credit the publisher without inventing an open license or a photographer identity.
- Keep originals in ignored `output/source-photos/`. Optimized delivery files belong in `public/assets/` and must be served locally.
- Desktop stories use a sticky photo stage; scroll determines the active image in both directions. Do not hijack wheel or touch scrolling. Render on demand.
- On phones and short landscapes, use semantic inline images and credits alongside each story. Do not use CSS background images for meaningful story content.
- Respect reduced motion at startup. Show the static state and an immediate **Animation einschalten** control with its system reason. The manual choice overrides the system preference for the visit.
- Keep useful text and links available if a photograph or JavaScript fails. Gallery dialogs show the complete image, support arrows and Escape, and restore focus to the opener.
- Optional future film work belongs to the skill's separate video mode. Do not reuse the archived Heglau color-correction wrapper for different footage.

## Content, notices and publication

Keep visitor copy in German. Verify changing business details on primary sources, date population statistics if reintroduced, and update [docs/content-sources.md](docs/content-sources.md). Do not treat historical Krautfest notices as upcoming dates. Preserve relevant text attribution, software and font notices.

When publication is requested or already authorized, first resolve the destination for this independent copy. Build only the public output. In a configured Git repository, stage intended changes, commit, pull with rebase and push; wait for the commit's deployment to succeed, verify local/tracking/remote SHA parity, and compare changed public assets with the local build. Never silently overwrite the original site's deployment.

## GitHub Pages and domain routing

The [Pages workflow](.github/workflows/static.yml) tests, builds and uploads only `dist/` on pushes to `master` or manual dispatch. Pages uses GitHub Actions as its build source. The `github-pages` environment permits deployments from `master`; GitHub may initially create a `main` policy when Pages is enabled before the first push.

[cloudflare/worker.js](cloudflare/worker.js) owns this site's streaming proxy. [tests/proxy.test.js](tests/proxy.test.js) covers path isolation, credential stripping, queries, redirects, range responses, HEAD and upstream errors. Keep the fixed origin and narrow route boundaries. `/heglau2` redirects to `/heglau2/`; use the slash form for URLs with query parameters because Cloudflare exact routes include the query string when matching. Do not broaden the route to `/heglau2*`.

`wrangler.jsonc` holds ignored local account configuration. Start from [wrangler.example.jsonc](wrangler.example.jsonc) when absent. With a current Wrangler v4, verify `wrangler whoami`, run `wrangler deploy --dry-run`, then deploy after authorized routing changes and inspect `wrangler deployments status --json`. Ordinary site releases only need the Pages workflow. Never publish local routing snapshots or credential material.

After publication, verify the bare-path redirect, slash URL, nested and missing assets, byte ranges, and local/Pages/public SHA-256 parity. Compare local HEAD, `origin/master` and the remote branch. The user-facing route card belongs in `../glaubinet/index.html`; preserve its existing Heglau card.
