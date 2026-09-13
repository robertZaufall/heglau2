---
name: illustrated-scroll-site
description: Build source-based editorial scroll websites with original photography or generated illustrations. Use for place portraits, destination stories, and visual business features, with accessible motion, local media, and optional static publication.
---

# Illustrated Scroll Site

Build a distinctive visual story whose copy, navigation, and practical information remain useful without animation. “Illustrated” describes visual storytelling; it does not require generated artwork. Choose the medium and design language from the current brief, not from an earlier site's template.

## Establish the source and direction

Read the supplied source pages and verify changing business details against primary sources. Record retrieval dates and dated statistics. Do not promote an old event announcement as a current event. Keep source credits and practical links accessible outside the animated story.

For a redesign, change the actual visual system: composition, typography, image treatment, chapter pacing, interaction and mobile layout. Recoloring the inherited template is insufficient when the user asks for a completely new site. Preserve useful architecture and verified content without inheriting the previous project's aesthetic or deployment destination.

Choose one coherent direction and implement it. For a futuristic photographic brief, expressive typography, precise grids, contrasting light and dark sections, a restrained vivid accent, and spatial photo transitions can create character without fabricated scenery. Miniature villages, rounded toy buildings, faux game controls, pastel dioramas, and decorative sci-fi dashboards are not defaults. A playful or illustrative treatment still fits when the user requests it.

## Choose the media mode

- **Original photography:** When the user requests real photos, read [photography.md](references/photography.md). Use photographs from the supplied businesses or source collection. Animate the composition instead of generating a replacement scene or synthetic movie.
- **Generated illustration or film:** When this matches the brief, read [media.md](references/media.md). For a scroll-scrubbed movie, also read [video-runtime.md](references/video-runtime.md). Label invented buildings and landscapes as illustrations, not factual reconstructions.
- **Mixed media:** Keep documentary photographs and invented scenes visibly distinct. Do not transform real products, people or locations into apparent documentary evidence of something that never existed.

## Build the journey

Prefer plain HTML, CSS and JavaScript when the content does not need an application framework. Serve fonts and optimized media locally through relative paths, including when hosted under a subdirectory. Keep research downloads, media masters, environment files and skill resources outside the public build.

A photo journey can use a sticky image stage with ordinary reading sections, reversible crossfades, a small amount of scroll-linked movement, and an optional full-image viewer. Preserve natural browser scrolling; avoid wheel interception and mandatory animation before the user can continue. Use requestAnimationFrame on demand, not an endless render loop for a static page.

Let the photographs dictate crops and sequence. On phones and short landscape screens, use ordinary vertical flow with a real image, alternative text and visible credit for each chapter. Do not substitute inaccessible CSS backgrounds for meaningful photography. A full-image viewer should preserve the entire photograph with contain fitting.

Read reduced-motion preferences before initiating animation or fetching optional film. Keep content visible, disable nonessential movement, and make the paused state and a play action available immediately. A manual choice overrides the preference for the current visit. Opening and closing dialogs must preserve focus; navigation, reading order and source access should survive JavaScript or media failure.

## Verify and deliver

Check the built output, not only the development page. Validate local asset and anchor targets, source revisioning, responsive overflow, forward and reverse chapter changes, photo failure, reduced motion, keyboard navigation, dialog dismissal and focus restoration. Inspect desktop, tablet, phone, small phone and short landscape sizes. Distinguish viewport emulation from actual iPhone or Windows testing.

Update the project's design, source and verification records, including exact photo provenance. When updating the reusable skill, keep its installed and project copies consistent if both are in scope. Preserve legacy originals outside the public directory rather than accidentally shipping them.

Publish only when requested or already authorized. For GitHub Pages, read [publication.md](references/publication.md). A copied project may not have Git metadata or a deployment workflow; inspect these before asserting branch status or using an inherited production destination. End with the concrete local result or verified public URL and material remaining limitations.
