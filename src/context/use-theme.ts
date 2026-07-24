'use client';

import { useState, useEffect } from 'react';

const THEME_STORAGE_KEY = 'theme';
const DARK_CLASS = 'dark';

function readStoredTheme(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'dark') return true;
  if (stored === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(isDark: boolean): void {
  if (typeof document === 'undefined') return;
  if (isDark) {
    document.documentElement.classList.add(DARK_CLASS);
  } else {
    document.documentElement.classList.remove(DARK_CLASS);
  }
}

let cachedIsDark: boolean | null = null;
const listeners = new Set<() => void>();

function getTheme(): boolean {
  if (cachedIsDark === null) {
    cachedIsDark = readStoredTheme();
  }
  return cachedIsDark;
}

function setTheme(isDark: boolean): void {
  cachedIsDark = isDark;
  localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
  applyTheme(isDark);
  listeners.forEach((cb) => cb());
}

export function useTheme() {
  const [isDark, setIsDark] = useState(() => getTheme());

  useEffect(() => {
    applyTheme(getTheme());
    const listener = () => setIsDark(getTheme());
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const toggle = () => {
    const next = !getTheme();
    setTheme(next);
    setIsDark(next);
  };

  return { isDark, toggle };
}

export function __theme_reset(): void {
  cachedIsDark = null;
  listeners.clear();
}
