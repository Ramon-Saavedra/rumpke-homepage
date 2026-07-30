"use client";

import { usePropertyInquiry } from "./PropertyInquiryContext";

interface PropertyStickyCtaProps {
  readonly price: string | null;
}

export default function PropertyStickyCta({ price }: PropertyStickyCtaProps) {
  const { requestInquiry } = usePropertyInquiry();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border-l bg-bgSecondary-l px-4 py-3 pr-24 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden dark:border-border-d dark:bg-bgSecondary-d">
      {price && (
        <span className="whitespace-nowrap text-[15px] font-bold text-primary">
          {price}
        </span>
      )}
      <button
        type="button"
        onClick={() => requestInquiry("viewing")}
        className="flex-1 cursor-pointer rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
      >
        Besichtigung anfragen
      </button>
    </div>
  );
}
