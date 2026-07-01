import { render, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTypewriter } from './useTypewriter';

function TestComponent({
  phrases,
  options = {},
}: {
  readonly phrases: readonly string[];
  readonly options?: Parameters<typeof useTypewriter>[1];
}) {
  const text = useTypewriter(phrases, options);
  return <span data-testid="output">{text}</span>;
}

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('useTypewriter', () => {
  it('starts with empty string', () => {
    render(<TestComponent phrases={['Hello']} />);
    expect(screen.getByTestId('output')).toHaveTextContent('');
  });

  it('types first character after typingSpeed ms', () => {
    render(<TestComponent phrases={['Hi']} options={{ typingSpeed: 100 }} />);
    act(() => { jest.advanceTimersByTime(100); });
    expect(screen.getByTestId('output')).toHaveTextContent('H');
  });

  it('types full word over time', () => {
    render(<TestComponent phrases={['Hi']} options={{ typingSpeed: 100 }} />);
    act(() => { jest.advanceTimersByTime(100); });
    act(() => { jest.advanceTimersByTime(100); });
    expect(screen.getByTestId('output')).toHaveTextContent('Hi');
  });

  it('returns empty string for empty phrases array', () => {
    render(<TestComponent phrases={[]} />);
    act(() => { jest.advanceTimersByTime(500); });
    expect(screen.getByTestId('output')).toHaveTextContent('');
  });

  it('starts erasing after pauseAfterType', () => {
    render(<TestComponent phrases={['Hi']} options={{ typingSpeed: 50, pauseAfterType: 100, erasingSpeed: 50 }} />);
    act(() => { jest.advanceTimersByTime(50 * 2 + 100 + 50); });
    expect(screen.getByTestId('output').textContent!.length).toBeLessThan(2);
  });
});
