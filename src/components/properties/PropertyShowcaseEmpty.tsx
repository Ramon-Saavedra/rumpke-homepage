import PropertyEmptyState from "./PropertyEmptyState";

interface PropertyShowcaseEmptyProps {
  readonly error?: boolean;
  readonly isLoading?: boolean;
}

export default function PropertyShowcaseEmpty({
  error = false,
  isLoading = false,
}: PropertyShowcaseEmptyProps) {
  if (isLoading) {
    return <PropertyEmptyState isLoading />;
  }

  if (error) {
    return (
      <PropertyEmptyState
        headline="Immobilien derzeit nicht verfügbar"
        body="Der Objektbestand lässt sich gerade nicht laden. Versuchen Sie es später erneut – oder lassen Sie sich direkt persönlich beraten."
      />
    );
  }

  return (
    <PropertyEmptyState
      headline="Zurzeit sind keine Immobilien veröffentlicht"
      body="Unser Angebot wird regelmäßig aktualisiert. Gerne informieren wir Sie persönlich über passende Immobilien oder unterstützen Sie bei Ihrer individuellen Suche."
    />
  );
}
