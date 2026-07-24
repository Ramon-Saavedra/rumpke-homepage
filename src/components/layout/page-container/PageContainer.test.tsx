import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PageContainer from './PageContainer';

describe('PageContainer', () => {
  it('renders children', () => {
    render(<PageContainer><p>content</p></PageContainer>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('applies default max-w-5xl class', () => {
    const { container } = render(<PageContainer><p>content</p></PageContainer>);
    const div = container.firstElementChild;
    expect(div).toHaveClass('max-w-5xl');
  });

  it('merges custom className', () => {
    const { container } = render(
      <PageContainer className="custom-class"><p>content</p></PageContainer>,
    );
    const div = container.firstElementChild;
    expect(div).toHaveClass('custom-class');
  });
});
