'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import CategoryNav from '@/components/layout/category-nav/CategoryNav';

/**
 * Owns the space directly beneath the fixed header.
 *
 * - Homepage (`/`): the hero is full-bleed and sits *under* the transparent
 *   header, so we render no offset and no category bar above it.
 * - Every other page: the header is solid, so we reserve its height with a
 *   spacer and dock the sticky CategoryNav directly beneath it. Both the
 *   spacer and the sticky offset read the single `--topbar-height` token,
 *   which steps per breakpoint (see globals.css).
 */
export default function PageShell({ children }: { children: ReactNode }) {
  const isHome = usePathname() === '/';

  if (isHome) {
    return <>{children}</>;
  }

  return (
    <>
      <div style={{ height: 'var(--topbar-height)' }} aria-hidden="true" />
      <CategoryNav />
      {children}
    </>
  );
}
