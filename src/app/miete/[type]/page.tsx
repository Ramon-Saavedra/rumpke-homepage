import { notFound } from "next/navigation";
import Title from "@/components/ui/title/Title";
import { VALID_TYPES, TYPE_LABELS, isValidType } from "@/types/property-types";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export default async function MieteTypePage({ params }: PageProps) {
  const { type } = await params;

  if (!isValidType(type)) {
    notFound();
  }

  const label = TYPE_LABELS[type];

  return (
    <>
      <div className="mb-12">
        <Title variant="h1" align="center" size="xl" className="mb-4">
          {label} mieten
        </Title>
        <p className="text-center text-card-text-l dark:text-card-text-d">
          Hier finden Sie alle verfügbaren {label} zur Miete
        </p>
      </div>

      <div className="p-8 bg-bgSecondary-l dark:bg-bgSecondary-d border border-border-l dark:border-border-d rounded">
        <p className="text-center text-card-text-l dark:text-card-text-d">
          {label} zur Miete werden hier angezeigt, sobald das Backend integriert ist.
        </p>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return VALID_TYPES.map((type) => ({
    type,
  }));
}
