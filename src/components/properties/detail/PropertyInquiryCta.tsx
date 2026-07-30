"use client";

import { usePropertyInquiry } from "./PropertyInquiryContext";

export default function PropertyInquiryCta() {
  const { requestInquiry } = usePropertyInquiry();

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
      <button
        type="button"
        onClick={() => requestInquiry("viewing")}
        className="cursor-pointer rounded-md bg-primary px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Besichtigung anfragen
      </button>
      <button
        type="button"
        onClick={() => requestInquiry("expose")}
        className="cursor-pointer rounded-md border border-border-l px-6 py-3.5 text-[15px] font-medium hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-border-d"
      >
        Exposé anfordern
      </button>
    </div>
  );
}
