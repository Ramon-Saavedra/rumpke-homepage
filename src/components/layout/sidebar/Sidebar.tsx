'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5';
import { ThemeSwitch } from '@/context/theme-switch';
import { useUiStore } from '@/store/ui/ui-store';
import { DRAWER_LINKS } from '@/constants/navigation';

const Sidebar = () => {
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const closeSidebar = useUiStore((state) => state.closeSidebar);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isSidebarOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!isSidebarOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSidebar();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSidebarOpen, closeSidebar]);

  return (
    <>
      <div
        data-testid="sidebar-overlay"
        className={`fixed inset-0 z-101 bg-[rgba(28,28,30,0.4)] ${
          isSidebarOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        style={{ transition: 'opacity 300ms ease-in-out, visibility 300ms ease-in-out' }}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside
        id="mobile-sidebar"
        data-testid="sidebar"
        className={`fixed right-0 top-0 z-102 flex h-full w-[62%] max-w-sm flex-col border-l border-border-l bg-bg-l dark:border-border-d dark:bg-bgSecondary-d ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transition: 'transform 300ms ease-out' }}
        aria-label="Navigationsmenü"
        aria-hidden={!isSidebarOpen}
      >
        <div className="flex items-center justify-end p-5">
          <button
            ref={closeButtonRef}
            data-testid="close-sidebar-btn"
            onClick={closeSidebar}
            aria-label="Menü schließen"
            className="cursor-pointer rounded p-1 text-bg-d hover:text-primary dark:text-white"
          >
            <IoCloseOutline size={26} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6">
          {DRAWER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeSidebar}
              className="block border-b border-border-l py-3.5 text-[15px] text-bg-d transition-colors duration-150 hover:text-primary dark:border-border-d dark:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border-l px-6 py-5 dark:border-border-d">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[13px] text-card-text-l dark:text-card-text-d">Darstellung</span>
            <ThemeSwitch />
          </div>
          <Link
            href="/kontakt"
            onClick={closeSidebar}
            className="block rounded-lg bg-primary px-5 py-3 text-center text-[13px] font-medium tracking-[0.04em] text-white transition-colors duration-150 hover:bg-primary-dark active:translate-y-px"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
