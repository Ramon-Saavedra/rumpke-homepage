
'use client'
import React from 'react';



import { RiSunLine, RiMoonClearLine } from "react-icons/ri";



export const ThemeSwitch = () => {
  const [isDark, setIsDark] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        setIsDark(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDark(false);
      }
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement;
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        setIsDark(false);
      } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setIsDark(true);
      }
    }
  };

  if (!mounted) return null;

  return (
    <div
      className='flex items-center select-none bg-bg-l dark:bg-bg-d p-1 rounded-md z-200'
    >
      <button
        onClick={toggleTheme}
        title="Dunkel-/Hellmodus wechseln"
        className="flex justify-center items-center w-4 h-4  rounded-md cursor-pointer
                hover:bg-Bghover-l dark:hover:bg-Bghover-d focus:outline-none focus:ring-2 focus:ring-white/20
                transition-all  ease-out"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <RiMoonClearLine className="w-4 h-4 text-white transition-transform  ease-out hover:rotate-12" />
        ) : (
          <RiSunLine className="w-4 h-4 text-black transition-transform  ease-out hover:rotate-12" />
        )}
      </button>
    </div>
  );
}

