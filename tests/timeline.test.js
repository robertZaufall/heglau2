import test from "node:test";
import assert from "node:assert/strict";
import { chapterAt, progressBetween } from "../src/timeline.js";

test("the photo follows the chapter when jumping forward and scrolling backward", () => {
  const chapters = [1200, 2300];
  assert.deepEqual(
    [0, 1200, 2299, 2300, 5000, 1800, 0].map((position) =>
      chapterAt(chapters, position),
    ),
    [0, 0, 0, 1, 1, 0, 0],
  );
});
test("the progress indicator remains bounded before, during and after the story", () => {
  assert.equal(progressBetween(-100, 100, 500), 0);
  assert.equal(progressBetween(300, 100, 500), 0.5);
  assert.equal(progressBetween(900, 100, 500), 1);
});
test("incomplete or collapsed layout measurements never produce an invalid transform", () => {
  assert.equal(progressBetween(100, 100, 100), 0);
  assert.equal(progressBetween(NaN, 100, 500), 0);
  assert.equal(progressBetween(100, 500, 100), 0);
});
