
'use client'
import React from 'react';


import { useTheme } from "@/context/ThemeContext";
import { RiSunLine, RiMoonClearLine } from "react-icons/ri";


export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className='flex items-center cursor-pointer w-full select-none'
      onClick={toggleTheme}
    >
      <button
        title="Dunkel-/Hellmodus wechseln"
        className="flex justify-center items-center w-6 h-6  rounded-md cursor-pointer
                hover:bg-Bghover-l dark:hover:bg-Bghover-d focus:outline-none focus:ring-2 focus:ring-white/20
                transition-all  ease-out"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <RiSunLine className="w-4 h-4 text-black transition-transform  ease-out hover:rotate-12" />
        ) : (
          <RiMoonClearLine className="w-4 h-4 text-white transition-transform  ease-out hover:rotate-12" />
        )}
      </button>
      <span className="ml-2">Hell | Dunkel</span>
    </div>
  );
}

