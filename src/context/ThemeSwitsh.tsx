
'use client'
import React from 'react';


import { useTheme } from "next-themes";
import { RiSunLine, RiMoonClearLine } from "react-icons/ri";


export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div
      className=' flex items-center cursor-pointer select-none bg-bg-l dark:bg-bg-d p-1 rounded-md z-200'
      onClick={toggleTheme}
    >
      <button
        title="Dunkel-/Hellmodus wechseln"
        className="flex justify-center items-center w-4 h-4  rounded-md cursor-pointer
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
    </div>
  );
}

