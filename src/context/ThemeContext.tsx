'use client';


import { ReactNode } from 'react';

type ThemeProviderProps = {
  children: ReactNode;
};

// Passthrough provider for compatibility
export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>;
}
