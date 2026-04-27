import { useState, useEffect } from "react";

export interface UseTypewriterOptions {
  typingSpeed?: number;
  erasingSpeed?: number;
  pauseAfterType?: number;
  pauseAfterErase?: number;
}

export function useTypewriter(
  phrases: readonly string[],
  {
    typingSpeed = 80,
    erasingSpeed = 40,
    pauseAfterType = 1800,
    pauseAfterErase = 400,
  }: UseTypewriterOptions = {}
): string {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;
    const current = phrases[phraseIndex] ?? "";

    if (!isErasing && charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), typingSpeed);
      return () => clearTimeout(t);
    }
    if (!isErasing && charIndex === current.length) {
      const t = setTimeout(() => setIsErasing(true), pauseAfterType);
      return () => clearTimeout(t);
    }
    if (isErasing && charIndex > 0) {
      const t = setTimeout(() => setCharIndex((c) => c - 1), erasingSpeed);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setIsErasing(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }, pauseAfterErase);
    return () => clearTimeout(t);
  }, [charIndex, isErasing, phraseIndex, phrases, typingSpeed, erasingSpeed, pauseAfterType, pauseAfterErase]);

  return (phrases[phraseIndex] ?? "").slice(0, charIndex);
}
