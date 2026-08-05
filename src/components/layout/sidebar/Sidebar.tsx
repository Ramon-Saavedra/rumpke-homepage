"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";
import { ThemeSwitch } from "@/context/theme-switch";
import { useUiStore } from "@/store/ui/ui-store";
import { DRAWER_LINKS } from "@/constants/navigation";
import { buttonVariants } from "@/components/ui/button/buttonVariants";

const Sidebar = () => {
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const closeSidebar = useUiStore((state) => state.closeSidebar);
  const sidebarRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isSidebarOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!isSidebarOpen) return;
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
      if (e.key === "Tab") {
        const focusable = sidebarRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [isSidebarOpen, closeSidebar]);

  return (
    <>
      <div
        data-testid="sidebar-overlay"
        className={`fixed inset-0 z-101 bg-[rgba(28,28,30,0.4)] ${
          isSidebarOpen ? "visible opacity-100" : "hidden"
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside
        ref={sidebarRef}
        id="mobile-sidebar"
        data-testid="sidebar"
        className={`fixed top-0 right-0 z-102 flex h-full w-[min(86vw,24rem)] flex-col border-l border-border-l bg-bg-l transition-transform duration-300 dark:border-border-d dark:bg-bgSecondary-d ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Navigationsmenü"
        aria-hidden={!isSidebarOpen}
        role="dialog"
        aria-modal={isSidebarOpen ? "true" : undefined}
        inert={!isSidebarOpen}
      >
        <div className="flex items-center justify-end p-5">
          <button
            ref={closeButtonRef}
            data-testid="close-sidebar-btn"
            onClick={closeSidebar}
            aria-label="Menü schließen"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <IoCloseOutline size={26} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6">
          {DRAWER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeSidebar}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="block border-b border-border-l py-3.5 text-[15px] text-bg-d hover:text-primary dark:border-border-d dark:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border-l px-6 py-5 dark:border-border-d">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[13px] text-card-text-l dark:text-card-text-d">
              Darstellung
            </span>
            <ThemeSwitch />
          </div>
          <Link
            href="/kontakt"
            onClick={closeSidebar}
            className={`${buttonVariants({ variant: "primary" })} flex w-full text-[13px] tracking-[0.04em]`}
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
