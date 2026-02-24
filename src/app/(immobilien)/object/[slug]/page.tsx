"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ObjectSlideshow from '@/components/properties/ObjectSlideshow';
import PropertyDetails from '@/components/properties/PropertyDetails';
import { IoLocationSharp } from 'react-icons/io5';
import PropertyTypeCorner from '@/components/properties/PropertyTypeCorner';
import { OperationType } from '@/store/ui/ui-store';
import TrustBannerFoto from '@/components/ui/trust-baner-foto/TrustBannerFoto';
import LogoMobile from '@/components/ui/logo-mobile/LogoMobile';
import { getApiUrl, API_ENDPOINTS } from '@/lib/api-client';
import type { PropertyDetails as PropertyDetailsType } from '@/types';

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [property, setProperty] = useState<PropertyDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(false);
    fetch(getApiUrl(API_ENDPOINTS.PROPERTY_BY_SLUG(slug)))
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setProperty(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="p-8 text-center text-lg">Lädt...</div>;
  if (error || !property) return <div className="p-8 text-center text-error text-lg">Eigenschaft nicht gefunden.</div>;

  return (
    <div className="min-h-screen w-full bg-bg-l text-zinc-800 dark:bg-bg-d dark:text-zinc-100">
      <div className="w-full py-2 bg-secondary dark:bg-secondary-dark flex items-center justify-center mb-4">
        <LogoMobile />
      </div>
      <header className="w-full flex flex-col items-start gap-1 pb-2 mb-2 max-w-5xl mx-auto px-2">
        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {(() => {
              const rawType = property.operation;
              const enumType = OperationType[rawType as keyof typeof OperationType];
              const label = enumType === OperationType.SELL ? 'Kauf' : enumType === OperationType.RENT ? 'Miete' : '';
              return (
                <span className="flex items-center gap-1">
                  <PropertyTypeCorner type={enumType} style={{ position: 'static' }} size={12} />
                  {label && <span className="text-xs font-semibold text-card-text-l dark:text-card-text-d">{label}</span>}
                </span>
              );
            })()}
            <h1 className="text-3xl font-bold mb-0">{property.title}</h1>
          </div>
          {(() => {
            const rawType = property.operation;
            const enumType = OperationType[rawType as keyof typeof OperationType];
            const priceLabel = enumType === OperationType.SELL ? 'Kaufpreis' : enumType === OperationType.RENT ? 'Miete' : '';
            return (
              <span className="text-sm font-semibold text-primary">
                {priceLabel}: {property.price_amount ? `${property.price_amount} ${property.price_currency || 'EUR'}` : '—'}
              </span>
            );
          })()}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <IoLocationSharp className="h-4 w-4 text-card-text-l dark:text-card-text-d" />
          <span className="text-xs text-card-text-l dark:text-card-text-d">
            {property.location?.city}
            {property.location?.postal_code ? `, ${property.location.postal_code}` : ''}
          </span>
        </div>
      </header>
      <section className="w-full flex flex-col items-center mb-8">
        <ObjectSlideshow
          images={property.images && property.images.length > 0 ? property.images.map(img => img.url) : [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
          ]}
          modalMode
        />
      </section>
      <main className="w-full max-w-5xl mx-auto px-2 pb-12 flex flex-col gap-8">
        <PropertyDetails
          title={property.title}
          price={property.price_amount ? `${property.price_amount}` : undefined}
          city={property.location?.city}
          postal_code={property.location?.postal_code}
          images={property.images?.map(img => img.url) || []}
          rooms={property.specs?.rooms}
          built_area_m2={property.specs?.area_sqm}
          plot_area_m2={property.specs?.area_sqm}
          description={property.description}
        />
      </main>
      <TrustBannerFoto title="Persönliche Beratung und Betreuung – Wir sind für Sie da!" />
    </div>
  );
}
