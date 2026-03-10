"use client";

import { FC, useEffect, useRef } from "react";
import RumpkeLogo from "@/components/branding/logo/RumpkeLogo";
import ContactButton from "@/components/ui/contact-button/ContactButton";
import Title from "@/components/ui/title/Title";

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
      className="w-full flex items-center justify-center relative border-r border-l border-secondary"
      style={{ marginTop: "var(--top-menu-height)" }}
    >
      <video
        ref={videoRef}
        className="w-full h-[75vh] sm:h-100vh object-cover"
        src={videoSrc}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        aria-label={alt}
      />
      <div className="absolute top-0 md:left-20 z-10 p-4">
        <RumpkeLogo />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center z-20 px-1 sm:px-0">
        <Title
          variant="h1"
          align="center"
          size="xl"
          subtitle="Lore ipsum dolor sit amet, consectetur adipiscing elit."
          className="text-white text-5xl md:text-7xl font-extrabold mb-4"
          subtitleClassName="text-white text-lg md:text-2xl xl:text-3xl font-semibold mt-2"
        >
          Rumpke Immobilien
        </Title>
      </div>
      <div className="absolute bottom-0 right-0 z-20 p-4">
        <ContactButton />
      </div>
    </section>
  );
};

export default HeroVideo;
