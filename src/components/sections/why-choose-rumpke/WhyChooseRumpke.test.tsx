jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props: {
    src?: string;
    alt?: string;
    className?: string;
    loading?: 'eager' | 'lazy';
    sizes?: string;
  }) {
    return (
      <img
        src={props.src}
        alt={props.alt}
        className={props.className}
        loading={props.loading}
        sizes={props.sizes}
      />
    );
  },
}));

interface MockTitleProps {
  children: React.ReactNode;
  variant?: string;
  size?: string;
  align?: string;
}

jest.mock('@/components/ui/title/Title', () => {
  return function MockTitle({ children }: MockTitleProps) {
    return <h2 data-testid="title">{children}</h2>;
  };
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WhyChooseRumpke from './WhyChooseRumpke';

describe('WhyChooseRumpke', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      render(<WhyChooseRumpke />);
      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders main title', () => {
      render(<WhyChooseRumpke />);
      expect(screen.getByText('Warum Rumpke Immobilien?')).toBeInTheDocument();
    });

    it('renders exactly 3 feature cards', () => {
      render(<WhyChooseRumpke />);
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(3);
    });
  });

  describe('Feature Cards Content', () => {
    it('renders "Persönlicher Service" card', () => {
      render(<WhyChooseRumpke />);
      expect(screen.getByText('Persönlicher Service')).toBeInTheDocument();
      expect(screen.getByText(/Bei Rumpke Immobilien stehen Sie im Mittelpunkt/)).toBeInTheDocument();
    });

    it('renders "Lokale Expertise" card', () => {
      render(<WhyChooseRumpke />);
      expect(screen.getByText('Lokale Expertise')).toBeInTheDocument();
      expect(screen.getByText(/Unser tiefes Verständnis für den regionalen Immobilienmarkt/)).toBeInTheDocument();
    });

    it('renders "Transparenz & Fairness" card', () => {
      render(<WhyChooseRumpke />);
      expect(screen.getByText('Transparenz & Fairness')).toBeInTheDocument();
      expect(screen.getByText(/Vertrauen ist die Basis unserer Arbeit/)).toBeInTheDocument();
    });
  });

  describe('Images', () => {
    it('renders all three images with correct src', () => {
      render(<WhyChooseRumpke />);
      const image1 = screen.getByAltText('Persönlicher Service');
      const image2 = screen.getByAltText('Lokale Expertise');
      const image3 = screen.getByAltText('Transparenz & Fairness');

      expect(image1).toHaveAttribute('src', '/imgs/why-choose-1.jpg');
      expect(image2).toHaveAttribute('src', '/imgs/why-choose-2.jpg');
      expect(image3).toHaveAttribute('src', '/imgs/why-choose-3.jpg');
    });

    it('all images have lazy loading', () => {
      render(<WhyChooseRumpke />);
      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        expect(img).toHaveAttribute('loading', 'lazy');
      });
    });

    it('all images have correct sizes attribute', () => {
      render(<WhyChooseRumpke />);
      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        expect(img).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 33vw');
      });
    });

    it('all images have opacity-40 class', () => {
      render(<WhyChooseRumpke />);
      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        expect(img).toHaveClass('opacity-40');
      });
    });
  });

  describe('Layout and styling', () => {
    it('has section with border classes', () => {
      render(<WhyChooseRumpke />);
      const section = document.querySelector('section');
      expect(section).toHaveClass('rounded', 'border', 'border-border-l', 'dark:border-border-d');
    });

    it('has section with correct spacing', () => {
      render(<WhyChooseRumpke />);
      const section = document.querySelector('section');
      expect(section).toHaveClass('w-full', 'mb-12');
    });

    it('has grid with responsive columns', () => {
      render(<WhyChooseRumpke />);
      const grid = document.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-3', 'gap-8');
    });

    it('each image container has correct height', () => {
      render(<WhyChooseRumpke />);
      const imageContainers = document.querySelectorAll('.relative.w-full.h-64');
      expect(imageContainers).toHaveLength(3);
    });

    it('each image container has border', () => {
      render(<WhyChooseRumpke />);
      const imageContainers = document.querySelectorAll('.border-3');
      expect(imageContainers).toHaveLength(3);
      imageContainers.forEach((container) => {
        expect(container).toHaveClass('border-secondary', 'dark:border-secondary-dark');
      });
    });
  });

  describe('Content Structure', () => {
    it('renders title with Title component', () => {
      render(<WhyChooseRumpke />);
      const title = screen.getByTestId('title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Warum Rumpke Immobilien?');
    });

    it('feature titles have correct styling classes', () => {
      render(<WhyChooseRumpke />);
      const serviceTitle = screen.getByText('Persönlicher Service');
      expect(serviceTitle.tagName).toBe('H2');
      expect(serviceTitle).toHaveClass('text-lg', 'font-semibold', 'mb-2');
    });

    it('feature descriptions have correct styling', () => {
      render(<WhyChooseRumpke />);
      const description = screen.getByText(/Bei Rumpke Immobilien stehen Sie im Mittelpunkt/).closest('p');
      expect(description).toHaveClass('text-sm', 'leading-relaxed');
    });
  });

  describe('Data Integrity', () => {
    it('all feature cards have unique titles', () => {
      render(<WhyChooseRumpke />);
      const titles = [
        screen.getByText('Persönlicher Service'),
        screen.getByText('Lokale Expertise'),
        screen.getByText('Transparenz & Fairness'),
      ];
      const uniqueTitles = new Set(titles.map(t => t.textContent));
      expect(uniqueTitles.size).toBe(3);
    });

    it('features are rendered in correct order', () => {
      render(<WhyChooseRumpke />);
      const featureTitles = screen.getAllByRole('heading', { level: 2 }).filter(h => h.dataset.testid !== 'title');
      expect(featureTitles[0]).toHaveTextContent('Persönlicher Service');
      expect(featureTitles[1]).toHaveTextContent('Lokale Expertise');
      expect(featureTitles[2]).toHaveTextContent('Transparenz & Fairness');
    });

    it('each feature has complete content structure', () => {
      render(<WhyChooseRumpke />);
      const features = document.querySelectorAll('.flex.flex-col');
      expect(features).toHaveLength(3);

      features.forEach((feature) => {
        const image = feature.querySelector('img');
        const title = feature.querySelector('h2');
        const description = feature.querySelector('p');

        expect(image).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
      });
    });
  });
});
