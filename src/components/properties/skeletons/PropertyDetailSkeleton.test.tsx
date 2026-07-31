import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyDetailSkeleton, {
  PROPERTY_DETAIL_SKELETON_LABEL,
} from "./PropertyDetailSkeleton";

describe("PropertyDetailSkeleton", () => {
  it("announces the loading state to assistive technology", () => {
    render(<PropertyDetailSkeleton />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent(PROPERTY_DETAIL_SKELETON_LABEL);
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("marks the region as busy", () => {
    const { container } = render(<PropertyDetailSkeleton />);
    expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument();
  });

  it("exposes no other content to the accessibility tree", () => {
    render(<PropertyDetailSkeleton />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("mirrors the detail layout with a two-column grid", () => {
    const { container } = render(<PropertyDetailSkeleton />);
    expect(
      container.querySelector(".lg\\:grid-cols-\\[2fr_1fr\\]"),
    ).toBeInTheDocument();
  });
});
