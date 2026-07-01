import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeSwitch } from "./ThemeSwitsh";

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark");
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("ThemeSwitch", () => {
  it("renders the toggle button after mount", () => {
    render(<ThemeSwitch />);
    expect(
      screen.getByRole("button", { name: /toggle theme/i }),
    ).toBeInTheDocument();
  });

  it("toggles to dark mode on click", () => {
    render(<ThemeSwitch />);
    fireEvent.click(screen.getByRole("button"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("toggles back to light mode on second click", () => {
    render(<ThemeSwitch />);
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("reads dark theme from localStorage on mount", () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
    render(<ThemeSwitch />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
