import { useRef, useState, useEffect, type RefObject } from "react";

export function useElementWidth<T extends HTMLElement>(): {
  ref: RefObject<T>;
  width: number;
} {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWidth(entry.contentRect.width);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return { ref, width };
}
