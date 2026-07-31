"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const SAFETY_TIMEOUT_MS = 8000;
const ROUTE_CHANGE_EVENT = "rumpke:route-change";

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

  useEffect(() => {
    setIsPending(false);
  }, [settledRoute]);

  useEffect(() => {
    function markPending() {
      if (currentRoute() !== settledRoute) setIsPending(true);
    }

    function handleClick(event: MouseEvent) {
      if (!isPlainLeftClick(event)) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor || !leadsToAnotherRoute(anchor)) return;

      setIsPending(true);
    }

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      window.dispatchEvent(new Event(ROUTE_CHANGE_EVENT));
    };
    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      window.dispatchEvent(new Event(ROUTE_CHANGE_EVENT));
    };

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener(ROUTE_CHANGE_EVENT, markPending);
    window.addEventListener("popstate", markPending);

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener(ROUTE_CHANGE_EVENT, markPending);
      window.removeEventListener("popstate", markPending);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [settledRoute]);

  useEffect(() => {
    if (!isPending) return;
    const timer = setTimeout(() => setIsPending(false), SAFETY_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [isPending]);

  return isPending;
}
