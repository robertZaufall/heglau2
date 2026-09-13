# Verification — 2026-09-14

## Automated checks

`npm test` passes ten tests, covering proxy isolation and request/response behavior as well as local HTML assets and anchors, no external runtime resources, forward/reverse chapter selection, bounded reading progress, and incomplete or collapsed measurements. `npm run build` creates the static page with a shared revision on CSS, JavaScript and relative module imports.

The final public directory is approximately 1.7 MB, including seven original photographs and local DM Sans fonts. It contains no generated film or miniature imagery. Research, archives, documentation and skill files stay outside the public build.

The initial copied directory had no `.git` metadata, so its initial whitespace check used `git diff --no-index --check` against the saved baseline. Publication initializes a dedicated `master` branch and applies ordinary `git diff --check` validation.

## Browser checks

The production build was exercised in local Chrome using Playwright. Viewports: **1440×1000, 1024×768, 768×1024, 390×844, 320×568, 844×390**. Each was checked at the opening, handwork, kraut, gallery and visit sections. There was no horizontal document overflow, broken local photograph or page JavaScript error in normal operation.

- Direct anchor jumps and forward/reverse chapter movement select the correct story photo.
- Mobile menu opens, navigates and closes; Escape restores focus to the menu button.
- Gallery images display at their complete aspect ratio. Arrow keys and previous/next controls change the image, Escape closes it, and focus returns to the opening thumbnail.
- Source dialog opens, retains keyboard focus and restores it after Escape.
- Emulated system reduced motion starts paused with an immediately visible **Animation einschalten** control. Manual enabling remains in force when the system preference changes.
- Blocking the local WebP requests displays fallback frames while keeping the story and links readable.
- With JavaScript disabled, chapters, inline photographs, business links and the source/privacy note remain available.
- A network capture recorded no external runtime requests during page load and navigation through the content.

These are Chrome viewport and preference emulations, not physical iPhone, actual Safari, Windows or assistive-technology tests. No real-device compatibility claim is implied.

## Publication and local artifacts

The redesign publishes independently from `robertZaufall/heglau2`, with the Pages workflow uploading only `dist/`. The dedicated `heglau2-proxy` maps `glaubi.net/heglau2` and `glaubi.net/heglau2/*` to the Pages origin. The original Heglau website and shared route fallback remain separate. Live deployment verification is recorded below.

The original files are preserved in `output/redesign-backup/`, the old delivery media in `output/legacy-media/`, and original photo downloads in `output/source-photos/`. The skill validator passes for the project and installed copies of `illustrated-scroll-site`. Temporary browser captures and task-created preview processes are removed after verification; selected final preview images are retained as delivery artifacts.

## Live publication — 2026-09-14

- Public URL: https://glaubi.net/heglau2/; the bare path redirects with HTTP 308.
- Initial website release: `003d1691cd54747c8fad15543b84f8ea978fe39b`; GitHub Pages run [34788649530](https://github.com/robertZaufall/heglau2/actions/runs/34788649530) succeeded on attempt 2. The first attempt built successfully but encountered GitHub's automatically created `main` deployment policy; that policy was corrected to the repository's `master` branch.
- Cloudflare Worker: `heglau2-proxy`, version `24bef354-09b8-4b1d-b572-b2b4247e107e`, deployed at 100%. Route comparison found exactly the two new Heglau 2 routes, with no changes or removals among pre-existing routes.
- All 17 delivered files matched the local build, Pages origin and custom-domain responses by SHA-256. The canonical page with a query string also matched. HTML revalidates, HEAD works, a missing asset returns 404, and a 128-byte photo range matched local bytes.
- Live Chrome checks at 1440×1000 and 390×844 found no horizontal overflow, failed resource request or page error. The chapter photo, mobile navigation and full-image gallery worked under the public subpath. These checks remain viewport emulations.
- Route index release: `85e3c880692f82c066aa2540270f6e36cddb1460`; [Pages run 34788825871](https://github.com/robertZaufall/glaubinet/actions/runs/34788825871) succeeded. The new card sits beside the original Heglau card; counters are 34 destinations, 6 categories and 15 GitHub projects.
- The original `https://glaubi.net/heglau/` response remained byte-identical to the pre-deployment copy. The user's existing local development server remains running.

Asset digests and before/after routing evidence are retained in ignored `output/deployment/`. Final live previews are in `output/preview/`.
