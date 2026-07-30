import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PropertyDetailSectionProps {
  readonly title: string;
  readonly id?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

export default function PropertyDetailSection({
  title,
  id,
  className,
  children,
}: PropertyDetailSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-28", className)}>
      <h2 className="mb-4 font-serif text-2xl font-semibold leading-[1.15] text-foreground sm:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
