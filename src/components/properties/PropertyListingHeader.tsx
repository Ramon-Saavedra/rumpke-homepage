import Title from "@/components/ui/title/Title";

interface PropertyListingHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
}

export default function PropertyListingHeader({
  title,
  subtitle,
}: PropertyListingHeaderProps) {
  return (
    <header className="mb-8 sm:mb-10">
      <Title
        variant="h1"
        size="xl"
        className="font-serif text-foreground"
        subtitle={subtitle}
        subtitleClassName="text-card-text-l dark:text-card-text-d"
      >
        {title}
      </Title>
    </header>
  );
}
