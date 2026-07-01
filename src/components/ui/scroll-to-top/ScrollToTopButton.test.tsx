import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ScrollToTopButton from "./ScrollToTopButton";

beforeEach(() => {
  Object.defineProperty(window, "scrollY", {
    value: 0,
    writable: true,
    configurable: true,
  });
  window.scrollTo = jest.fn();
});

describe("ScrollToTopButton", () => {
  it("renders the button", () => {
    render(<ScrollToTopButton />);
    expect(
      screen.getByRole("button", { name: "Scroll to top" }),
    ).toBeInTheDocument();
  });

  it("starts hidden with opacity-0", () => {
    render(<ScrollToTopButton />);
    expect(screen.getByRole("button")).toHaveClass("opacity-0");
  });

  it("becomes visible after scrolling past 200px", () => {
    render(<ScrollToTopButton />);
    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 300,
        writable: true,
        configurable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(screen.getByRole("button")).toHaveClass("opacity-100");
  });

  it("goes back to hidden when scrolled back up", () => {
    render(<ScrollToTopButton />);
    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 300,
        writable: true,
        configurable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });
    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 50,
        writable: true,
        configurable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(screen.getByRole("button")).toHaveClass("opacity-0");
  });

  it("calls window.scrollTo on click", () => {
    render(<ScrollToTopButton />);
    fireEvent.click(screen.getByRole("button"));
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
