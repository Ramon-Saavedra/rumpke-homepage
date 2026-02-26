interface AdvantageItem {
  title: string;
  description: string;
}

interface AdvantagesSectionProps {
  title: string;
  items: AdvantageItem[];
}

export default function AdvantagesSection({ title, items }: AdvantagesSectionProps) {
  return (
    <section className="bg-secondary dark:bg-secondary-dark rounded-lg p-8 border border-border-l dark:border-border-d">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-card-text-l dark:text-card-text-d leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
