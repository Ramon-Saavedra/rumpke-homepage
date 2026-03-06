jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props: {
    src?: string;
    alt?: string;
    className?: string;
    loading?: 'eager' | 'lazy';
    sizes?: string;
    fill?: boolean;
  }) {
    const { fill, ...imgProps } = props;
    void fill;
    return <img {...imgProps} />;
  },
}));

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
}));

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServicesSection from './ServicesSection';

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
      const verkaufenCard = screen.getByText('Verkaufen');
      const kaufenCard = screen.getByText('Kaufen');
      const vermietenCard = screen.getByText('Vermieten');

      expect(verkaufenCard).toBeInTheDocument();
      expect(kaufenCard).toBeInTheDocument();
      expect(vermietenCard).toBeInTheDocument();
    });

    it('renders service image', () => {
      render(<ServicesSection />);
      const image = screen.getByAltText('Rumpke Immobilien Dienstleistungen');
      expect(image).toBeInTheDocument();
    });
  });

  describe('Service Cards Content', () => {
    it('renders "Verkaufen" card with correct content', () => {
      render(<ServicesSection />);
      expect(screen.getByText('Verkaufen')).toBeInTheDocument();
      expect(
        screen.getByText('Wir begleiten Sie professionell und transparent beim Verkauf Ihrer Immobilie.')
      ).toBeInTheDocument();
    });

    it('renders "Kaufen" card with correct content', () => {
      render(<ServicesSection />);
      expect(screen.getByText('Kaufen')).toBeInTheDocument();
      expect(
        screen.getByText('Finden Sie mit uns Ihr neues Zuhause oder Ihre nächste Investition.')
      ).toBeInTheDocument();
    });

    it('renders "Vermieten" card with correct content', () => {
      render(<ServicesSection />);
      expect(screen.getByText('Vermieten')).toBeInTheDocument();
      expect(
        screen.getByText('Wir unterstützen Sie bei der erfolgreichen Vermietung Ihrer Immobilie.')
      ).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('renders "Verkaufen" link with correct href', () => {
      render(<ServicesSection />);
      const links = screen.getAllByRole('link');
      const verkaufenLink = links.find(link => link.getAttribute('href') === '/dienstleistungen/verkauf-vermietung');
      expect(verkaufenLink).toBeInTheDocument();
      expect(verkaufenLink).toHaveAttribute('href', '/dienstleistungen/verkauf-vermietung');
    });

    it('renders "Kaufen" link with correct href', () => {
      render(<ServicesSection />);
      const links = screen.getAllByRole('link');
      const kaufenLink = links.find(link => link.getAttribute('href') === '/dienstleistungen/immobilien-kauf');
      expect(kaufenLink).toBeInTheDocument();
      expect(kaufenLink).toHaveAttribute('href', '/dienstleistungen/immobilien-kauf');
    });

    it('renders "Vermieten" link with correct href', () => {
      render(<ServicesSection />);
      const links = screen.getAllByRole('link');
      const vermietenLink = links.find(link => link.getAttribute('href') === '/dienstleistungen/immobilienbewertung');
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
    it('renders image with correct src', () => {
      render(<ServicesSection />);
      const image = screen.getByAltText('Rumpke Immobilien Dienstleistungen');
      expect(image).toHaveAttribute('src', '/imgs/service-section-pic.jpg');
    });

    it('image has lazy loading', () => {
      render(<ServicesSection />);
      const image = screen.getByAltText('Rumpke Immobilien Dienstleistungen');
      expect(image).toHaveAttribute('loading', 'lazy');
    });

    it('image has correct sizes attribute', () => {
      render(<ServicesSection />);
      const image = screen.getByAltText('Rumpke Immobilien Dienstleistungen');
      expect(image).toHaveAttribute('sizes', '(max-width: 1024px) 100vw, 50vw');
    });
  });

  describe('Layout and Structure', () => {
    it('section has correct styling classes', () => {
      render(<ServicesSection />);
      const section = document.querySelector('section');
      expect(section).toHaveClass('w-full', 'mb-12');
    });

    it('renders all service titles in correct order', () => {
      render(<ServicesSection />);
      const titles = screen.getAllByText(/Verkaufen|Kaufen|Vermieten/);
      expect(titles[0]).toHaveTextContent('Verkaufen');
      expect(titles[1]).toHaveTextContent('Kaufen');
      expect(titles[2]).toHaveTextContent('Vermieten');
    });

    it('renders services in a flex container', () => {
      render(<ServicesSection />);
      const serviceContainer = document.querySelector('.flex.flex-col.lg\\:flex-row');
      expect(serviceContainer).toBeInTheDocument();
    });
  });

  describe('Content Structure', () => {
    it('each service has a title, description, and link', () => {
      render(<ServicesSection />);
      const links = screen.getAllByRole('link');

      expect(screen.getByText('Verkaufen')).toBeInTheDocument();
      expect(screen.getByText(/professionell und transparent beim Verkauf/)).toBeInTheDocument();
      const verkaufenLink = links.find(link => link.getAttribute('href') === '/dienstleistungen/verkauf-vermietung');
      expect(verkaufenLink).toBeInTheDocument();

      expect(screen.getByText('Kaufen')).toBeInTheDocument();
      expect(screen.getByText(/neues Zuhause oder Ihre nächste Investition/)).toBeInTheDocument();
      const kaufenLink = links.find(link => link.getAttribute('href') === '/dienstleistungen/immobilien-kauf');
      expect(kaufenLink).toBeInTheDocument();

      expect(screen.getByText('Vermieten')).toBeInTheDocument();
      expect(screen.getByText(/erfolgreichen Vermietung Ihrer Immobilie/)).toBeInTheDocument();
      const vermietenLink = links.find(link => link.getAttribute('href') === '/dienstleistungen/immobilienbewertung');
      expect(vermietenLink).toBeInTheDocument();
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
    it('all services have unique titles', () => {
      render(<ServicesSection />);
      const verkaufen = screen.getAllByText('Verkaufen');
      const kaufen = screen.getAllByText('Kaufen');
      const vermieten = screen.getAllByText('Vermieten');

      expect(verkaufen).toHaveLength(1);
      expect(kaufen).toHaveLength(1);
      expect(vermieten).toHaveLength(1);
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
      const serviceTexts = screen.getAllByText(/Verkaufen|Kaufen|Vermieten/);
      const order = serviceTexts.map(el => el.textContent);

      expect(order).toEqual(['Verkaufen', 'Kaufen', 'Vermieten']);
    });
  });
});
