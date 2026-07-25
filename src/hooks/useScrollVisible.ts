import { useEffect, useRef, useState, type RefObject } from "react";

type UseScrollVisibleOptions = {
  readonly threshold?: number;
};

type UseScrollVisibleReturn<T extends HTMLElement> = {
  readonly ref: RefObject<T | null>;
  readonly visible: boolean;
};

export function useScrollVisible<T extends HTMLElement = HTMLElement>(
  options: UseScrollVisibleOptions = {},
): UseScrollVisibleReturn<T> {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const { threshold = 0.1 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
