import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders children", () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: "Click me" }),
      ).toBeInTheDocument();
    });

    it("defaults to primary variant", () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-primary");
    });

    it("applies secondary variant classes", () => {
      render(<Button variant="secondary">Test</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-bgSecondary-l");
    });

    it("applies danger variant classes", () => {
      render(<Button variant="danger">Test</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-red-600");
    });
  });

  describe("Behavior", () => {
    it("calls onClick handler when clicked", () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick}>Click</Button>);
      fireEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("is disabled when disabled prop is set", () => {
      render(<Button disabled>Test</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("applies custom className", () => {
      render(<Button className="custom-class">Test</Button>);
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
  });
});
