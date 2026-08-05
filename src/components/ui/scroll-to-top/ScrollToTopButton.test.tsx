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
    expect(screen.getByRole("button", { hidden: true })).toHaveAttribute(
      "aria-label",
      "Nach oben scrollen",
    );
  });

  it("starts hidden and outside the tab order", () => {
    render(<ScrollToTopButton />);
    const button = screen.getByRole("button", { hidden: true });
    expect(button).toHaveClass("opacity-0");
    expect(button).toHaveClass("cursor-pointer");
    expect(button).toHaveAttribute("tabindex", "-1");
    expect(button).toHaveAttribute("aria-hidden", "true");
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
    expect(screen.getByRole("button", { hidden: true })).toHaveClass(
      "opacity-0",
    );
  });

  it("calls window.scrollTo on click", () => {
    render(<ScrollToTopButton />);
    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 300,
        writable: true,
        configurable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });
    fireEvent.click(screen.getByRole("button"));
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("disables smooth scrolling when reduced motion is preferred", () => {
    const matchMedia = jest.spyOn(window, "matchMedia").mockImplementation(
      (query) =>
        ({
          matches: true,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }) as MediaQueryList,
    );
    render(<ScrollToTopButton />);
    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 300,
        writable: true,
        configurable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    fireEvent.click(screen.getByRole("button"));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
    matchMedia.mockRestore();
  });
});
