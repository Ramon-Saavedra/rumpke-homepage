"use client";

import { RiSunLine, RiMoonClearLine } from "react-icons/ri";
import { useTheme } from "@/context/use-theme";
import { buttonVariants } from "@/components/ui/button/buttonVariants";

export function ThemeSwitch() {
  const { toggle } = useTheme();

  return (
    <div className="z-200 flex items-center select-none">
      <button
        type="button"
        onClick={toggle}
        title="Dunkel-/Hellmodus wechseln"
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "cursor-pointer",
        })}
        aria-label="Dunkel-/Hellmodus wechseln"
      >
        <RiSunLine className="h-5 w-5 transition-transform ease-out hover:rotate-12 dark:hidden" />
        <RiMoonClearLine className="hidden h-5 w-5 transition-transform ease-out hover:rotate-12 dark:block" />
      </button>
    </div>
  );
}
