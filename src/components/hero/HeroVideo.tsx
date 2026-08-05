"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button/buttonVariants";

type HeroVideoProps = {
  videoSrc: string;
  poster?: string;
  alt: string;
};

export default function HeroVideo({ videoSrc, poster, alt }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlaybackPreference = () => {
      if (reducedMotion.matches) {
        videoElement.pause();
        return;
      }

      const bounds = videoElement.getBoundingClientRect();
      if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
        videoElement.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !reducedMotion.matches) {
            videoElement.play().catch(() => {});
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(videoElement);
    reducedMotion.addEventListener("change", syncPlaybackPreference);
    syncPlaybackPreference();

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlaybackPreference);
    };
  }, []);

  return (
    <section id="site-hero" className="relative w-full overflow-hidden h-svh">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        poster={poster}
        loop
        muted
        playsInline
        aria-label={alt}
      />

      {/* One soft vertical scrim — dark → clear → dark — keeps the header and
          CTA row legible while the middle of the video stays visible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,22,19,0.55)_0%,rgba(20,22,19,0.15)_22%,rgba(20,22,19,0.35)_78%,rgba(20,22,19,0.7)_100%)]"
      />

      {/* Centered single column */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-[14vh] text-center">
        <h1 className="font-serif font-medium leading-[1.05] tracking-[-0.01em] text-white text-[clamp(2.5rem,3.8vw+0.85rem,5rem)] max-w-205 mb-6">
          Mehr als nur vier Wände.
        </h1>
        <p className="text-[17px] leading-relaxed text-white/90 max-w-130">
          Wir begleiten Menschen beim Kauf, Verkauf und der Vermietung von
          Immobilien – persönlich, ehrlich und mit Leidenschaft.
        </p>

        <div className="mt-9 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
          <Link
            href="/kauf"
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            Immobilien entdecken
          </Link>
          <Link
            href="/dienstleistungen/immobilienbewertung"
            className={buttonVariants({ variant: "onMedia", size: "lg" })}
          >
            Immobilie bewerten
          </Link>
        </div>
      </div>
    </section>
  );
}
