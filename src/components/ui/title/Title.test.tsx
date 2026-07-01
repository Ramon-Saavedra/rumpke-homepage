import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Title from "./Title";

describe("Title", () => {
  describe("Rendering", () => {
    it("renders children text", () => {
      render(<Title>Hello</Title>);
      expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    it("defaults to h2", () => {
      render(<Title>Test</Title>);
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("renders h1 when variant is h1", () => {
      render(<Title variant="h1">Test</Title>);
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("renders h3 when variant is h3", () => {
      render(<Title variant="h3">Test</Title>);
      expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    });

    it("renders subtitle when provided", () => {
      render(<Title subtitle="Subtitle text">Test</Title>);
      expect(screen.getByText("Subtitle text")).toBeInTheDocument();
    });

    it("does not render subtitle paragraph when not provided", () => {
      const { container } = render(<Title>Test</Title>);
      expect(container.querySelector("p")).not.toBeInTheDocument();
    });
  });

  describe("Alignment", () => {
    it("applies text-center when align is center", () => {
      render(<Title align="center">Test</Title>);
      expect(screen.getByRole("heading")).toHaveClass("text-center");
    });

    it("applies text-left by default", () => {
      render(<Title>Test</Title>);
      expect(screen.getByRole("heading")).toHaveClass("text-left");
    });

    it("applies text-right when align is right", () => {
      render(<Title align="right">Test</Title>);
      expect(screen.getByRole("heading")).toHaveClass("text-right");
    });
  });

  describe("Size", () => {
    it("applies xl size classes by default", () => {
      render(<Title>Test</Title>);
      expect(screen.getByRole("heading")).toHaveClass("text-2xl");
    });

    it("applies sm size classes", () => {
      render(<Title size="sm">Test</Title>);
      expect(screen.getByRole("heading")).toHaveClass("text-sm");
    });
  });
});
