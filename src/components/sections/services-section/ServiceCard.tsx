import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export interface ServiceCardProps {
  readonly title: string;
  readonly text: string;
  readonly link: string;
  readonly icon: LucideIcon;
}

export default function ServiceCard({
  title,
  text,
  link,
  icon: Icon,
}: ServiceCardProps) {
  return (
    <Link
      href={link}
      className="group flex h-full flex-col items-center p-5 text-center hover:bg-bgSecondary-l focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-l sm:items-start sm:text-left dark:hover:bg-bgSecondary-d dark:focus-visible:ring-offset-bg-d"
    >
      <Icon
        size={28}
        strokeWidth={1.75}
        aria-hidden="true"
        className="text-card-text-l group-hover:text-primary dark:text-card-text-d"
      />

      <h3 className="mt-5 text-[22px] font-bold leading-snug tracking-tight text-foreground group-hover:text-primary">
        {title}
      </h3>

      <p className="mt-3.5 max-w-85 text-[15.5px] leading-[1.7] text-card-text-l dark:text-card-text-d">
        {text}
      </p>

      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-medium text-primary-dark underline-offset-4 group-hover:underline dark:text-primary">
        Mehr erfahren
        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
      </span>
    </Link>
  );
}
