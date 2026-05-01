import Link from "next/link";
import { ArrowRight, Home, Building2, BarChart3, type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  text: string;
  link: string;
}

type IconMap = Record<string, LucideIcon>;

const ICONS: IconMap = {
  verkauf: Home,
  vermiet: Building2,
  bewert: BarChart3,
};

function getIcon(title: string): LucideIcon {
  const t = title.trim().toLowerCase();
  for (const [key, Icon] of Object.entries(ICONS)) {
    if (t.includes(key)) return Icon;
  }
  return Home;
}

export default function ServiceCard({ title, text, link }: ServiceCardProps) {
  const Icon = getIcon(title);
  return (
    <Link
      href={link}
      className="group relative flex items-start gap-5 py-7 px-1 border-b border-border-l dark:border-border-d last:border-b-0 hover:bg-bgSecondary-l dark:hover:bg-bgSecondary-d transition-colors"
    >
      {/* Left accent bar */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-0.5 bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
      />

      {/* Icon */}
      <div className="mt-0.5 flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-5 w-5 text-primary" strokeWidth={1.8} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-foreground mb-1.5 tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-card-text-l dark:text-card-text-d">
          {text}
        </p>
      </div>

      {/* Arrow */}
      <ArrowRight
        className="mt-1 flex-shrink-0 self-center h-5 w-5 text-card-text-l dark:text-card-text-d group-hover:text-primary group-hover:translate-x-1 transition-all"
        strokeWidth={2}
      />
    </Link>
  );
}
