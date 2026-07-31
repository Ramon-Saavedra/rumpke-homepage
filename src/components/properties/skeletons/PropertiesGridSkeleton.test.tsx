import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertiesGridSkeleton, {
  PROPERTIES_GRID_SKELETON_LABEL,
} from "./PropertiesGridSkeleton";

describe("PropertiesGridSkeleton", () => {
  it("announces the loading state to assistive technology", () => {
    render(<PropertiesGridSkeleton />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent(PROPERTIES_GRID_SKELETON_LABEL);
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("marks the region as busy", () => {
    const { container } = render(<PropertiesGridSkeleton />);
    expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument();
  });

  it("hides the placeholder cards from the accessibility tree", () => {
    const { container } = render(<PropertiesGridSkeleton count={3} />);
    const list = container.querySelector("ul");
    expect(list).toHaveAttribute("aria-hidden", "true");
    expect(list?.querySelectorAll("li")).toHaveLength(3);
  });

  it("renders the requested number of placeholder cards", () => {
    const { container } = render(<PropertiesGridSkeleton count={12} />);
    expect(container.querySelectorAll("article")).toHaveLength(12);
  });

  it("staggers the pulse animation across the first four cards", () => {
    const { container } = render(<PropertiesGridSkeleton count={5} />);
    const cards = Array.from(container.querySelectorAll("article"));
    const delays = cards.map((card) =>
      card.getAttribute("style")?.replace(/\s/g, ""),
    );
    expect(delays).toEqual([
      "--skeleton-delay:0ms;",
      "--skeleton-delay:150ms;",
      "--skeleton-delay:300ms;",
      "--skeleton-delay:450ms;",
      "--skeleton-delay:0ms;",
    ]);
  });

  it("accepts a custom status label", () => {
    render(<PropertiesGridSkeleton label="Ergebnisse werden geladen" />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Ergebnisse werden geladen",
    );
  });

  it("clamps invalid and excessive card counts", () => {
    const { container, rerender } = render(
      <PropertiesGridSkeleton count={-3} />,
    );
    expect(container.querySelectorAll("article")).toHaveLength(0);

    rerender(<PropertiesGridSkeleton count={30} />);
    expect(container.querySelectorAll("article")).toHaveLength(24);
  });

  it("can render without owning a loading region", () => {
    const { container } = render(
      <PropertiesGridSkeleton count={2} withRegion={false} />,
    );
    expect(
      container.querySelector('[aria-busy="true"]'),
    ).not.toBeInTheDocument();
    expect(container.querySelectorAll("article")).toHaveLength(2);
  });
});
