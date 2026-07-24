import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeSwitch } from "./ThemeSwitsh";
import { __theme_reset } from "./use-theme";

beforeEach(() => {
  __theme_reset();
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
  it("renders the toggle button", () => {
    render(<ThemeSwitch />);
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });

  it("toggles dark mode on and off", () => {
    render(<ThemeSwitch />);
    const btn = screen.getByRole("button", { name: /toggle theme/i });

    act(() => fireEvent.click(btn));
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    act(() => fireEvent.click(btn));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("reads dark theme from localStorage", () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
    render(<ThemeSwitch />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
