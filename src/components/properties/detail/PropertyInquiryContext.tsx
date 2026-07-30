"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import type { PropertyInquiryType } from "@/lib/property-detail";

interface PropertyInquiryContextValue {
  readonly inquiryType: PropertyInquiryType;
  readonly setInquiryType: (type: PropertyInquiryType) => void;
  readonly panelRef: RefObject<HTMLDivElement | null>;
  readonly requestInquiry: (type: PropertyInquiryType) => void;
}

const PropertyInquiryContext =
  createContext<PropertyInquiryContextValue | null>(null);

export function usePropertyInquiry(): PropertyInquiryContextValue {
  const context = useContext(PropertyInquiryContext);
  if (context === null) {
    throw new Error(
      "usePropertyInquiry must be used inside PropertyInquiryProvider",
    );
  }
  return context;
}

export default function PropertyInquiryProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [inquiryType, setInquiryType] =
    useState<PropertyInquiryType>("viewing");
  const panelRef = useRef<HTMLDivElement | null>(null);

  const requestInquiry = useCallback((type: PropertyInquiryType) => {
    setInquiryType(type);
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const value = useMemo(
    () => ({ inquiryType, setInquiryType, panelRef, requestInquiry }),
    [inquiryType, requestInquiry],
  );

  return (
    <PropertyInquiryContext.Provider value={value}>
      {children}
    </PropertyInquiryContext.Provider>
  );
}
