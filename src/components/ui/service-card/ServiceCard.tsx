interface ServiceCardProps {
  title: string;
  description: string;
  className?: string;
}

export default function ServiceCard({ title, description, className = "" }: ServiceCardProps) {
  return (
    <div className={`p-6 bg-secondary dark:bg-secondary-dark rounded border border-border-l dark:border-border-d ${className}`}>
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <p className="text-sm text-card-text-l dark:text-card-text-d leading-relaxed">
        {description}
      </p>
    </div>
  );
}
