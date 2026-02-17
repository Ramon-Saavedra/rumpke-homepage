"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertiesGrid from '@/components/properties/PropertiesGrid';

export default function ImmobilienClientPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch('http://localhost:3000/property', { cache: 'no-store' });
        if (!res.ok) throw new Error('Fetch error');
        let data = await res.json();
        data = data.filter((p: any) =>
          p.status === 'PUBLISHED' || p.status === 'RESERVED' || p.status === 'SOLD' || p.status === 'RENTED'
        ).map((p: any, idx: number) => ({
          ...p,
          operationType:
            p.operation === 'SELL'
              ? 'SELL'
              : p.operation === 'RENT'
                ? 'RENT'
                : undefined,
          image:
            p.main_image && p.main_image.startsWith('https://images.unsplash.com/')
              ? p.main_image
              : '',
          images: [
            `/properties/fake${(idx % 3) + 1}.jpg`,
            `/properties/fake${((idx + 1) % 3) + 1}.jpg`,
            `/properties/fake${((idx + 2) % 3) + 1}.jpg`,
          ],
          price: p.price_amount ? `${Number(p.price_amount).toLocaleString('de-DE')} €` : undefined,
          title: p.title,
          slug: p.slug,
          id: p.id,
          available_from: p.available_from,
          deposit: p.deposit,
          furnished: p.furnished,
        }));

        if (type) {
          data = data.filter((p: any) => (p.type || '').toLowerCase() === type.toLowerCase());
        }
        setProperties(data);
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
    <div className="">
      <h1 className="text-xl sm:text-xl font-semibold text-center py-6">Alle Immobilien</h1>
      <PropertiesGrid
        properties={properties}
      />
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


