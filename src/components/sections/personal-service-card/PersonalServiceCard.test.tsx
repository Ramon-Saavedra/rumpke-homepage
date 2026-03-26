import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonalServiceCard from './PersonalServiceCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'ref'> & { fill?: boolean }) => {
    const { fill, ...rest } = props;
    return <img {...rest} />;
  },
}));

jest.mock('next/link', () => {
  return ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  );
});

jest.mock('@/components/ui/title/Title', () => {
  return function MockTitle(props: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
    return <h2 {...props}>{props.children}</h2>;
  };
});

describe('PersonalServiceCard', () => {
  beforeEach(() => {
    render(<PersonalServiceCard />);
  });

  it('renders the main section with correct classes', () => {
    const section = screen.getByLabelText('Personal Service');
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe('SECTION');
    expect(section).toHaveClass('w-full', 'mb-12', 'rounded', 'border', 'border-border-l', 'dark:border-border-d', 'bg-bgSecondary-l', 'dark:bg-bgSecondary-d', 'shadow-secondary');
  });

  it('renders the main title "Über mich" with correct styles', () => {
    const mainTitle = screen.getByText('Über mich');
    expect(mainTitle).toBeInTheDocument();
    expect(mainTitle).toHaveClass('mb-8', 'py-4', 'px-2', 'rounded');
  });

  it('renders the portrait image with correct attributes', () => {
    const image = screen.getByAltText('Ann-Christin Rumpke Portrait');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/imgs/personal-service-pic.jpeg');
    expect(image).toHaveClass('object-cover', 'rounded', 'border', 'border-border-l', 'dark:border-border-d');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('renders all feature titles and descriptions', () => {
    const features = [
      {
        title: 'Persönlicher Service',
        text: 'Ich nehme mir Zeit für Sie und Ihre individuellen Wünsche. Jeder Kunde wird von einem festen Ansprechpartner betreut, der ihn während des gesamten Prozesses begleitet.'
      },
      {
        title: 'Lokale Expertise',
        text: 'Als erfahrene Immobilienmaklerin kenne ich den regionalen Markt und seine Besonderheiten. Nutzen Sie unser Netzwerk und unser Know-how zu Ihrem Vorteil.'
      },
      {
        title: 'Transparenz und Vertrauen',
        text: 'Bei uns gibt es keine versteckten Kosten. Wir legen Wert auf eine offene Kommunikation und faire Konditionen.'
      }
    ];
    features.forEach(({ title, text }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('renders the "Mehr erfahren" link with correct attributes', () => {
    const link = screen.getByRole('link', { name: 'Mehr erfahren' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/ueber-uns');
    expect(link).toHaveClass('inline-block', 'mt-2', 'px-6', 'py-2', 'bg-primary', 'dark:bg-primary-dark', 'text-white', 'rounded', 'font-semibold', 'shadow');
  });

  it('renders the grid layout for content', () => {
    const grid = document.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('lg:grid-cols-2', 'gap-8', 'items-center');
  });

  it('renders the image container with correct height', () => {
    const imageContainer = document.querySelector('.relative.w-full.max-w-xs.h-100');
    expect(imageContainer).toBeInTheDocument();
  });

  it('renders the content container with correct height', () => {
    const contentContainer = document.querySelector('.flex.flex-col.justify-center.h-100');
    expect(contentContainer).toBeInTheDocument();
  });
});
