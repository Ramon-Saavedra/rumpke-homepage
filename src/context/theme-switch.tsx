'use client';

import { RiSunLine, RiMoonClearLine } from 'react-icons/ri';
import { useTheme } from '@/context/use-theme';

export function ThemeSwitch() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="flex items-center select-none bg-bg-l dark:bg-bg-d p-1 rounded-md z-200">
      <button
        onClick={toggle}
        title="Dunkel-/Hellmodus wechseln"
        className="flex justify-center items-center w-4 h-4 rounded-md cursor-pointer
                hover:bg-Bghover-l dark:hover:bg-Bghover-d focus:outline-none focus:ring-2 focus:ring-white/20
                transition-all ease-out"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <RiMoonClearLine className="w-4 h-4 text-white transition-transform ease-out hover:rotate-12" />
        ) : (
          <RiSunLine className="w-4 h-4 text-black transition-transform ease-out hover:rotate-12" />
        )}
      </button>
    </div>
  );
}
