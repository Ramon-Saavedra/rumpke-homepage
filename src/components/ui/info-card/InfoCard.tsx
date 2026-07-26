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
        "p-6 bg-bgSecondary-l dark:bg-bgSecondary-d rounded border border-border-l dark:border-border-d",
        className,
      )}
    >
      <h2 className="font-semibold text-lg mb-3">{title}</h2>
      <p className="text-sm text-card-text-l dark:text-card-text-d leading-relaxed">
        {description}
      </p>
    </div>
  );
}
