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

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUiStore.mockImplementation(
      (
        selector: (s: {
          isSidebarOpen: boolean;
          closeSidebar: jest.Mock;
        }) => unknown,
      ) => selector({ isSidebarOpen: false, closeSidebar }),
    );
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
    mockUseUiStore.mockImplementation(
      (
        selector: (s: {
          isSidebarOpen: boolean;
          closeSidebar: jest.Mock;
        }) => unknown,
      ) => selector({ isSidebarOpen: true, closeSidebar }),
    );
    render(<Sidebar />);
    expect(screen.getByTestId("sidebar")).toHaveClass("translate-x-0");
  });

  it("calls closeSidebar when close button is clicked", () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByTestId("close-sidebar-btn"));
    expect(closeSidebar).toHaveBeenCalled();
  });

  it("calls closeSidebar when overlay is clicked", () => {
    mockUseUiStore.mockImplementation(
      (
        selector: (s: {
          isSidebarOpen: boolean;
          closeSidebar: jest.Mock;
        }) => unknown,
      ) => selector({ isSidebarOpen: true, closeSidebar }),
    );
    render(<Sidebar />);
    fireEvent.click(screen.getByTestId("sidebar-overlay"));
    expect(closeSidebar).toHaveBeenCalled();
  });

  it("renders navigation links", () => {
    render(<Sidebar />);
    expect(screen.getByRole("link", { name: /start/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /häuser/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /kontakt/i })).toBeInTheDocument();
  });
});
