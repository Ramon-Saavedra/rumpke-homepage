"use client";

import { useEffect, useState } from "react";
import RumpkeHouseOutline from "@/components/branding/logo/RumpkeHouseOutline";
import useRoutePending from "@/hooks/useRoutePending";
import { cn } from "@/lib/utils";

export const ROUTE_TRANSITION_LABEL = "Seite wird geladen";

const FADE_OUT_MS = 220;

export default function RouteTransitionOverlay() {
  const isPending = useRoutePending();
  const [isBlocking, setIsBlocking] = useState(false);

  useEffect(() => {
    if (isPending) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs blocking flag with external DOM-driven navigation state
      setIsBlocking(true);
      return;
    }

    if (!isBlocking) return;
    const timer = setTimeout(() => setIsBlocking(false), FADE_OUT_MS);
    return () => clearTimeout(timer);
  }, [isPending, isBlocking]);

  if (!isBlocking) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-700 flex items-center justify-center",
        "bg-bg-l/45 backdrop-blur-[1px] dark:bg-bg-d/45",
        "transition-opacity duration-200 ease-out motion-reduce:transition-none",
        isPending
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      <RumpkeHouseOutline
        animated
        className="h-16 w-16 text-primary sm:h-20 sm:w-20"
      />
      <span role="status" aria-live="polite" className="sr-only">
        {isPending ? ROUTE_TRANSITION_LABEL : ""}
      </span>
    </div>
  );
}
