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

The redesign publishes independently from `robertZaufall/heglau2`, with the Pages workflow uploading only `dist/`. The dedicated `heglau2-proxy` maps `glaubi.net/heglau2` and `glaubi.net/heglau2/*` to the Pages origin. The original Heglau website and shared route fallback remain separate. Live deployment verification is recorded below once delivery succeeds.

The original files are preserved in `output/redesign-backup/`, the old delivery media in `output/legacy-media/`, and original photo downloads in `output/source-photos/`. The skill validator passes for the project and installed copies of `illustrated-scroll-site`. Temporary browser captures and task-created preview processes are removed after verification; selected final preview images are retained as delivery artifacts.
