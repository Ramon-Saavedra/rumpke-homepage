interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleId?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleId,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  const alignClass =
    align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignClass} mb-10 ${className ?? ""}`}>
      {eyebrow && (
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2
        id={titleId}
        className="text-3xl sm:text-4xl font-bold leading-tight text-foreground"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-card-text-l dark:text-card-text-d max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
