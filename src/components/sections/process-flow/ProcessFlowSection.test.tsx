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
  interface MotionDivProps {
    children?: ReactNode;
    className?: string;
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    transition?: unknown;
  }
  interface MotionPathProps {
    d?: string;
    fill?: string;
    strokeWidth?: string;
    className?: string;
    style?: Record<string, unknown>;
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
      span: ({ children, className }: MotionSpanProps) => <span className={className}>{children}</span>,
      div: ({ children, className }: MotionDivProps) => <div className={className}>{children}</div>,
      path: ({ d, fill, strokeWidth, className }: MotionPathProps) => (
        <path d={d} fill={fill} strokeWidth={strokeWidth} className={className} />
      ),
    },
    AnimatePresence: ({ children }: { children?: ReactNode }) => <>{children}</>,
    useInView: () => true,
  };
});

beforeAll(() => {
  global.ResizeObserver = jest.fn().mockImplementation((cb: ResizeObserverCallback) => ({
    observe: jest.fn(() =>
      cb([{ contentRect: { width: 800 } } as ResizeObserverEntry], {} as ResizeObserver)
    ),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }));
});

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProcessFlowSection from './ProcessFlowSection';
import { PROCESS_STEPS } from './processSteps';

describe('ProcessFlowSection', () => {
  describe('Rendering', () => {
    it('renders section with correct aria-label', () => {
      render(<ProcessFlowSection />);
      expect(screen.getByRole('region', { name: 'Unser Prozess' })).toBeInTheDocument();
    });

    it('renders main heading', () => {
      render(<ProcessFlowSection />);
      expect(screen.getByRole('heading', { level: 2, name: 'Unser Prozess' })).toBeInTheDocument();
    });

    it('renders section label', () => {
      render(<ProcessFlowSection />);
      expect(screen.getByText('Wie es funktioniert')).toBeInTheDocument();
    });

    it('renders typewriter cursor', () => {
      render(<ProcessFlowSection />);
      expect(screen.getByText('|')).toBeInTheDocument();
    });

    it('renders a node for every step', () => {
      render(<ProcessFlowSection />);
      PROCESS_STEPS.forEach((step) => {
        expect(screen.getAllByRole('button', { name: step.title }).length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('Default state', () => {
    it('shows all items of step 1 by default', () => {
      render(<ProcessFlowSection />);
      PROCESS_STEPS[0]!.items.forEach((item) => {
        expect(screen.getByText(item.subtitle)).toBeInTheDocument();
        expect(screen.getByText(item.description)).toBeInTheDocument();
      });
    });

    it('step 1 has aria-pressed true by default', () => {
      render(<ProcessFlowSection />);
      const step1Buttons = screen.getAllByRole('button', { name: PROCESS_STEPS[0]!.title });
      expect(step1Buttons[0]).toHaveAttribute('aria-pressed', 'true');
    });

    it('non-active steps have aria-pressed false by default', () => {
      render(<ProcessFlowSection />);
      PROCESS_STEPS.slice(1).forEach((step) => {
        const buttons = screen.getAllByRole('button', { name: step.title });
        expect(buttons[0]).toHaveAttribute('aria-pressed', 'false');
      });
    });
  });

  describe('Interaction', () => {
    it('shows all items of the clicked step', () => {
      render(<ProcessFlowSection />);
      const step = PROCESS_STEPS[2]!;
      fireEvent.click(screen.getAllByRole('button', { name: step.title })[0]!);
      step.items.forEach((item) => {
        expect(screen.getByText(item.subtitle)).toBeInTheDocument();
        expect(screen.getByText(item.description)).toBeInTheDocument();
      });
    });

    it('sets aria-pressed true on clicked step', () => {
      render(<ProcessFlowSection />);
      const step = PROCESS_STEPS[1]!;
      const buttons = screen.getAllByRole('button', { name: step.title });
      fireEvent.click(buttons[0]!);
      expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
    });

    it('sets aria-pressed false on previously active step', () => {
      render(<ProcessFlowSection />);
      const step2Buttons = screen.getAllByRole('button', { name: PROCESS_STEPS[1]!.title });
      fireEvent.click(step2Buttons[0]!);
      const step1Buttons = screen.getAllByRole('button', { name: PROCESS_STEPS[0]!.title });
      expect(step1Buttons[0]).toHaveAttribute('aria-pressed', 'false');
    });

    it('each step click shows the items belonging to that step', () => {
      render(<ProcessFlowSection />);
      PROCESS_STEPS.forEach((step) => {
        fireEvent.click(screen.getAllByRole('button', { name: step.title })[0]!);
        step.items.forEach((item) => {
          expect(screen.getByText(item.subtitle)).toBeInTheDocument();
          expect(screen.getByText(item.description)).toBeInTheDocument();
        });
      });
    });
  });
});
