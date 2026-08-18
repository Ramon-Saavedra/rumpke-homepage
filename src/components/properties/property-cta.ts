import { buttonVariants } from "@/components/ui/button/buttonVariants";
import { cn } from "@/lib/utils";

export const PROPERTY_CTA_CLASS = buttonVariants({
  variant: "primary",
  size: "lg",
  shape: "pill",
});

export const PROPERTY_CTA_SECONDARY_CLASS = buttonVariants({
  variant: "secondary",
  size: "lg",
  shape: "pill",
});

export const PROPERTY_CTA_ROUNDED_CLASS = buttonVariants({
  variant: "primary",
  size: "lg",
  shape: "rounded",
});

export const PROPERTY_CTA_COMPACT_BASE = cn(
  buttonVariants({ variant: "primary", size: "sm", shape: "pill" }),
  "w-fit px-5 text-[13px]",
);

export const PROPERTY_CTA_COMPACT_CLASS = PROPERTY_CTA_COMPACT_BASE;

export const PROPERTY_CTA_COMPACT_GROUP_CLASS = cn(
  PROPERTY_CTA_COMPACT_BASE,
  "group-hover:bg-primary-dark",
);
