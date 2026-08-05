interface AdvantageItem {
  title: string;
  description: string;
}

interface AdvantagesSectionProps {
  title: string;
  items: AdvantageItem[];
}

export default function AdvantagesSection({
  title,
  items,
}: AdvantagesSectionProps) {
  return (
    <section className="rounded-lg border border-border-l bg-bgSecondary-l p-8 dark:border-border-d dark:bg-bgSecondary-d">
      <h2 className="mb-6 text-center font-serif text-2xl font-semibold">
        {title}
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.title}>
            <h3 className="mb-2 font-serif font-semibold">{item.title}</h3>
            <p className="text-sm text-card-text-l dark:text-card-text-d leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
