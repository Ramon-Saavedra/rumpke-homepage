jest.mock('lucide-react', () => ({
  Home: () => <svg data-testid="icon-home" />,
  MapPin: () => <svg data-testid="icon-mappin" />,
}));

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyCard from './PropertyCard';

const defaultProps = {
  slug: 'test-property',
  title: 'Schönes Haus',
  type: 'Haus',
  price: '250.000 €',
  location: 'Bawinkel',
  imageUrl: '/images/test.jpg',
};

describe('PropertyCard', () => {
  describe('Rendering', () => {
    it('renders title as heading', () => {
      render(<PropertyCard {...defaultProps} />);
      expect(screen.getByRole('heading', { name: 'Schönes Haus' })).toBeInTheDocument();
    });

    it('renders price', () => {
      render(<PropertyCard {...defaultProps} />);
      expect(screen.getByText('250.000 €')).toBeInTheDocument();
    });

    it('renders location', () => {
      render(<PropertyCard {...defaultProps} />);
      expect(screen.getByText('Bawinkel')).toBeInTheDocument();
    });

    it('renders type badge', () => {
      render(<PropertyCard {...defaultProps} />);
      expect(screen.getByText('Haus')).toBeInTheDocument();
    });

    it('links to correct property page', () => {
      render(<PropertyCard {...defaultProps} />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/object/test-property');
    });
  });

  describe('Optional fields', () => {
    it('renders rooms when provided', () => {
      render(<PropertyCard {...defaultProps} rooms={4} />);
      expect(screen.getByText('4 Zimmer')).toBeInTheDocument();
    });

    it('renders area when provided', () => {
      render(<PropertyCard {...defaultProps} area="120 m²" />);
      expect(screen.getByText('120 m²')).toBeInTheDocument();
    });

    it('renders Kaufen badge for kauf operation', () => {
      render(<PropertyCard {...defaultProps} operationType="kauf" />);
      expect(screen.getByText('Kaufen')).toBeInTheDocument();
    });

    it('renders Mieten badge for miete operation', () => {
      render(<PropertyCard {...defaultProps} operationType="miete" />);
      expect(screen.getByText('Mieten')).toBeInTheDocument();
    });

    it('does not render operation badge when operationType is not provided', () => {
      render(<PropertyCard {...defaultProps} />);
      expect(screen.queryByText('Kaufen')).not.toBeInTheDocument();
      expect(screen.queryByText('Mieten')).not.toBeInTheDocument();
    });
  });
});
