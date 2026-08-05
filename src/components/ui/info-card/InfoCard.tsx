import { cn } from "@/lib/utils";

interface InfoCardProps {
  readonly title: string;
  readonly description: string;
  readonly className?: string;
}

export default function InfoCard({
  title,
  description,
  className,
}: InfoCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border-l bg-bgSecondary-l p-6 dark:border-border-d dark:bg-bgSecondary-d",
        className,
      )}
    >
      <h3 className="mb-3 font-serif text-lg font-semibold">{title}</h3>
      <p className="text-sm text-card-text-l dark:text-card-text-d leading-relaxed">
        {description}
      </p>
    </div>
  );
}
