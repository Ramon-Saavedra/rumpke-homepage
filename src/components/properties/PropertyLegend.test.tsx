import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyLegend from './PropertyLegend';

describe('PropertyLegend', () => {
  it('renders without errors', () => {
    render(<PropertyLegend />);
    expect(screen.getByText('Kaufen')).toBeInTheDocument();
    expect(screen.getByText('Mieten')).toBeInTheDocument();
  });

  it('renders the Kaufen label with correct styling', () => {
    render(<PropertyLegend />);
    const kaufen = screen.getByText('Kaufen');
    expect(kaufen).toHaveClass('text-buy');
  });

  it('renders the Mieten label with correct styling', () => {
    render(<PropertyLegend />);
    const mieten = screen.getByText('Mieten');
    expect(mieten).toHaveClass('text-rent');
  });
});
