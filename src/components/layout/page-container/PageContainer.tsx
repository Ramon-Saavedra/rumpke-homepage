import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn('container mx-auto max-w-5xl py-12 px-2 xl:px-0', className)}>
      {children}
    </div>
  );
}
