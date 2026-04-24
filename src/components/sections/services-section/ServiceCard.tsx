import Link from "next/link";
import { ArrowRight, Building2, Home, Key } from "lucide-react";

interface ServiceCardProps {
  title: string;
  text: string;
  link: string;
}

const renderIcon = (title: string) => {
  const titleLower = title.trim().toLowerCase();
  const iconProps = {
    className: "h-5 w-5 text-card-text-l dark:text-card-text-d",
    strokeWidth: 2,
  };

  if (titleLower.includes('verkauf')) return <Home {...iconProps} />;
  if (titleLower.includes('kauf')) return <Key {...iconProps} />;
  if (titleLower.includes('vermiet')) return <Building2 {...iconProps} />;
  return <Home {...iconProps} />;
};

export default function ServiceCard({ title, text, link }: ServiceCardProps) {
  return (
    <Link href={link} className="group block h-full">
      <article className="h-full border border-border-l bg-bg-l px-4 py-4 hover:bg-Bghover-l dark:border-border-d dark:bg-bg-d dark:hover:bg-Bghover-d sm:px-5 sm:py-4.5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-5">
          <div className="space-y-3">
            <span className="block h-px w-12 bg-secondary dark:bg-secondary-dark" />
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-l dark:border-border-d">
                {renderIcon(title)}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight text-third dark:text-bg-l sm:text-xl">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-card-text-l dark:text-card-text-d">
                  {text}
                </p>
              </div>
            </div>
          </div>

          <span className="flex items-center gap-2 pl-12 text-sm font-medium text-primary lg:pl-0 lg:justify-self-end">
            <span>Mehr erfahren</span>
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>
      </article>
    </Link>
  );
}
