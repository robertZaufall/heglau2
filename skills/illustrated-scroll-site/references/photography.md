# Original photography for scroll stories

## Get the right asset

Inspect the user-supplied source page, its relevant gallery and product pages. Prefer the original asset URL over a thumbnail; sources often expose `data-uro-original`, `srcset`, or full-size media links. A website may load successfully with a normal HTTP client even if a search index cannot retrieve it. Preserve TLS verification and use an available client with a valid certificate store.

Download the selected originals locally and visually inspect them before deciding on layout. A small contact sheet is useful for comparing composition. Check the actual subject, orientation and source resolution; filenames alone do not establish what a photograph shows. Do not upscale a small source or imply extra detail. Do not replace real photos with generated interpretations when originals are requested.

Retain an asset manifest with the original image URL, source page, local filename, retrieval date, source or publisher credit, dimensions and transformations. Distinguish a publisher credit from an identified photographer. Reuse as directed by the user, preserve existing rights notices, and do not invent a license or claim that an independent portrait is an official business website. Public availability is not evidence of an open license.

## Compose with what is real

Photo-led design should be specific to the available images: a product close-up, an actual harvest, a working space or a human gesture. Use actual quality, color and orientation to choose hero images. Editorial crops may be applied with CSS; retain access to the complete image in a viewer when a crop conceals useful product detail. Use image compression and orientation correction for delivery; do not alter the factual content of documentary photographs.

For a futuristic rural portrait, one possible direction combines oversized sans-serif type, warm neutral space, deep charcoal chapters, an acid-green accent, thin dividers and asymmetric photography. This is an example, not a fixed palette or universal layout. Build meaning into navigation and captions rather than adding fake telemetry, invented coordinates or game-like decoration.

Scroll pacing should serve the story. A desktop sticky stage may change photographs at the reading line while normal sections remain in document flow. Reverse scrolling and direct anchor jumps must update the same state. Phones should show each photo next to its story, without a hidden or cropped-off narrative stage.

## Delivery and fallback

Use the available image encoder to create optimized local WebP or AVIF copies, preserve useful dimensions and do not upscale. Preload only the essential hero media; lazily load below-fold photographs. Reuse the same URLs when desktop and phone share an image so the browser can cache them. Never hotlink source-site images as a production dependency.

Image failures should leave readable captions, meaningful alternative text, a stable frame and working business links. Keep controls out of the way of the actual photograph. A gallery should support keyboard arrows, Escape, a visible close button, an announced index and focus restoration. Its full-image layout must fit the viewport without stretching the image.

Remove unused fictional delivery media from the public build, retaining needed originals in a private local archive. Credit the source businesses visibly and provide a complete source note. Verify that normal page loading makes no requests to the source websites or analytics services.
