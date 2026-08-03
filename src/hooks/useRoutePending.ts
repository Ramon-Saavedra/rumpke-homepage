"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const SAFETY_TIMEOUT_MS = 8000;

function normalizeRoute(pathname: string, search: string): string {
  const query = new URLSearchParams(search).toString();
  return query ? `${pathname}?${query}` : pathname;
}

function currentRoute(): string {
  return normalizeRoute(window.location.pathname, window.location.search);
}

function isPlainLeftClick(event: MouseEvent): boolean {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

function leadsToAnotherRoute(anchor: HTMLAnchorElement): boolean {
  if (anchor.target !== "" && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  let url: URL;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return false;
  }

  if (url.origin !== window.location.origin) return false;

  return normalizeRoute(url.pathname, url.search) !== currentRoute();
}

export default function useRoutePending(): boolean {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const settledRoute = normalizeRoute(pathname, searchParams.toString());

  const [isPending, setIsPending] = useState(false);
  const settledRef = useRef(settledRoute);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs pending flag with route settlement
    setIsPending(false);
    settledRef.current = settledRoute;
  }, [settledRoute]);

  useEffect(() => {
    function handlePopState() {
      if (currentRoute() !== settledRef.current) {
        setIsPending(true);
      }
    }

    function handleClick(event: MouseEvent) {
      if (!isPlainLeftClick(event)) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor || !leadsToAnotherRoute(anchor)) return;

      setIsPending(true);
    }

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (!isPending) return;
    const timer = setTimeout(() => setIsPending(false), SAFETY_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [isPending]);

  return isPending;
}
