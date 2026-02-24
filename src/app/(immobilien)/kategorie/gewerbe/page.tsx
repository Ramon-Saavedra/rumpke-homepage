import PropertiesGrid from '@/components/properties/PropertiesGrid';
import { Title } from '@/components/ui/title/Title';
import { getApiUrl, API_ENDPOINTS } from '@/lib/api-client';
import type { PropertyDetails, PropertyCard } from '@/types';

export default async function GewerbePage() {
  let properties: PropertyCard[] = [];
  let error = false;

  try {
    const res = await fetch(getApiUrl(API_ENDPOINTS.PROPERTIES), { cache: 'no-store' });
    if (!res.ok) {
      error = true;
    } else {
      const data: PropertyDetails[] = await res.json();
      properties = data
        .filter((p: PropertyDetails) =>
          p.status === 'PUBLISHED' || p.status === 'RESERVED' || p.status === 'SOLD' || p.status === 'RENTED'
        )
        .map((p: PropertyDetails): PropertyCard => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          operationType: p.operation,
          image: p.main_image || '',
          images: p.images?.map(img => img.url) || [],
          price: p.price_amount ? `${Number(p.price_amount).toLocaleString('de-DE')} €` : undefined,
          type: p.type,
          city: p.location?.city,
          area_sqm: p.specs?.area_sqm,
          rooms: p.specs?.rooms,
          available_from: p.available_from,
          deposit: p.financials?.deposit,
          furnished: p.furnished,
          status: p.status,
        }));
    }
  } catch {
    error = true;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full">
        <span className="text-lg font-semibold text-error">Eigenschaften konnten nicht geladen werden.</span>
      </div>
    );
  }

  const type = 'gewerbe';
  const title = 'Alle Gewerbe';
  const filteredProperties = properties.filter((p: PropertyCard) => (p.type || '').toLowerCase() === type);

  if (!filteredProperties.length) {
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
        <div className="flex items-center justify-center min-h-[40vh] w-full">
          <span className="text-lg font-semibold text-gray-500 dark:text-gray-300">Zurzeit gibt es keine Gewerbe in dieser Kategorie.</span>
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

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
    </div>
  );
}
