import { Check } from "lucide-react";
import PropertyDetailSection from "./PropertyDetailSection";

interface PropertyFeaturesSectionProps {
  readonly features: readonly string[];
  readonly description: string | null;
}

export default function PropertyFeaturesSection({
  features,
  description,
}: PropertyFeaturesSectionProps) {
  if (features.length === 0 && !description) return null;

  return (
    <PropertyDetailSection title="Ausstattung">
      {features.length > 0 && (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-6 gap-y-3.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-[15px]">
              <Check
                className="h-4 w-4 shrink-0 text-primary"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      )}
      {description && (
        <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-card-text-l dark:text-card-text-d">
          {description}
        </p>
      )}
    </PropertyDetailSection>
  );
}
