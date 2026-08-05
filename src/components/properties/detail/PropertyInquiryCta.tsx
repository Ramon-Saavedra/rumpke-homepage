"use client";

import { usePropertyInquiry } from "./PropertyInquiryContext";
import { buttonVariants } from "@/components/ui/button/buttonVariants";

export default function PropertyInquiryCta() {
  const { requestInquiry } = usePropertyInquiry();

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
      <button
        type="button"
        onClick={() => requestInquiry("viewing")}
        className={buttonVariants({ variant: "primary", size: "lg" })}
      >
        Besichtigung anfragen
      </button>
      <button
        type="button"
        onClick={() => requestInquiry("expose")}
        className={buttonVariants({ variant: "secondary", size: "lg" })}
      >
        Exposé anfordern
      </button>
    </div>
  );
}
