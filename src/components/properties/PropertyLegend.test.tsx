import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyLegend from './PropertyLegend';

describe('PropertyLegend', () => {
  it('renders without errors', () => {
    render(<PropertyLegend />);
    expect(screen.getByText('Verkaufen')).toBeInTheDocument();
    expect(screen.getByText('Vermieten')).toBeInTheDocument();
  });

  it('renders the Verkaufen label with correct styling', () => {
    render(<PropertyLegend />);
    const verkaufen = screen.getByText('Verkaufen');
    expect(verkaufen).toHaveClass('text-buy');
  });

  it('renders the Vermieten label with correct styling', () => {
    render(<PropertyLegend />);
    const vermieten = screen.getByText('Vermieten');
    expect(vermieten).toHaveClass('text-rent');
  });
});
