"use client";

import { FC, useEffect, useRef } from "react";
import Link from "next/link";

type HeroVideoProps = {
  videoSrc: string;
  poster?: string;
  alt: string;
};

const HeroVideo: FC<HeroVideoProps> = ({ videoSrc, poster, alt }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch(() => { });
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="site-hero"
      className="relative w-full overflow-hidden h-svh min-h-140 md:h-[90vh] md:min-h-155 lg:h-[85vh] min-[1440px]:h-[88vh] min-[1800px]:h-[90vh] min-[1800px]:max-h-225"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        poster={poster}
        autoPlay
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
        <h1 className="font-heading font-medium leading-[1.05] tracking-[-0.01em] text-white text-[clamp(2.5rem,3.8vw+0.85rem,5rem)] max-w-205 mb-6">
          Mehr als nur vier Wände.
        </h1>
        <p className="text-[17px] leading-relaxed text-white/90 max-w-130">
          Wir begleiten Menschen beim Kauf, Verkauf und der Vermietung von
          Immobilien – persönlich, ehrlich und mit Leidenschaft.
        </p>

        <div className="mt-9 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
          <Link
            href="/kauf"
            className="rounded-lg bg-primary px-7 py-3.5 text-center text-sm font-medium text-white transition-colors duration-150 hover:bg-primary-dark active:translate-y-px"
          >
            Immobilien entdecken
          </Link>
          <Link
            href="/dienstleistungen/immobilienbewertung"
            className="rounded-lg border border-white/60 px-7 py-3.5 text-center text-sm font-medium text-white transition-colors duration-150 hover:bg-white/12 active:translate-y-px"
          >
            Immobilie bewerten
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
