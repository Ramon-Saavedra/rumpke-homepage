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
        size="2xl"
        className="font-serif text-foreground mb-2"
        subtitle={subtitle}
        subtitleClassName="text-card-text-l dark:text-card-text-d text-lg"
      >
        {title}
      </Title>
    </header>
  );
}
