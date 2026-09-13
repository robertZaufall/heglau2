export const clamp = (value, min = 0, max = 1) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

// Determine the chapter at the reading line, in either scroll direction.
export function chapterAt(offsets, position) {
  let active = 0;
  for (let index = 1; index < offsets.length; index++) {
    if (position >= offsets[index]) active = index;
  }
  return active;
}

export function progressBetween(position, start, end) {
  if (end <= start) return 0;
  return clamp((position - start) / (end - start));
}
