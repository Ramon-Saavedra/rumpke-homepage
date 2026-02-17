
"use client";
import PropertiesGrid from '@/components/properties/PropertiesGrid';
import { OperationType } from '@/store/ui/ui-store';
import { Title } from '@/components/ui/title/Title';
import { useProperties } from '@/hooks/useProperties';


export default function KaufPage() {
  const { data, isLoading, isError } = useProperties();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[60vh] w-full"><span className="text-lg font-semibold">Laden...</span></div>;
  }
  if (isError || !data) {
    return <div className="p-4 font-semibold text-error">Eigenschaften konnten nicht geladen werden.</div>;
  }

  const properties = data
    .filter((p: any) => p.status === 'PUBLISHED' || p.status === 'RESERVED' || p.status === 'SOLD' || p.status === 'RENTED')
    .map((p: any) => ({
      ...p,
      operationType:
        p.operation === 'SELL'
          ? OperationType.SELL
          : p.operation === 'RENT'
            ? OperationType.RENT
            : undefined,
      image: p.main_image || '',
      price: p.price_amount ? `${Number(p.price_amount).toLocaleString('de-DE')} €` : undefined,
      title: p.title,
      slug: p.slug,
      id: p.id,
      available_from: p.available_from,
      deposit: p.deposit,
      furnished: p.furnished,
      type: p.type,
    }));

  const filteredProperties = properties.filter((p: any) => p.operationType === OperationType.SELL);
  const title = 'Alle Kauf-Immobilien';

  if (!filteredProperties.length) {
    return (
      <main className="px-2 py-6">
        <div className="fixed top-0 right-0 z-50 w-full h-px" bg-red-600/>
        {/* <div className="fixed bottom-0 right-0 z-20 w-full h-1"  /> */}
        <Title
          title="Willkommen bei Rumpke Immobilien"
          className="text-center text-3xl md:text-4xl font-bold text-black dark:text-white"
        />
        <div className="text-center text-xl md:text-2xl font-medium text-black dark:text-white mt-1 mb-6">
          – Mehr als nur 4 Wände –
        </div>
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        <div className="flex items-center justify-center min-h-[40vh] w-full">
          <span className="text-lg font-semibold text-gray-500 dark:text-gray-300">Zurzeit gibt es keine Immobilien zum Kauf.</span>
        </div>
      </main>
    );
  }

  return (
    <main className="px-2 py-6">
      <Title
        title="Willkommen bei Rumpke Immobilien"
        className="text-center text-3xl md:text-4xl font-bold text-black dark:text-white"
      />
      <div className="text-center text-xl md:text-2xl font-medium text-black dark:text-white mt-1 mb-6">
        – Mehr als nur 4 Wände –
      </div>
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <PropertiesGrid properties={filteredProperties} />
    </main>
  );
}
