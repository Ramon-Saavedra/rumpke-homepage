import type { ReactNode, MouseEventHandler } from 'react';

jest.mock('framer-motion', () => {
  interface MotionButtonProps {
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    'aria-pressed'?: boolean;
    'aria-label'?: string;
    initial?: unknown;
    animate?: unknown;
    transition?: unknown;
  }
  interface MotionSpanProps {
    children?: ReactNode;
    className?: string;
    initial?: unknown;
    animate?: unknown;
    transition?: unknown;
  }
  return {
    motion: {
      button: ({ children, onClick, className, type, 'aria-pressed': ariaPressed, 'aria-label': ariaLabel }: MotionButtonProps) => (
        <button onClick={onClick} className={className} type={type} aria-pressed={ariaPressed} aria-label={ariaLabel}>
          {children}
        </button>
      ),
      span: ({ children, className }: MotionSpanProps) => (
        <span className={className}>{children}</span>
      ),
    },
  };
});

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StepNode } from './StepNode';
import { PROCESS_STEPS } from './processSteps';

const step = PROCESS_STEPS[0]!;
const mockOnSelect = jest.fn();

beforeEach(() => mockOnSelect.mockClear());

describe('StepNode', () => {
  describe('Rendering', () => {
    it('renders a button element', () => {
      render(<StepNode step={step} index={0} isActive={false} onSelect={mockOnSelect} inView={true} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders the step label', () => {
      render(<StepNode step={step} index={0} isActive={false} onSelect={mockOnSelect} inView={true} />);
      expect(screen.getAllByText(step.label).length).toBeGreaterThanOrEqual(1);
    });

    it('renders the step title', () => {
      render(<StepNode step={step} index={0} isActive={false} onSelect={mockOnSelect} inView={true} />);
      expect(screen.getByText(step.title)).toBeInTheDocument();
    });

    it('has aria-label set to step title', () => {
      render(<StepNode step={step} index={0} isActive={false} onSelect={mockOnSelect} inView={true} />);
      expect(screen.getByRole('button', { name: step.title })).toBeInTheDocument();
    });
  });

  describe('Active state', () => {
    it('has aria-pressed false when not active', () => {
      render(<StepNode step={step} index={0} isActive={false} onSelect={mockOnSelect} inView={true} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    });

    it('has aria-pressed true when active', () => {
      render(<StepNode step={step} index={0} isActive={true} onSelect={mockOnSelect} inView={true} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });

    it('renders pulse span when active', () => {
      const { container } = render(
        <StepNode step={step} index={0} isActive={true} onSelect={mockOnSelect} inView={true} />
      );
      expect(container.querySelector('button span')).toBeInTheDocument();
    });

    it('does not render pulse span when not active', () => {
      const { container } = render(
        <StepNode step={step} index={0} isActive={false} onSelect={mockOnSelect} inView={true} />
      );
      expect(container.querySelector('button span')).not.toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls onSelect with the step id on click', () => {
      render(<StepNode step={step} index={0} isActive={false} onSelect={mockOnSelect} inView={true} />);
      fireEvent.click(screen.getByRole('button'));
      expect(mockOnSelect).toHaveBeenCalledWith(step.id);
    });

    it('calls onSelect exactly once per click', () => {
      render(<StepNode step={step} index={0} isActive={false} onSelect={mockOnSelect} inView={true} />);
      fireEvent.click(screen.getByRole('button'));
      expect(mockOnSelect).toHaveBeenCalledTimes(1);
    });
  });
});
