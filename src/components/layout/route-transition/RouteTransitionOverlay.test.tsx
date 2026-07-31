jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { usePathname, useSearchParams } from "next/navigation";
import RouteTransitionOverlay, {
  ROUTE_TRANSITION_LABEL,
} from "./RouteTransitionOverlay";

const mockUsePathname = usePathname as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

function setRoute(pathname: string, search = "") {
  mockUsePathname.mockReturnValue(pathname);
  mockUseSearchParams.mockReturnValue(new URLSearchParams(search));
  window.history.replaceState({}, "", pathname + (search ? `?${search}` : ""));
}

function clickLink(href: string, attributes: Record<string, string> = {}) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.textContent = "link";
  Object.entries(attributes).forEach(([key, value]) =>
    anchor.setAttribute(key, value),
  );
  document.body.appendChild(anchor);
  act(() => {
    anchor.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
    );
  });
  return anchor;
}

function advance(ms: number) {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
}

function overlay() {
  return document.querySelector(".fixed.inset-0");
}

describe("RouteTransitionOverlay", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    setRoute("/kauf");
    document.body.innerHTML = "";
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders nothing while no navigation is pending", () => {
    render(<RouteTransitionOverlay />);
    expect(overlay()).not.toBeInTheDocument();
  });

  it("shows immediately while navigation is pending", () => {
    render(<RouteTransitionOverlay />);
    clickLink("/kauf/haeuser");

    expect(overlay()).toBeInTheDocument();
    expect(overlay()).toHaveClass("opacity-100", "pointer-events-auto");
  });

  it("announces the branded loading state while navigation is pending", () => {
    render(<RouteTransitionOverlay />);
    clickLink("/kauf/haeuser");

    expect(overlay()).toHaveClass("opacity-100");
    expect(screen.getByRole("status")).toHaveTextContent(
      ROUTE_TRANSITION_LABEL,
    );
    expect(document.querySelector("svg path")).toHaveClass(
      "motion-safe:animate-house-draw",
    );
  });

  it("fades out and unmounts once the destination route is ready", () => {
    const { rerender } = render(<RouteTransitionOverlay />);
    clickLink("/kauf/haeuser");
    advance(300);
    expect(overlay()).toHaveClass("opacity-100");

    setRoute("/kauf/haeuser");
    rerender(<RouteTransitionOverlay />);
    expect(overlay()).toHaveClass("opacity-0", "pointer-events-none");

    advance(250);
    expect(overlay()).not.toBeInTheDocument();
  });

  it("still triggers when the router calls preventDefault, as next/link does", () => {
    render(<RouteTransitionOverlay />);

    const anchor = document.createElement("a");
    anchor.href = "/kauf/haeuser";
    anchor.addEventListener("click", (event) => event.preventDefault());
    document.body.appendChild(anchor);

    act(() => {
      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
      );
    });

    advance(300);
    expect(overlay()).toHaveClass("opacity-100");
  });

  it("ignores clicks with a modifier key held", () => {
    render(<RouteTransitionOverlay />);

    const anchor = document.createElement("a");
    anchor.href = "/kauf/haeuser";
    document.body.appendChild(anchor);

    act(() => {
      anchor.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          button: 0,
          metaKey: true,
        }),
      );
    });

    advance(300);
    expect(overlay()).not.toBeInTheDocument();
  });

  it("ignores links that resolve to the current route", () => {
    render(<RouteTransitionOverlay />);
    clickLink("/kauf");
    advance(300);
    expect(overlay()).not.toBeInTheDocument();
  });

  it("ignores in-page hash links", () => {
    render(<RouteTransitionOverlay />);
    clickLink("/kauf#objekt-anfrage");
    advance(300);
    expect(overlay()).not.toBeInTheDocument();
  });

  it("ignores external links and new-tab links", () => {
    render(<RouteTransitionOverlay />);
    clickLink("https://www.ichschenkedirwas.de/");
    clickLink("/kauf/haeuser", { target: "_blank" });
    clickLink("/kauf/haeuser", { download: "" });
    advance(300);
    expect(overlay()).not.toBeInTheDocument();
  });

  it("clears itself if the navigation never completes", () => {
    render(<RouteTransitionOverlay />);
    clickLink("/kauf/haeuser");
    advance(300);
    expect(overlay()).toHaveClass("opacity-100");

    advance(8000);
    advance(250);
    expect(overlay()).not.toBeInTheDocument();
  });
});
