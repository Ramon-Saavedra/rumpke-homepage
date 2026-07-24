import Link from 'next/link';
import { Home, MapPin } from 'lucide-react';
import PropertyImage from './PropertyImage';
import type { PropertyCardDto } from '@/types/property-api';
import { resolveDisplayPrice, formatArea } from '@/lib/property-formatters';

interface PropertyCardProps {
  readonly property: PropertyCardDto;
  readonly preload?: boolean;
}

export default function PropertyCard({ property, preload = false }: PropertyCardProps) {
  const displayLocation = property.city ?? undefined;
  const displayPrice = resolveDisplayPrice(
    property.marketingType,
    property.salePrice,
    property.coldRent,
  );
  const displayType = property.propertySubType ?? property.propertyType ?? undefined;
  const isRent = property.marketingType === 'miete';

  return (
    <Link
      href={`/objekt/${property.id}`}
      className="group block hover:bg-bgSecondary-l dark:hover:bg-bgSecondary-d transition-colors rounded overflow-hidden"
    >
      <article className="group relative flex flex-col dark:border-border-d overflow-hidden shadow-lg">
        <div className="relative h-64 md:h-48 shrink-0 overflow-hidden">
          <PropertyImage
            images={property.images}
            alt={property.title ?? property.id}
            className="h-full w-full"
            priority={preload}
          />

          {displayType && (
            <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded text-xs font-medium">
              {displayType}
            </div>
          )}
        </div>

        <div className="p-3 flex flex-col flex-1 bg-bgSecondary-l dark:bg-bgSecondary-d">
          <h2 className="text-base font-bold text-text-l dark:text-text-d mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {property.title ?? `Immobilie ${property.id}`}
          </h2>

          {displayLocation && (
            <div className="flex items-center gap-2 text-card-text-l dark:text-card-text-d mb-2">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="text-xs line-clamp-1">{displayLocation}</span>
            </div>
          )}

          <div className="flex items-center gap-3 text-xs text-card-text-l dark:text-card-text-d mb-auto">
            {property.livingArea !== null && (
              <div className="flex items-center gap-1">
                <Home className="w-3 h-3" />
                <span>{formatArea(property.livingArea)}</span>
              </div>
            )}
            {property.rooms !== null && (
              <div>
                {property.rooms} Zimmer
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-l dark:border-border-d">
            {displayPrice && (
              <div className="text-sm font-bold text-primary">
                {displayPrice}
              </div>
            )}
            {property.marketingType && (
              <div
                className={`px-2 py-1 rounded text-xs font-medium text-white ${
                  isRent ? 'bg-rent' : 'bg-buy'
                }`}
              >
                {isRent ? 'Mieten' : 'Kaufen'}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
