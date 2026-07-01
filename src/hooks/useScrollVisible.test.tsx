import { render, act, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useScrollVisible } from "./useScrollVisible";

type MockObserverCallback = (
  entries: Partial<IntersectionObserverEntry>[],
) => void;

let observerCallback: MockObserverCallback | null = null;
let observeSpy: jest.Mock;
let disconnectSpy: jest.Mock;

beforeEach(() => {
  observeSpy = jest.fn();
  disconnectSpy = jest.fn();

  global.IntersectionObserver = jest
    .fn()
    .mockImplementation((cb: MockObserverCallback) => {
      observerCallback = cb;
      return {
        observe: observeSpy,
        disconnect: disconnectSpy,
        unobserve: jest.fn(),
      };
    });
});

afterEach(() => {
  observerCallback = null;
  jest.clearAllMocks();
});

function TestSection({ threshold }: { readonly threshold?: number }) {
  const { ref, visible } = useScrollVisible<HTMLElement>({ threshold });
  return (
    <section ref={ref} data-testid="section" data-visible={String(visible)} />
  );
}

describe("useScrollVisible", () => {
  it("starts with visible false", () => {
    render(<TestSection />);
    expect(screen.getByTestId("section")).toHaveAttribute(
      "data-visible",
      "false",
    );
  });

  it("attaches the observer to the element", () => {
    render(<TestSection />);
    expect(observeSpy).toHaveBeenCalledTimes(1);
  });

  it("sets visible to true when element intersects", () => {
    render(<TestSection />);
    act(() => {
      observerCallback?.([
        { isIntersecting: true } as IntersectionObserverEntry,
      ]);
    });
    expect(screen.getByTestId("section")).toHaveAttribute(
      "data-visible",
      "true",
    );
  });

  it("keeps visible false when not intersecting", () => {
    render(<TestSection />);
    act(() => {
      observerCallback?.([
        { isIntersecting: false } as IntersectionObserverEntry,
      ]);
    });
    expect(screen.getByTestId("section")).toHaveAttribute(
      "data-visible",
      "false",
    );
  });

  it("disconnects observer after becoming visible", () => {
    render(<TestSection />);
    act(() => {
      observerCallback?.([
        { isIntersecting: true } as IntersectionObserverEntry,
      ]);
    });
    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });

  it("disconnects observer on unmount", () => {
    const { unmount } = render(<TestSection />);
    unmount();
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it("uses default threshold of 0.1", () => {
    render(<TestSection />);
    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.1 },
    );
  });

  it("uses custom threshold when provided", () => {
    render(<TestSection threshold={0.5} />);
    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.5 },
    );
  });
});
