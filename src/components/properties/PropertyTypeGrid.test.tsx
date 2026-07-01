jest.mock('lucide-react', () => ({
  Home: () => <svg />,
  Building2: () => <svg />,
  Briefcase: () => <svg />,
  Trees: () => <svg />,
  MoreHorizontal: () => <svg />,
}));

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyTypeGrid from './PropertyTypeGrid';

const types = [
  { slug: 'haeuser', label: 'Häuser', description: 'Einfamilienhäuser' },
  { slug: 'wohnungen', label: 'Wohnungen', description: 'Eigentumswohnungen' },
] as const;

describe('PropertyTypeGrid', () => {
  it('renders all type labels', () => {
    render(<PropertyTypeGrid types={types} basePath="kauf" />);
    expect(screen.getByText('Häuser')).toBeInTheDocument();
    expect(screen.getByText('Wohnungen')).toBeInTheDocument();
  });

  it('renders correct links for each type', () => {
    render(<PropertyTypeGrid types={types} basePath="kauf" />);
    expect(screen.getByRole('link', { name: /häuser/i })).toHaveAttribute('href', '/kauf/haeuser');
    expect(screen.getByRole('link', { name: /wohnungen/i })).toHaveAttribute('href', '/kauf/wohnungen');
  });

  it('renders descriptions', () => {
    render(<PropertyTypeGrid types={types} basePath="kauf" />);
    expect(screen.getByText('Einfamilienhäuser')).toBeInTheDocument();
    expect(screen.getByText('Eigentumswohnungen')).toBeInTheDocument();
  });

  it('renders title heading when provided', () => {
    render(<PropertyTypeGrid types={types} basePath="kauf" title="Nach Typ filtern" />);
    expect(screen.getByRole('heading', { name: 'Nach Typ filtern' })).toBeInTheDocument();
  });

  it('does not render heading when title is not provided', () => {
    render(<PropertyTypeGrid types={types} basePath="kauf" />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('uses miete basePath correctly', () => {
    render(<PropertyTypeGrid types={types} basePath="miete" />);
    expect(screen.getByRole('link', { name: /häuser/i })).toHaveAttribute('href', '/miete/haeuser');
  });
});
