jest.mock('framer-motion', () => {
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
      path: ({ d, fill, strokeWidth, className }: MotionPathProps) => (
        <path d={d} fill={fill} strokeWidth={strokeWidth} className={className} data-testid="animated-path" />
      ),
    },
  };
});

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NeuronPath } from './NeuronPath';

const baseProps = { x1: 0, y1: 0, x2: 100, y2: 100, segIndex: 0 };

describe('NeuronPath', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      const { container } = render(<svg><NeuronPath {...baseProps} inView={false} /></svg>);
      expect(container.querySelector('g')).toBeInTheDocument();
    });

    it('always renders the base static path', () => {
      const { container } = render(<svg><NeuronPath {...baseProps} inView={false} /></svg>);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThanOrEqual(1);
    });

    it('renders correct path data on base path', () => {
      const { container } = render(<svg><NeuronPath x1={10} y1={20} x2={100} y2={80} segIndex={0} inView={false} /></svg>);
      const basePath = container.querySelector('path:not([data-testid])');
      expect(basePath).toHaveAttribute('d', 'M 10 20 L 100 80');
    });

    it('base path has strokeWidth 1', () => {
      const { container } = render(<svg><NeuronPath {...baseProps} inView={false} /></svg>);
      const basePath = container.querySelector('path:not([data-testid])');
      expect(basePath).toHaveAttribute('stroke-width', '1');
    });
  });

  describe('Animation', () => {
    it('does not render animated path when inView is false', () => {
      const { queryByTestId } = render(<svg><NeuronPath {...baseProps} inView={false} /></svg>);
      expect(queryByTestId('animated-path')).not.toBeInTheDocument();
    });

    it('renders animated path when inView is true', () => {
      const { getByTestId } = render(<svg><NeuronPath {...baseProps} inView={true} /></svg>);
      expect(getByTestId('animated-path')).toBeInTheDocument();
    });

    it('animated path has same path data as base path', () => {
      const { getByTestId } = render(
        <svg><NeuronPath x1={10} y1={20} x2={100} y2={80} segIndex={0} inView={true} /></svg>
      );
      expect(getByTestId('animated-path')).toHaveAttribute('d', 'M 10 20 L 100 80');
    });
  });
});
