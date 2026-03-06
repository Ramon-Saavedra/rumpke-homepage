import PropertyTypeGrid from "@/components/properties/PropertyTypeGrid";
import Title from "@/components/ui/title/Title";



const PROPERTY_TYPES = [
  { slug: "haus", label: "Haus", description: "Einfamilienhäuser, Reihenhäuser, Villen" },
  { slug: "wohnung", label: "Wohnung", description: "Eigentumswohnungen, Apartments" },
  { slug: "gewerbe", label: "Gewerbe", description: "Büros, Lagerhallen, Geschäfte" },
  { slug: "grundstueck", label: "Grundstück", description: "Baugrundstücke, Ackerland" },
  { slug: "sonstige", label: "Sonstige", description: "Weitere Immobilientypen" },
] as const;

export default function KaufPage() {
  return (
    <>
      <div className="mb-12">
        <Title variant="h1" align="center" size="xl" className="mb-4">
          Immobilien kaufen
        </Title>
        <p className="text-center text-card-text-l dark:text-card-text-d">
          Finden Sie Ihre Traumimmobilie zum Kauf
        </p>
      </div>

      <PropertyTypeGrid
        types={PROPERTY_TYPES}
        basePath="kauf"
        title="Nach Immobilientyp filtern"
      />

      <div className="p-8 bg-bgSecondary-l dark:bg-bgSecondary-d border border-border-l dark:border-border-d rounded">
        <p className="text-center text-card-text-l dark:text-card-text-d">
          Alle Immobilien zum Kauf werden hier angezeigt, sobald das Backend integriert ist.
        </p>
      </div>
    </>
  );
}
