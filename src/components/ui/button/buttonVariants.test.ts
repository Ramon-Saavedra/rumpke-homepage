import { buttonVariants } from "./buttonVariants";

describe("buttonVariants", () => {
  it("uses accessible primary colors by default", () => {
    const classes = buttonVariants();

    expect(classes).toContain("bg-primary");
    expect(classes).toContain("text-primary-foreground");
    expect(classes).toContain("hover:bg-primary-dark");
  });

  it("uses control borders for secondary actions", () => {
    const classes = buttonVariants({ variant: "secondary" });

    expect(classes).toContain("border-control-border-l");
    expect(classes).toContain("dark:border-control-border-d");
  });

  it("provides a 44px icon target", () => {
    const classes = buttonVariants({ size: "icon" });

    expect(classes).toContain("h-11");
    expect(classes).toContain("w-11");
  });
});
