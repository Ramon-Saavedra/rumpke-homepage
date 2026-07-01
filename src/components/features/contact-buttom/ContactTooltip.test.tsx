jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { usePathname } from "next/navigation";
import ContactTooltip from "./ContactTooltip";

const mockUsePathname = usePathname as jest.Mock;

describe("ContactTooltip", () => {
  it("renders list of social icons on non-admin path", () => {
    mockUsePathname.mockReturnValue("/");
    render(<ContactTooltip />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("returns null on /admin path", () => {
    mockUsePathname.mockReturnValue("/admin");
    const { container } = render(<ContactTooltip />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null on /admin subpath", () => {
    mockUsePathname.mockReturnValue("/admin/dashboard");
    const { container } = render(<ContactTooltip />);
    expect(container.firstChild).toBeNull();
  });

  it("renders Facebook link", () => {
    mockUsePathname.mockReturnValue("/");
    render(<ContactTooltip />);
    expect(screen.getByRole("link", { name: /facebook/i })).toBeInTheDocument();
  });

  it("renders WhatsApp link", () => {
    mockUsePathname.mockReturnValue("/");
    render(<ContactTooltip />);
    expect(screen.getByRole("link", { name: /whatsapp/i })).toBeInTheDocument();
  });

  it("renders Instagram link", () => {
    mockUsePathname.mockReturnValue("/");
    render(<ContactTooltip />);
    expect(
      screen.getByRole("link", { name: /instagram/i }),
    ).toBeInTheDocument();
  });

  it("renders LinkedIn link", () => {
    mockUsePathname.mockReturnValue("/");
    render(<ContactTooltip />);
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
  });

  it("renders 5 social icon links in total", () => {
    mockUsePathname.mockReturnValue("/");
    render(<ContactTooltip />);
    expect(screen.getAllByRole("link")).toHaveLength(5);
  });
});
