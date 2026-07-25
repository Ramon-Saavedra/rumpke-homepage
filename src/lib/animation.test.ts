import { fadeUp, staggerDelay } from "./animation";

describe("fadeUp", () => {
  it("returns visible classes when visible is true", () => {
    const result = fadeUp(true);
    expect(result).toContain("opacity-100");
    expect(result).toContain("translate-y-0");
  });

  it("returns hidden classes when visible is false", () => {
    const result = fadeUp(false);
    expect(result).toContain("opacity-0");
    expect(result).toContain("translate-y-10");
  });

  it("includes motion-safe transition classes", () => {
    expect(fadeUp(true)).toContain(
      "motion-safe:transition-[opacity,transform]",
    );
    expect(fadeUp(false)).toContain(
      "motion-safe:transition-[opacity,transform]",
    );
  });

  it("visible and hidden states are mutually exclusive", () => {
    expect(fadeUp(true)).not.toContain("opacity-0");
    expect(fadeUp(false)).not.toContain("opacity-100");
  });
});

describe("staggerDelay", () => {
  it("returns 0ms when not visible", () => {
    expect(staggerDelay(false, 100)).toBe("0ms");
    expect(staggerDelay(false, 200, 50, 2)).toBe("0ms");
  });

  it("returns base delay when visible with no step or index", () => {
    expect(staggerDelay(true, 180)).toBe("180ms");
  });

  it("adds step multiplied by index when visible", () => {
    expect(staggerDelay(true, 240, 80, 0)).toBe("240ms");
    expect(staggerDelay(true, 240, 80, 1)).toBe("320ms");
    expect(staggerDelay(true, 240, 80, 2)).toBe("400ms");
  });

  it("uses zero defaults for step and index", () => {
    expect(staggerDelay(true, 420)).toBe("420ms");
  });
});
