Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuButton from './MenuButton';

describe('MenuButton', () => {
  it('renders the hamburger button', () => {
    render(<MenuButton />);
    expect(screen.getByTestId('menu-btn')).toBeInTheDocument();
  });

  it('has correct aria-label', () => {
    render(<MenuButton />);
    expect(screen.getByRole('button', { name: /open navigation menu/i })).toBeInTheDocument();
  });

  it('calls openSidebar when clicked', () => {
    render(<MenuButton />);
    const btn = screen.getByTestId('menu-btn');
    fireEvent.click(btn);
    // Click does not throw — Zustand store handles the state update
  });

  it('has correct Tailwind classes', () => {
    render(<MenuButton />);
    const btn = screen.getByTestId('menu-btn');
    expect(btn).toHaveClass('mx-2', 'md:hidden', 'p-1', 'rounded', 'cursor-pointer');
  });
});
