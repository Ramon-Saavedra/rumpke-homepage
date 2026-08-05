"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import RumpkeLogo from "@/components/branding/logo/RumpkeLogo";
import { useUiStore } from "@/store/ui/ui-store";
import { MAIN_NAV_LINKS } from "@/constants/navigation";
import { buttonVariants } from "@/components/ui/button/buttonVariants";
import { cn } from "@/lib/utils";

const Topmenu = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const openSidebar = useUiStore((state) => state.openSidebar);
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);

  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Transparent only when a hero sits directly beneath the header (homepage,
  // before scrolling past it). Solid everywhere else, by default.
  const transparent = isHome && !isScrolled;

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => {
      const hero = document.getElementById("site-hero");
      const headerH = headerRef.current?.offsetHeight ?? 0;
      const heroH = hero?.offsetHeight ?? window.innerHeight;
      setIsScrolled(window.scrollY > Math.max(0, heroH - headerH));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  return (
    <header
      ref={headerRef}
      data-transparent={transparent}
      className={`fixed inset-x-0 top-0 z-100 w-full ${
        transparent
          ? "border-b border-transparent bg-transparent text-white"
          : "border-b border-border-l bg-white text-bg-d dark:border-border-d dark:bg-bgSecondary-d dark:text-foreground"
      }`}
      style={{ height: "var(--topbar-height)" }}
    >
      {/* Scrim behind the header only, while transparent — keeps the logo/nav
          legible without dimming the rest of the video. */}
      {transparent && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-55 bg-[linear-gradient(180deg,rgba(28,28,30,0.45)_0%,rgba(28,28,30,0)_100%)]"
        />
      )}

      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo — compact mark below laptop; full wordmark on laptop and up. */}
        <RumpkeLogo
          variant="mark"
          onDark={transparent}
          className="inline-flex h-6 md:h-7 lg:hidden"
          priority
        />
        <RumpkeLogo
          variant="full"
          onDark={transparent}
          className="hidden h-11 lg:inline-flex min-[1440px]:h-14 min-[1800px]:h-16"
          priority
        />

        {/* Desktop / laptop nav + single CTA */}
        <nav
          aria-label="Hauptnavigation"
          className="hidden items-center gap-x-4 lg:flex xl:gap-x-5"
        >
          {MAIN_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="whitespace-nowrap text-[13px] tracking-[0.02em] hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className={cn(
              buttonVariants({
                variant: transparent ? "onMedia" : "primary",
                size: "sm",
              }),
              "min-h-10 whitespace-nowrap text-[13px] tracking-[0.04em]",
            )}
          >
            Kontakt aufnehmen
          </Link>
        </nav>

        {/* Mobile / tablet hamburger */}
        <button
          type="button"
          data-testid="menu-btn"
          aria-label="Navigationsmenü öffnen"
          aria-expanded={isSidebarOpen}
          aria-controls="mobile-sidebar"
          onClick={openSidebar}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "lg:hidden",
            transparent &&
              "text-white hover:bg-white/12 focus-visible:ring-white",
          )}
        >
          <span className="flex h-3.5 w-5.5 flex-col justify-between">
            <span className="h-0.5 w-full rounded-full bg-current" />
            <span className="h-0.5 w-full rounded-full bg-current" />
            <span className="h-0.5 w-full rounded-full bg-current" />
          </span>
        </button>
      </div>
    </header>
  );
};

export default Topmenu;
