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

      expect(screen.getByText('Auf Karte erkunden')).toBeInTheDocument();
      expect(screen.getByText('Haus')).toBeInTheDocument();
      expect(screen.getByText('Wohnung')).toBeInTheDocument();
      expect(screen.getByText('Gewerbeimmobilien')).toBeInTheDocument();
      expect(screen.getByText('Grundstück')).toBeInTheDocument();
      expect(screen.getByText('Sonstige')).toBeInTheDocument();
    });

    it('renders ContactTooltip component', () => {
      render(<CategoryNav />);
      expect(screen.getByTestId('contact-tooltip')).toBeInTheDocument();
    });
  });

  describe('Navigation links', () => {
    it('Auf Karte erkunden has correct href', () => {
      render(<CategoryNav />);
      const link = screen.getByText('Auf Karte erkunden').closest('a');
      expect(link).toHaveAttribute('href', '/auf-karte-erkunden');
    });

    it('Haus has correct href', () => {
      render(<CategoryNav />);
      const link = screen.getByText('Haus').closest('a');
      expect(link).toHaveAttribute('href', '/kategorie/haus');
    });

    it('Wohnung has correct href', () => {
      render(<CategoryNav />);
      const link = screen.getByText('Wohnung').closest('a');
      expect(link).toHaveAttribute('href', '/kategorie/wohnung');
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

    it('Sonstige has correct href', () => {
      render(<CategoryNav />);
      const link = screen.getByText('Sonstige').closest('a');
      expect(link).toHaveAttribute('href', '/kategorie/sonstige');
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
