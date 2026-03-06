import { notFound } from "next/navigation";
import Link from "next/link";
import Title from "@/components/ui/title/Title";
import { Key, FileText } from "lucide-react";
import {
  VALID_TYPES,
  TYPE_LABELS,
  TYPE_DESCRIPTIONS,
  TRANSACTION_LABELS,
  isValidType
} from "@/types/property-types";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export default async function PropertyTypePage({ params }: PageProps) {
  const { type } = await params;

  if (!isValidType(type)) {
    notFound();
  }

  const label = TYPE_LABELS[type];
  const description = TYPE_DESCRIPTIONS[type];

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <Title
          variant="h1"
          size="xl"
          align="center"
          subtitle={description}
        >
          {label}
        </Title>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link
          href={`/kauf/${type}`}
          className="group border border-border-l dark:border-border-d p-12 text-center hover:bg-Bghover-l dark:hover:bg-Bghover-d bg-bgSecondary-l dark:bg-bgSecondary-d"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20  flex items-center justify-center text-primary">
              <Key size={48} strokeWidth={2} />
            </div>
            <h2 className="text-3xl font-bold text-card-text-l dark:text-card-text-d">
              {TRANSACTION_LABELS.kauf}
            </h2>
            <p className="text-secondary-l dark:text-secondary-d text-lg">
              {label} zum Kauf anzeigen
            </p>
          </div>
        </Link>

        <Link
          href={`/miete/${type}`}
          className="group border border-border-l dark:border-border-d p-12 text-center hover:bg-Bghover-l dark:hover:bg-Bghover-d bg-bgSecondary-l dark:bg-bgSecondary-d"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 flex items-center justify-center text-primary">
              <FileText size={48} strokeWidth={2} />
            </div>
            <h2 className="text-3xl font-bold text-card-text-l dark:text-card-text-d">
              {TRANSACTION_LABELS.miete}
            </h2>
            <p className="text-secondary-l dark:text-secondary-d text-lg">
              {label} zur Miete anzeigen
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return VALID_TYPES.map((type) => ({
    type,
  }));
}
