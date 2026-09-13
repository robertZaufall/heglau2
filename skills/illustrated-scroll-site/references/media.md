# Media production

## Generation brief

Separate factual copy from illustrative art direction. A useful brief specifies subject, spatial layout, materials, lighting, palette, aspect ratio, camera path, and exclusions. Avoid text and logos inside generated artwork; render interface text in HTML.

Heglau's visual brief used cream plaster, terracotta roofs, matte miniature materials, muted green trees, a blue-green brook, pottery on one side and cabbage rows on the other. It excluded invented landmark churches, castles, and mountains. These are project choices, not defaults for every destination.

A video prompt should describe one coherent spatial scene and one continuous camera movement: wide introduction, slow visits to the important details, then a closing overview. For a short journey, one complete take avoids continuity problems between independently generated clips. If multiple clips are necessary, inspect their actual join frames and geometry before joining them.

Example camera instruction:

> Generate one continuous, silent landscape camera flight across the same miniature. Begin wide, ease toward the workshop, arc toward the cultivated field, then rise to reveal the same village. Preserve geometry and lighting throughout. Keep breathing room around the scene. No cuts, labels, captions, or logos.

Review a contact sheet across the take and watch transitions. Check the actual backdrop rather than assuming a hex color in the prompt was obeyed. If a local image attachment fails, inspect browser state before retrying; use text-based generation when appropriate and document the changed input. Do not assume a timed-out submission failed before checking for a created job.

## Delivery encoding

Use the bundled helper from any directory:

```sh
bash scripts/encode-journey.sh input.mp4 public/assets journey
```

Resolve that script relative to this skill's directory. It creates `journey.mp4`, `journey-mobile.mp4`, and `journey-poster.webp`. Requires local FFmpeg and cwebp. It selects the main video stream, removes audio and attached previews, preserves aspect ratio without upscaling, encodes H.264/yuv420p with fast-start metadata and frequent keyframes, and extracts the poster from the delivered desktop film.

An optional `COLOR_FILTER` environment variable applies a measured correction to both encodes. Do not reuse Heglau's RGB white-point correction blindly. A flat neutral backdrop may be normalized and blended into the page, but inspect shadows and highlight clipping afterward. Retain the accepted native source locally to allow a different correction later.

The phone encode is lighter landscape footage, not a native portrait film. Fit it with `object-fit: contain`. If a native portrait treatment is requested, generate or art-direct that composition separately.

Keep accepted editable masters outside the static build and normally outside Git. Remove rejected generations, duplicate conversions, and downloaded research pages once useful provenance is captured as source links and prompt notes. Retain optimized delivery assets and any required font or software licenses.
