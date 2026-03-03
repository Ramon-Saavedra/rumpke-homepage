import Title from "@/components/ui/title/Title";
import PropertyTypeGrid from "@/components/properties/PropertyTypeGrid";
import { getPropertyTypes } from "@/types/property-types";

export default function MietePage() {
  return (
    <>
      <div className="mb-12">
        <Title variant="h1" align="center" size="xl" className="mb-4">
          Immobilien mieten
        </Title>
        <p className="text-center text-card-text-l dark:text-card-text-d">
          Finden Sie Ihre Traumimmobilie zur Miete
        </p>
      </div>

      <PropertyTypeGrid
        types={getPropertyTypes("miete")}
        basePath="miete"
        title="Nach Immobilientyp filtern"
      />

      <div className="p-8 bg-secondary dark:bg-secondary-dark border border-border-l dark:border-border-d rounded">
        <p className="text-center text-card-text-l dark:text-card-text-d">
          Alle Immobilien zur Miete werden hier angezeigt, sobald das Backend integriert ist.
        </p>
      </div>
    </>
  );
}
