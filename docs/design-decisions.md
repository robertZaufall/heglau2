# Heglau — a photographic redesign

The brief calls for a completely new, more futuristic site with original photographs from the pottery and kraut businesses. The reference to a five-year-old's video game was interpreted as criticism of the old miniature aesthetic. This version uses a mature editorial direction, not a toy-world or simulated game.

## Visual system

Oversized, tightly spaced DM Sans typography establishes the identity. Warm paper `#eeeee7`, charcoal `#20231d` and acid lime `#d5f45b` connect the soil, ceramics and cabbage without imitating a rustic brochure. Thin dividers, generous space, precise captions and an asymmetric photo composition create the layout's rhythm. The header mark, favicon, copy, page composition and footer are new.

Real images drive the design: green harvest crates sit beside brightly glazed plates; the dark handwork story features actual stoneware; the kraut story shows the real harvest. Photographs retain their factual content. An oversized arrow links directly to the visiting map, and the photo index describes the story rather than inventing telemetry.

## Story and interaction

The page moves from introduction to two business stories, a three-image detail gallery and visit planning. Desktop uses a sticky stage with reversible photo fades. Small scroll-linked image scale and a rotating asterisk add movement without wheel interception or autoplay video. There is no continuous animation loop.

Phones and short landscape screens show each story with its own semantic inline photograph and credit. The gallery shows complete images, includes load/failure feedback, supports keyboard arrows and Escape, and restores focus. Native links and source notes survive JavaScript failure. Reduced motion starts static, presents a play control immediately and respects a manual override for the visit.

## Delivery

All seven delivery photos and both DM Sans fonts are local. No runtime dependency or third-party request is needed. The build keeps research and skills outside `dist/`. Old synthetic imagery, film, unused Cormorant fonts and the source-specific video wrapper are preserved in `output/legacy-media/`, outside the public build.

The reusable workflow now offers a photographic mode alongside its existing illustration/video modes. The project skill and installed skill were updated together. The redesign publishes independently from `robertZaufall/heglau2` to `https://glaubi.net/heglau2/`. Its Pages workflow uploads only the static build, and a dedicated narrowly scoped Worker handles the domain path. The original Heglau deployment remains separate.
