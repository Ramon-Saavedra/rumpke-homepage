import { render, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useElementWidth } from './useElementWidth';

type ResizeCallback = (entries: ResizeObserverEntry[]) => void;

let observerCallback: ResizeCallback | null = null;
let observeSpy: jest.Mock;
let disconnectSpy: jest.Mock;

beforeEach(() => {
  observeSpy = jest.fn();
  disconnectSpy = jest.fn();
  global.ResizeObserver = jest.fn().mockImplementation((cb: ResizeCallback) => {
    observerCallback = cb;
    return { observe: observeSpy, disconnect: disconnectSpy };
  });
});

afterEach(() => {
  observerCallback = null;
  jest.clearAllMocks();
});

function TestComponent() {
  const { ref, width } = useElementWidth<HTMLDivElement>();
  return <div ref={ref} data-testid="el" data-width={width} />;
}

describe('useElementWidth', () => {
  it('starts with width 0', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('el')).toHaveAttribute('data-width', '0');
  });

  it('attaches ResizeObserver to the element', () => {
    render(<TestComponent />);
    expect(observeSpy).toHaveBeenCalledTimes(1);
  });

  it('updates width when ResizeObserver fires', () => {
    render(<TestComponent />);
    act(() => {
      observerCallback?.([{ contentRect: { width: 300 } } as ResizeObserverEntry]);
    });
    expect(screen.getByTestId('el')).toHaveAttribute('data-width', '300');
  });

  it('disconnects observer on unmount', () => {
    const { unmount } = render(<TestComponent />);
    unmount();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
