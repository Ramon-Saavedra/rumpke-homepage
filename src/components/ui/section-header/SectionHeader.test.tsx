import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SectionHeader from './SectionHeader';

describe('SectionHeader', () => {
  it('renders title as h2', () => {
    render(<SectionHeader title="Test Title" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Test Title' })).toBeInTheDocument();
  });

  it('renders eyebrow when provided', () => {
    render(<SectionHeader title="Title" eyebrow="Eyebrow text" />);
    expect(screen.getByText('Eyebrow text')).toBeInTheDocument();
  });

  it('does not render eyebrow when not provided', () => {
    render(<SectionHeader title="Title" />);
    expect(screen.queryByText('Eyebrow text')).not.toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<SectionHeader title="Title" subtitle="Subtitle text" />);
    expect(screen.getByText('Subtitle text')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const { container } = render(<SectionHeader title="Title" />);
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('sets id on heading when titleId provided', () => {
    render(<SectionHeader title="Title" titleId="my-id" />);
    expect(screen.getByRole('heading')).toHaveAttribute('id', 'my-id');
  });

  it('applies text-center class when align is center', () => {
    const { container } = render(<SectionHeader title="Title" align="center" />);
    expect(container.firstChild).toHaveClass('text-center');
  });

  it('applies text-left class by default', () => {
    const { container } = render(<SectionHeader title="Title" />);
    expect(container.firstChild).toHaveClass('text-left');
  });
});
