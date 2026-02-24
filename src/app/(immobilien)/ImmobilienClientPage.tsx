"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertiesGrid from '@/components/properties/PropertiesGrid';
import { getApiUrl, API_ENDPOINTS } from '@/lib/api-client';
import type { PropertyDetails, PropertyCard, PropertyOperation } from '@/types';

export default function ImmobilienClientPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [properties, setProperties] = useState<PropertyCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(getApiUrl(API_ENDPOINTS.PROPERTIES), { cache: 'no-store' });
        if (!res.ok) throw new Error('Fetch error');
        const rawData: PropertyDetails[] = await res.json();

        let filteredData: PropertyCard[] = rawData
          .filter((p: PropertyDetails) =>
            p.status === 'PUBLISHED' || p.status === 'RESERVED' || p.status === 'SOLD' || p.status === 'RENTED'
          )
          .map((p: PropertyDetails, idx: number): PropertyCard => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            operationType: p.operation as PropertyOperation,
            image: p.main_image && p.main_image.startsWith('https://images.unsplash.com/') ? p.main_image : '',
            images: [
              `/properties/fake${(idx % 3) + 1}.jpg`,
              `/properties/fake${((idx + 1) % 3) + 1}.jpg`,
              `/properties/fake${((idx + 2) % 3) + 1}.jpg`,
            ],
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

        if (type) {
          filteredData = filteredData.filter((p: PropertyCard) => (p.type || '').toLowerCase() === type.toLowerCase());
        }
        setProperties(filteredData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, [type]);

  if (loading) return <Loader />;
  if (error) return <div className="p-4 font-semibold text-error">Eigenschaften konnten nicht geladen werden.</div>;

  return (
    <div className="relative min-h-full w-full">
      {/* Dot pattern background - Light mode */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundColor: '#F5F5F5',
          backgroundImage: 'radial-gradient(rgba(12, 12, 12, 0.171) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          backgroundPosition: '-5px -5px'
        }}
      />
      {/* Dot pattern background - Dark mode */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          backgroundColor: '#18181C',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          backgroundPosition: '-5px -5px'
        }}
      />
      <div className="relative z-10">
        <h1 className="text-xl sm:text-xl font-semibold text-center py-6">Alle Immobilien</h1>
        <PropertiesGrid
          properties={properties}
        />
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
    </div>
  );
}


