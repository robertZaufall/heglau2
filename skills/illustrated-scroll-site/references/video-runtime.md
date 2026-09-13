# Scroll-controlled video runtime

Use this mode when a film is part of the accepted brief. Original-photo storytelling does not require a generated movie.

Map normalized chapter progress to paused video time, clamped below the duration. Keep only the latest requested seek while the decoder is busy. Test forward, reverse, rapid navigation and overscroll.

Retain the actual first-frame poster while loading. Reveal video after decoded-frame readiness; do not depend exclusively on requestVideoFrameCallback or hide the video with display:none while waiting for it. A scheduled paint after loadeddata can provide a fallback when compositor callbacks do not arrive.

A modest compressed film may be fetched as a Blob to avoid repeated remote range seeks. Account for full download and memory cost, choose a lighter phone encode, and use direct streaming when that better fits larger assets. Preserve Blob URLs across back/forward-cache restores; revoke them when the document is actually discarded.

Read system reduced motion before fetching the movie. An initially paused page must show a play icon, a clear action such as “Animation einschalten,” and the reason for the static state. A manual choice overrides the system preference for the current visit. Use muted inline playback and interaction priming when needed; browser viewport emulation does not prove real iPhone compatibility.

Reserve space for the tallest copy on phones. Fit the complete landscape film unless a separate portrait composition exists. Short viewports should use ordinary vertical flow. Recalculate chapter offsets after layout changes, retain safe-area handling and stable viewport measurements, and avoid remapping progress for browser-toolbar-only height changes.
