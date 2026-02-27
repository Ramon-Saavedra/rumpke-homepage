import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

const VALID_TYPES = ["haus", "wohnung", "gewerbe", "grundstueck", "sonstige"] as const;

type PropertyType = typeof VALID_TYPES[number];

const TYPE_LABELS: Record<PropertyType, string> = {
  haus: "Haus",
  wohnung: "Wohnung",
  gewerbe: "Gewerbe",
  grundstueck: "Grundstück",
  sonstige: "Sonstige",
};

function isValidType(type: string): type is PropertyType {
  return VALID_TYPES.includes(type as PropertyType);
}

export default async function PropertyTypePage({ params }: PageProps) {
  const { type } = await params;

  if (!isValidType(type)) {
    notFound();
  }

  const label = TYPE_LABELS[type];

  return (
    <main className="flex-2 lg:basis-2/4 xl:basis-3/6 w-full max-w-full h-full overflow-y-auto sm:px-4 lg:px-1">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-6">
          Immobilien - {label}
        </h1>
        <p className="text-lg">
          Página desde kategorie/[type] - Categoría: {type}
        </p>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return VALID_TYPES.map((type) => ({
    type,
  }));
}
