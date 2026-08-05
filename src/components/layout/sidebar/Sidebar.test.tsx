jest.mock("@/store/ui/ui-store", () => ({
  useUiStore: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
}));

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useUiStore } from "@/store/ui/ui-store";
import Sidebar from "./Sidebar";

const mockUseUiStore = useUiStore as unknown as jest.Mock;

describe("Sidebar", () => {
  const closeSidebar = jest.fn();

  const setOpen = (isSidebarOpen: boolean) => {
    mockUseUiStore.mockImplementation(
      (
        selector: (s: {
          isSidebarOpen: boolean;
          closeSidebar: jest.Mock;
        }) => unknown,
      ) => selector({ isSidebarOpen, closeSidebar }),
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setOpen(false);
  });

  it("renders sidebar element", () => {
    render(<Sidebar />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("sidebar is hidden (translate-x-full) when closed", () => {
    render(<Sidebar />);
    expect(screen.getByTestId("sidebar")).toHaveClass("translate-x-full");
  });

  it("sidebar is visible (translate-x-0) when open", () => {
    setOpen(true);
    render(<Sidebar />);
    expect(screen.getByTestId("sidebar")).toHaveClass("translate-x-0");
  });

  it("calls closeSidebar when close button is clicked", () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByTestId("close-sidebar-btn"));
    expect(closeSidebar).toHaveBeenCalled();
  });

  it("calls closeSidebar when overlay is clicked", () => {
    setOpen(true);
    render(<Sidebar />);
    fireEvent.click(screen.getByTestId("sidebar-overlay"));
    expect(closeSidebar).toHaveBeenCalled();
  });

  it("renders navigation links", () => {
    render(<Sidebar />);
    expect(
      screen.getByRole("link", { name: /start/i, hidden: true }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /häuser/i, hidden: true }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /kontakt/i, hidden: true }),
    ).toBeInTheDocument();
  });

  it("is inert while closed", () => {
    render(<Sidebar />);

    expect(screen.getByTestId("sidebar")).toHaveAttribute("inert");
    expect(screen.getByTestId("sidebar")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("focuses the close button and closes on Escape", () => {
    setOpen(true);
    render(<Sidebar />);

    expect(screen.getByTestId("close-sidebar-btn")).toHaveFocus();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(closeSidebar).toHaveBeenCalled();
  });

  it("restores focus after closing", () => {
    const opener = document.createElement("button");
    document.body.appendChild(opener);
    opener.focus();
    setOpen(true);
    const { rerender } = render(<Sidebar />);

    setOpen(false);
    rerender(<Sidebar />);

    expect(opener).toHaveFocus();
    opener.remove();
  });
});
