import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PageContainer from "./PageContainer";

describe("PageContainer", () => {
  it("renders children", () => {
    render(
      <PageContainer>
        <p>content</p>
      </PageContainer>,
    );
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("applies default max-w-7xl to the inner container", () => {
    const { container } = render(
      <PageContainer>
        <p>content</p>
      </PageContainer>,
    );
    const outer = container.firstElementChild;
    const inner = outer!.querySelector("div");
    expect(inner).toHaveClass("max-w-7xl");
  });

  it("merges custom className on the outer wrapper", () => {
    const { container } = render(
      <PageContainer className="custom-class">
        <p>content</p>
      </PageContainer>,
    );
    const outer = container.firstElementChild;
    expect(outer).toHaveClass("custom-class");
  });

  it("renders with the specified element type", () => {
    render(
      <PageContainer as="section">
        <p>content</p>
      </PageContainer>,
    );
    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
