import {
  floatingInputBaseClasses,
  floatingLabelClasses,
} from "./floatingClasses";

describe("floatingInputBaseClasses", () => {
  it("includes peer and border-b base classes", () => {
    const result = floatingInputBaseClasses();
    expect(result).toContain("peer");
    expect(result).toContain("border-b");
    expect(result).toContain("pt-4");
    expect(result).toContain("pb-1");
  });

  it("uses default border classes when no error", () => {
    const result = floatingInputBaseClasses();
    expect(result).toContain("border-border-l");
    expect(result).toContain("focus:border-primary");
    expect(result).not.toContain("border-error");
  });

  it("uses error border class when error is provided", () => {
    const result = floatingInputBaseClasses("Campo requerido");
    expect(result).toContain("border-error");
    expect(result).not.toContain("focus:border-primary");
  });

  it("appends extra classes when provided", () => {
    const result = floatingInputBaseClasses(undefined, "font-mono");
    expect(result).toContain("font-mono");
  });

  it("appends extra classes alongside error class", () => {
    const result = floatingInputBaseClasses("Error", "font-mono");
    expect(result).toContain("border-error");
    expect(result).toContain("font-mono");
  });
});

describe("floatingLabelClasses", () => {
  it("includes base position and typography classes", () => {
    const result = floatingLabelClasses();
    expect(result).toContain("absolute");
    expect(result).toContain("left-0");
    expect(result).toContain("top-0");
    expect(result).toContain("text-xs");
  });

  it("uses primary color when no error", () => {
    const result = floatingLabelClasses();
    expect(result).toContain("text-primary");
    expect(result).not.toContain("text-error");
  });

  it("uses error color when error is provided", () => {
    const result = floatingLabelClasses("Campo requerido");
    expect(result).toContain("text-error");
  });

  it("includes resting state classes", () => {
    const result = floatingLabelClasses();
    expect(result).toContain("peer-placeholder-shown:top-4");
    expect(result).toContain("peer-placeholder-shown:text-sm");
    expect(result).toContain("peer-placeholder-shown:text-card-text-l");
  });

  it("includes focus state classes", () => {
    const result = floatingLabelClasses();
    expect(result).toContain("peer-focus:top-0");
    expect(result).toContain("peer-focus:text-xs");
    expect(result).toContain("peer-focus:text-primary");
  });

  it("uses error color in focus state when error is provided", () => {
    const result = floatingLabelClasses("Error");
    expect(result).toContain("peer-focus:text-error");
  });
});
