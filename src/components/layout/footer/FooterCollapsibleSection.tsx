"use client";

import { useState, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FooterCollapsibleSectionProps {
  title: string;
  children: ReactNode;
}

export default function FooterCollapsibleSection({ title, children }: FooterCollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile: Collapsible */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center gap-2 text-lg font-semibold mb-4 text-primary"
          aria-expanded={isOpen}
        >
          <span>{title}</span>
          {isOpen ? (
            <ChevronUp size={20} className="text-primary" />
          ) : (
            <ChevronDown size={20} className="text-primary" />
          )}
        </button>
        {isOpen && (
          <div className="pb-6 flex flex-col items-center">
            {children}
          </div>
        )}
      </div>

      {/* Desktop: Always visible */}
      <div className="hidden sm:block">
        <h2 className="text-lg font-semibold mb-4 text-primary">{title}</h2>
        {children}
      </div>
    </div>
  );
}
