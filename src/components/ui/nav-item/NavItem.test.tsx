import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavItem from "./NavItem";

describe("NavItem", () => {
  it("renders link with correct href", () => {
    render(<NavItem href="/test">Test</NavItem>);
    expect(screen.getByRole("link", { name: "Test" })).toHaveAttribute(
      "href",
      "/test",
    );
  });

  it("renders children text", () => {
    render(<NavItem href="/">Home</NavItem>);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("applies target attribute when provided", () => {
    render(
      <NavItem href="/" target="_blank">
        Link
      </NavItem>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });

  it("applies rel attribute when provided", () => {
    render(
      <NavItem href="/" rel="noopener">
        Link
      </NavItem>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("rel", "noopener");
  });

  it("calls onClick when link is clicked", () => {
    const onClick = jest.fn();
    render(
      <NavItem href="/" onClick={onClick}>
        Click
      </NavItem>,
    );
    screen.getByRole("link").click();
    expect(onClick).toHaveBeenCalled();
  });
});
