import Link from "next/link";
import {
  Home,
  Building2,
  Briefcase,
  Trees,
  MoreHorizontal,
} from "lucide-react";

interface PropertyType {
  slug: string;
  label: string;
  description: string;
}

interface PropertyTypeGridProps {
  types: readonly PropertyType[];
  basePath: string;
  title?: string;
}

const getIcon = (slug: string) => {
  switch (slug) {
    case "haeuser":
      return <Home className="w-8 h-8" />;
    case "wohnungen":
      return <Building2 className="w-8 h-8" />;
    case "gewerbeimmobilien":
      return <Briefcase className="w-8 h-8" />;
    case "grundstueck":
      return <Trees className="w-8 h-8" />;
    default:
      return <MoreHorizontal className="w-8 h-8" />;
  }
};

export default function PropertyTypeGrid({
  types,
  basePath,
  title,
}: PropertyTypeGridProps) {
  return (
    <section className="mb-12">
      {title && (
        <h2 className="mb-6 text-lg font-semibold text-foreground sm:text-xl">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {types.map((type) => (
          <Link
            key={type.slug}
            href={`/${basePath}/${type.slug}`}
            className="group"
          >
            <div className="flex items-start gap-4 rounded-lg border border-control-border-l bg-bgSecondary-l p-6 transition hover:border-primary hover:shadow-lg dark:border-control-border-d dark:bg-bgSecondary-d">
              <div className="text-primary group-hover:scale-110">
                {getIcon(type.slug)}
              </div>

              <div className="flex-1">
                <p className="mb-1 font-serif text-lg font-semibold text-foreground group-hover:text-primary">
                  {type.label}
                </p>
                <p className="text-sm text-card-text-l dark:text-card-text-d">
                  {type.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
