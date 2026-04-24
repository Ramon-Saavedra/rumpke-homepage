interface MockTitleProps {
  children: React.ReactNode;
  variant?: string;
  size?: string;
  align?: string;
  className?: string;
}

jest.mock('@/components/ui/title/Title', () => {
  return function MockTitle({ children }: MockTitleProps) {
    return <h2 data-testid="title">{children}</h2>;
  };
});

jest.mock('lucide-react', () => ({
  Home: () => <svg data-testid="home-icon" />,
  Key: () => <svg data-testid="key-icon" />,
  Building2: () => <svg data-testid="building2-icon" />,
  ArrowRight: () => <svg data-testid="arrow-icon" />,
}));

import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServicesSection from './ServicesSection';

const getServiceLink = (href: string) => {
  const links = screen.getAllByRole('link');
  return links.find((link) => link.getAttribute('href') === href);
};

describe('ServicesSection', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      render(<ServicesSection />);
      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders main title', () => {
      render(<ServicesSection />);
      expect(screen.getByText('Unsere Leistungen')).toBeInTheDocument();
    });

    it('renders exactly 3 service cards', () => {
      render(<ServicesSection />);
      const links = screen.getAllByRole('link');

      expect(links).toHaveLength(3);
    });

    it('does not render the old service image', () => {
      render(<ServicesSection />);
      expect(screen.queryByAltText('Rumpke Immobilien Dienstleistungen')).not.toBeInTheDocument();
    });
  });

  describe('Overview Rail', () => {
    it('renders exactly 3 numbered overview items', () => {
      render(<ServicesSection />);

      expect(screen.getByText('01')).toBeInTheDocument();
      expect(screen.getByText('02')).toBeInTheDocument();
      expect(screen.getByText('03')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });

    it('renders the overview titles in uppercase', () => {
      render(<ServicesSection />);

      const overviewItems = screen.getAllByRole('listitem');

      expect(within(overviewItems[0]).getByText('Verkaufen')).toHaveClass('uppercase');
      expect(within(overviewItems[1]).getByText('Kaufen')).toHaveClass('uppercase');
      expect(within(overviewItems[2]).getByText('Vermieten')).toHaveClass('uppercase');
    });
  });

  describe('Service Cards Content', () => {
    it('renders "Verkaufen" card with correct content', () => {
      render(<ServicesSection />);

      const verkaufenLink = getServiceLink('/dienstleistungen/verkauf-vermietung');
      expect(verkaufenLink).toBeInTheDocument();
      expect(within(verkaufenLink as HTMLElement).getByRole('heading', { level: 3, name: 'Verkaufen' })).toBeInTheDocument();
      expect(within(verkaufenLink as HTMLElement).getByText('Wir begleiten Sie professionell und transparent beim Verkauf Ihrer Immobilie.')).toBeInTheDocument();
    });

    it('renders "Kaufen" card with correct content', () => {
      render(<ServicesSection />);

      const kaufenLink = getServiceLink('/dienstleistungen/immobilien-kauf');
      expect(kaufenLink).toBeInTheDocument();
      expect(within(kaufenLink as HTMLElement).getByRole('heading', { level: 3, name: 'Kaufen' })).toBeInTheDocument();
      expect(within(kaufenLink as HTMLElement).getByText('Finden Sie mit uns Ihr neues Zuhause oder Ihre nächste Investition.')).toBeInTheDocument();
    });

    it('renders "Vermieten" card with correct content', () => {
      render(<ServicesSection />);

      const vermietenLink = getServiceLink('/dienstleistungen/immobilienbewertung');
      expect(vermietenLink).toBeInTheDocument();
      expect(within(vermietenLink as HTMLElement).getByRole('heading', { level: 3, name: 'Vermieten' })).toBeInTheDocument();
      expect(within(vermietenLink as HTMLElement).getByText('Wir unterstützen Sie bei der erfolgreichen Vermietung Ihrer Immobilie.')).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('renders "Verkaufen" link with correct href', () => {
      render(<ServicesSection />);
      const verkaufenLink = getServiceLink('/dienstleistungen/verkauf-vermietung');
      expect(verkaufenLink).toBeInTheDocument();
      expect(verkaufenLink).toHaveAttribute('href', '/dienstleistungen/verkauf-vermietung');
    });

    it('renders "Kaufen" link with correct href', () => {
      render(<ServicesSection />);
      const kaufenLink = getServiceLink('/dienstleistungen/immobilien-kauf');
      expect(kaufenLink).toBeInTheDocument();
      expect(kaufenLink).toHaveAttribute('href', '/dienstleistungen/immobilien-kauf');
    });

    it('renders "Vermieten" link with correct href', () => {
      render(<ServicesSection />);
      const vermietenLink = getServiceLink('/dienstleistungen/immobilienbewertung');
      expect(vermietenLink).toBeInTheDocument();
      expect(vermietenLink).toHaveAttribute('href', '/dienstleistungen/immobilienbewertung');
    });

    it('renders exactly 3 navigation links', () => {
      render(<ServicesSection />);
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);
    });
  });

  describe('Icons', () => {
    it('renders Home icon for "Verkaufen" service', () => {
      render(<ServicesSection />);
      const homeIcon = screen.getByTestId('home-icon');
      expect(homeIcon).toBeInTheDocument();
    });

    it('renders Key icon for "Kaufen" service', () => {
      render(<ServicesSection />);
      const keyIcon = screen.getByTestId('key-icon');
      expect(keyIcon).toBeInTheDocument();
    });

    it('renders Building2 icon for "Vermieten" service', () => {
      render(<ServicesSection />);
      const buildingIcon = screen.getByTestId('building2-icon');
      expect(buildingIcon).toBeInTheDocument();
    });
  });

  describe('Image', () => {
    it('does not render any image in the redesigned section', () => {
      render(<ServicesSection />);
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('Layout and Structure', () => {
    it('section has correct styling classes', () => {
      render(<ServicesSection />);
      const section = document.querySelector('section');
      expect(section).toHaveClass('w-full', 'mb-12');
    });

    it('renders all service titles in correct order inside the links list', () => {
      render(<ServicesSection />);
      const titles = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);

      expect(titles).toEqual(['Verkaufen', 'Kaufen', 'Vermieten']);
    });

    it('renders services in a responsive grid container', () => {
      render(<ServicesSection />);
      const serviceContainer = screen.getByRole('list').closest('aside')?.parentElement;

      expect(serviceContainer).toBeInTheDocument();
      expect(serviceContainer).toHaveClass(
        'grid',
        'lg:grid-cols-[240px_minmax(0,1fr)]',
        'xl:grid-cols-[260px_minmax(0,1fr)]'
      );
    });
  });

  describe('Content Structure', () => {
    it('each service has a title, description, and link', () => {
      render(<ServicesSection />);

      const verkaufenLink = getServiceLink('/dienstleistungen/verkauf-vermietung');
      expect(verkaufenLink).toBeInTheDocument();
      expect(within(verkaufenLink as HTMLElement).getByRole('heading', { level: 3, name: 'Verkaufen' })).toBeInTheDocument();
      expect(within(verkaufenLink as HTMLElement).getByText(/professionell und transparent beim Verkauf/)).toBeInTheDocument();

      const kaufenLink = getServiceLink('/dienstleistungen/immobilien-kauf');
      expect(kaufenLink).toBeInTheDocument();
      expect(within(kaufenLink as HTMLElement).getByRole('heading', { level: 3, name: 'Kaufen' })).toBeInTheDocument();
      expect(within(kaufenLink as HTMLElement).getByText(/neues Zuhause oder Ihre nächste Investition/)).toBeInTheDocument();

      const vermietenLink = getServiceLink('/dienstleistungen/immobilienbewertung');
      expect(vermietenLink).toBeInTheDocument();
      expect(within(vermietenLink as HTMLElement).getByRole('heading', { level: 3, name: 'Vermieten' })).toBeInTheDocument();
      expect(within(vermietenLink as HTMLElement).getByText(/erfolgreichen Vermietung Ihrer Immobilie/)).toBeInTheDocument();
    });

    it('all service descriptions are present and non-empty', () => {
      render(<ServicesSection />);
      const descriptions = [
        'Wir begleiten Sie professionell und transparent beim Verkauf Ihrer Immobilie.',
        'Finden Sie mit uns Ihr neues Zuhause oder Ihre nächste Investition.',
        'Wir unterstützen Sie bei der erfolgreichen Vermietung Ihrer Immobilie.',
      ];

      descriptions.forEach(desc => {
        expect(screen.getByText(desc)).toBeInTheDocument();
      });
    });
  });

  describe('Service Data Validation', () => {
    it('all service links have unique titles', () => {
      render(<ServicesSection />);
      const links = screen.getAllByRole('link');
      const titles = links.map((link) => {
        const heading = link.querySelector('h3');
        return heading?.textContent;
      });

      expect(titles).toEqual(['Verkaufen', 'Kaufen', 'Vermieten']);
    });

    it('all service links point to /dienstleistungen routes', () => {
      render(<ServicesSection />);
      const links = screen.getAllByRole('link');

      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        const href = link.getAttribute('href');
        expect(href).toMatch(/^\/dienstleistungen\//);
      });
    });

    it('services are rendered in the defined order', () => {
      render(<ServicesSection />);
      const order = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);

      expect(order).toEqual(['Verkaufen', 'Kaufen', 'Vermieten']);
    });
  });
});
