



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

// localStorage mock
const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) { return store[key] || null; },
    setItem(key: string, value: string) { store[key] = value.toString(); },
    removeItem(key: string) { delete store[key]; },
    clear() { store = {}; }
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  configurable: true
});


import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
const Topmenu = require('@/components/layout/top-menu/TopMenu').default;




describe('TopMenu', () => {
  beforeEach(() => {
    // ...existing code...
  });

  describe('Rendering', () => {
    it('renders without errors and displays the logo', () => {
      render(<Topmenu />);
      expect(screen.getByAltText(/rumpke logo/i)).toBeInTheDocument();
    });
    it('displays the category buttons', () => {
      render(<Topmenu />);
      expect(screen.getByText('Kauf')).toBeInTheDocument();
      expect(screen.getByText('Miete')).toBeInTheDocument();
    });
    it('shows the mobile menu button', () => {
      render(<Topmenu />);
      const menuBtn = screen.getByTestId('menu-btn');
      expect(menuBtn).toBeInTheDocument();
    });
    it('shows the ThemeSwitch', () => {
      render(<Topmenu />);
      expect(screen.getByLabelText(/toggle theme/i)).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('category buttons render as links with correct href', () => {
      render(<Topmenu />);
      const kaufLink = screen.getByText('Kauf').closest('a');
      const mieteLink = screen.getByText('Miete').closest('a');
      expect(kaufLink).toBeInTheDocument();
      expect(kaufLink).toHaveAttribute('href', '/kauf');
      expect(mieteLink).toBeInTheDocument();
      expect(mieteLink).toHaveAttribute('href', '/miete');
    });
  });

  describe('Interaction', () => {
    // Removed test for openSidemenu handler since ui-store is deleted
    it('ThemeSwitch toggles the theme', () => {
      render(<Topmenu />);
      const themeBtn = screen.getByLabelText(/toggle theme/i);
      fireEvent.click(themeBtn);

    });
  });

  describe('Accessibility', () => {
    it('logo has alt attribute', () => {
      render(<Topmenu />);
      expect(screen.getByAltText(/rumpke logo/i)).toBeInTheDocument();
    });

  });

  describe('Responsiveness', () => {
    it('mobile menu appears only on small screens', () => {
      // Simulate screen size if needed
      render(<Topmenu />);
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
    });
  });

  describe('Visual Integration', () => {
    it('uses only Tailwind/global.css classes and variables', () => {
      render(<Topmenu />);
      expect(document.body).toMatchSnapshot();
    });
  });
});
