jest.mock('@/components/features/contact-buttom/ContactTooltip', () => {
  return function MockContactTooltip() {
    return <div data-testid="contact-tooltip">ContactTooltip</div>;
  };
});

interface MockNavItemProps {
  href: string;
  children: React.ReactNode;
}

jest.mock('@/components/ui/nav-item/NavItem', () => {
  return function MockNavItem({ href, children }: MockNavItemProps) {
    return (
      <a href={href} data-testid="nav-item">
        {children}
      </a>
    );
  };
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryNav from '@/components/layout/category-nav/CategoryNav';

describe('CategoryNav', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      render(<CategoryNav />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('renders all navigation items', () => {
      render(<CategoryNav />);
      const navItems = screen.getAllByTestId('nav-item');
      expect(navItems).toHaveLength(6);
    });

    it('renders navigation items with correct text', () => {
      render(<CategoryNav />);
      expect(screen.getByText('Häuser')).toBeInTheDocument();
      expect(screen.getByText('Wohnungen')).toBeInTheDocument();
      expect(screen.getByText('Gewerbeimmobilien')).toBeInTheDocument();
      expect(screen.getByText('Grundstück')).toBeInTheDocument();
      expect(screen.getByText('Kontakt')).toBeInTheDocument();
      expect(screen.getByText('Werde Tippgeber')).toBeInTheDocument();
    });

    it('renders ContactTooltip component', () => {
      render(<CategoryNav />);
      expect(screen.getByTestId('contact-tooltip')).toBeInTheDocument();
    });
  });

  describe('Navigation links', () => {
    it('Häuser has correct href', () => {
      render(<CategoryNav />);
      const link = screen.getByText('Häuser').closest('a');
      expect(link).toHaveAttribute('href', '/kategorie/haeuser');
    });

    it('Wohnungen has correct href', () => {
      render(<CategoryNav />);
      const link = screen.getByText('Wohnungen').closest('a');
      expect(link).toHaveAttribute('href', '/kategorie/wohnungen');
    });

    it('Gewerbeimmobilien has correct href', () => {
      render(<CategoryNav />);
      const link = screen.getByText('Gewerbeimmobilien').closest('a');
      expect(link).toHaveAttribute('href', '/kategorie/gewerbeimmobilien');
    });

    it('Grundstück has correct href', () => {
      render(<CategoryNav />);
      const link = screen.getByText('Grundstück').closest('a');
      expect(link).toHaveAttribute('href', '/kategorie/grundstueck');
    });

    it('Kontakt has correct href', () => {
      render(<CategoryNav />);
      const link = screen.getByText('Kontakt').closest('a');
      expect(link).toHaveAttribute('href', '/kontakt');
    });

    it('Werde Tippgeber has correct href', () => {
      render(<CategoryNav />);
      const link = screen.getByText('Werde Tippgeber').closest('a');
      expect(link).toHaveAttribute('href', 'https://www.ichschenkedirwas.de/');
    });
  });

  describe('Layout and styling', () => {
    it('has hidden class for mobile and flex for desktop', () => {
      render(<CategoryNav />);
      const container = document.querySelector('.hidden.md\\:flex');
      expect(container).toBeInTheDocument();
    });

    it('has sticky positioning classes', () => {
      render(<CategoryNav />);
      const container = document.querySelector('.sticky');
      expect(container).toBeInTheDocument();
    });

    it('has correct background color classes', () => {
      render(<CategoryNav />);
      const container = document.querySelector('.bg-secondary.dark\\:bg-secondary-dark');
      expect(container).toBeInTheDocument();
    });

    it('navigation items container has max-width constraint', () => {
      render(<CategoryNav />);
      const navContainer = document.querySelector('.max-w-xl');
      expect(navContainer).toBeInTheDocument();
    });

    it('ContactTooltip is positioned correctly', () => {
      render(<CategoryNav />);
      const tooltipContainer = screen.getByTestId('contact-tooltip').parentElement;
      expect(tooltipContainer).toHaveClass('mr-4');
    });
  });

  describe('Structure', () => {
    it('has proper semantic structure with navigation container', () => {
      render(<CategoryNav />);
      const navItems = screen.getAllByTestId('nav-item');
      const container = navItems[0].closest('div');

      expect(container).toBeInTheDocument();
    });

    it('ContactTooltip is separate from navigation items', () => {
      render(<CategoryNav />);
      const tooltip = screen.getByTestId('contact-tooltip');
      const navItems = screen.getAllByTestId('nav-item');

      expect(tooltip).toBeInTheDocument();
      expect(navItems).toHaveLength(6);
    });
  });
});
