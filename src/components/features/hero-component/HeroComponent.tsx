'use client';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const HeroComponent = () => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const el = elRef.current!;
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return createPortal(
    <div className="absolute top-0 left-0 w-full h-[90%] flex justify-center items-center bg-amber-300/60 border z-0 pointer-events-none">
      <span className="text-3xl font-bold text-black z-10">HeroComponent</span>
    </div>,
    elRef.current
  );
};

export default HeroComponent;
