"use client";

import { useEffect, useState } from "react";
import { IoArrowUpOutline } from "react-icons/io5";
import { buttonVariants } from "@/components/ui/button/buttonVariants";
import { cn } from "@/lib/utils";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Nach oben scrollen"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
      className={cn(
        buttonVariants({ variant: "secondary", size: "icon", shape: "pill" }),
        "fixed right-6 bottom-6 z-500 cursor-pointer shadow-lg",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <IoArrowUpOutline size={22} aria-hidden="true" />
    </button>
  );
};

export default ScrollToTopButton;
