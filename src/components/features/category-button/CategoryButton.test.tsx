import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoryButton from "./CategoryButton";

describe("CategoryButton", () => {
  it("renders link with correct href", () => {
    render(<CategoryButton name="Häuser" href="/kategorie/haeuser" />);
    expect(screen.getByRole("link", { name: "Häuser" })).toHaveAttribute(
      "href",
      "/kategorie/haeuser",
    );
  });

  it("renders name text", () => {
    render(<CategoryButton name="Wohnungen" href="/kategorie/wohnungen" />);
    expect(screen.getByText("Wohnungen")).toBeInTheDocument();
  });

  it("applies color class when provided", () => {
    render(<CategoryButton name="Test" href="/" color="bg-primary" />);
    expect(screen.getByRole("link")).toHaveClass("bg-primary");
  });

  it("applies custom className when provided", () => {
    render(<CategoryButton name="Test" href="/" className="my-class" />);
    expect(screen.getByRole("link")).toHaveClass("my-class");
  });
});
