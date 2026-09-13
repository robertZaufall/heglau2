import { chapterAt, progressBetween } from "./timeline.js";

const root = document.documentElement;
const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
const motionButtons = [...document.querySelectorAll(".motion-toggle")];
const chapters = [...document.querySelectorAll("[data-story]")];
const images = [...document.querySelectorAll("[data-story-image]")];
const headerLinks = [...document.querySelectorAll(".desktop-nav a")];
let explicitMotion = null;
let paused = motionQuery.matches;
let raf = 0;
let offsets = [];
let active = -1;
let lastFocus;

root.classList.add("js");

function setMotion() {
  paused = explicitMotion ?? motionQuery.matches;
  root.classList.toggle("no-motion", paused);
  root.classList.toggle("motion-allowed", !paused);
  motionButtons.forEach((button) => {
    const label = paused ? "Animation einschalten" : "Animation pausieren";
    button.setAttribute("aria-pressed", String(paused));
    button.setAttribute("aria-label", label);
    button.toggleAttribute(
      "data-system-paused",
      paused && explicitMotion === null && motionQuery.matches,
    );
    button.title =
      paused && explicitMotion === null && motionQuery.matches
        ? "Animation durch deine Systemeinstellung ausgeschaltet. Animation einschalten."
        : label;
    button.querySelector(".motion-label").textContent = label;
    button.querySelector(".motion-icon").textContent = paused ? "▷" : "Ⅱ";
  });
  document.querySelector(".motion-explanation").hidden = !(
    paused &&
    explicitMotion === null &&
    motionQuery.matches
  );
  schedule();
}
function measure() {
  offsets = chapters.map(
    (chapter) => chapter.getBoundingClientRect().top + scrollY,
  );
  schedule();
}
function paint() {
  raf = 0;
  const readingLine = scrollY + innerHeight * 0.46;
  const next = chapterAt(offsets, readingLine);
  if (next !== active) {
    active = next;
    images.forEach((image, index) => {
      image.classList.toggle("is-active", index === active);
      image.inert = index !== active;
    });
    document.querySelector("[data-visual-index]").textContent = String(
      active + 1,
    ).padStart(2, "0");
  }
  const storyEnd = offsets.at(-1) + chapters.at(-1).offsetHeight;
  root.style.setProperty(
    "--story-progress",
    progressBetween(readingLine, offsets[0], storyEnd),
  );
  const section = [
    ...document.querySelectorAll("#entdecken, [data-story], #besuch"),
  ]
    .filter((item) => item.getBoundingClientRect().top < innerHeight * 0.5)
    .at(-1);
  headerLinks.forEach((link) => {
    if (section && link.hash === "#" + section.id)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  if (!paused) {
    const heroProgress = progressBetween(
      scrollY,
      0,
      document.querySelector(".hero").offsetHeight,
    );
    root.style.setProperty("--hero-scale", 1 + heroProgress * 0.07);
    root.style.setProperty("--star-angle", `${heroProgress * 95}deg`);
  }
}
function schedule() {
  if (!raf) raf = requestAnimationFrame(paint);
}

const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
function closeMenu(restore = false) {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Menü öffnen");
  if (restore) menuButton.focus();
}
menuButton.addEventListener("click", () => {
  const open = mobileNav.hidden;
  mobileNav.hidden = !open;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Menü schließen" : "Menü öffnen",
  );
});
mobileNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("pointerdown", (event) => {
  if (!mobileNav.hidden && !event.target.closest(".site-header")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileNav.hidden) closeMenu(true);
});

// Native dialogs trap focus. Save the opener explicitly for gallery navigation.
function openDialog(dialog, opener) {
  lastFocus = opener;
  dialog.showModal();
  document.body.style.overflow = "hidden";
}
for (const dialog of document.querySelectorAll("dialog")) {
  dialog
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
    lastFocus?.focus({ preventScroll: true });
  });
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    )
      dialog.close();
  });
}
document
  .querySelector("[data-open-sources]")
  .addEventListener("click", (event) =>
    openDialog(document.querySelector("#sources-dialog"), event.currentTarget),
  );
const gallery = [...document.querySelectorAll("[data-gallery]")];
const galleryDialog = document.querySelector("#gallery-dialog");
let galleryIndex = 0;
function showPhoto(index) {
  galleryIndex = (index + gallery.length) % gallery.length;
  const original = gallery[galleryIndex].querySelector("img");
  const enlarged = galleryDialog.querySelector("img");
  const status = galleryDialog.querySelector(".gallery-status");
  status.textContent = "Bild wird geladen …";
  status.hidden = false;
  enlarged.onload = () => {
    status.hidden = true;
  };
  enlarged.onerror = () => {
    status.textContent =
      "Das Foto konnte nicht geladen werden. Die Bildbeschreibung findest du unten.";
  };
  enlarged.src = original.src;
  if (enlarged.complete && enlarged.naturalWidth) status.hidden = true;
  enlarged.alt = original.alt;
  galleryDialog.querySelector("figcaption").textContent =
    `${original.alt}. Foto: ${gallery[galleryIndex].closest("figure").querySelector("figcaption span:last-child").textContent}.`;
  galleryDialog.querySelector("[data-gallery-count]").textContent =
    `${String(galleryIndex + 1).padStart(2, "0")} / ${String(gallery.length).padStart(2, "0")}`;
}
gallery.forEach((button, index) =>
  button.addEventListener("click", () => {
    showPhoto(index);
    openDialog(galleryDialog, button);
  }),
);
document
  .querySelector("[data-gallery-prev]")
  .addEventListener("click", () => showPhoto(galleryIndex - 1));
document
  .querySelector("[data-gallery-next]")
  .addEventListener("click", () => showPhoto(galleryIndex + 1));
galleryDialog.addEventListener("keydown", (event) => {
  if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.preventDefault();
    showPhoto(galleryIndex + (event.key === "ArrowRight" ? 1 : -1));
  }
});
// Missing photographs never remove their story or outbound business link.
for (const img of document.querySelectorAll(".photo-frame img")) {
  const markMissing = () =>
    img.closest(".photo-frame").classList.add("is-missing");
  img.addEventListener("error", markMissing);
  if (img.complete && !img.naturalWidth) markMissing();
}
motionButtons.forEach((button) =>
  button.addEventListener("click", () => {
    explicitMotion = !paused;
    setMotion();
  }),
);
motionQuery.addEventListener("change", setMotion);
addEventListener("scroll", schedule, { passive: true });
addEventListener("resize", () => {
  if (innerWidth > 760) closeMenu();
  measure();
});
addEventListener("pageshow", measure);
document.fonts.ready.then(measure);
setMotion();
measure();
