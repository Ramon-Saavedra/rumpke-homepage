import Image from 'next/image';
import Link from 'next/link';
import { Home, MapPin } from 'lucide-react';

interface PropertyCardProps {
  slug: string;
  title: string;
  type: string;
  price: string;
  location: string;
  imageUrl: string;
  area?: string;
  rooms?: number;
  operationType?: 'kauf' | 'miete';
  preload?: boolean;
}

export default function PropertyCard({
  slug,
  title,
  type,
  price,
  location,
  imageUrl,
  area,
  rooms,
  operationType,
  preload = false
}: PropertyCardProps) {
  return (
    <Link href={`/object/${slug}`}>
      <article className="group relative h-96 flex flex-col dark:border-border-d overflow-hidden shadow-lg">
        {/* Image */}
        <div className="relative h-48 shrink-0 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={preload ? "eager" : "lazy"}
            preload={preload}
          />

          {/* Type Badge */}
          <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded text-xs font-medium">
            {type}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col flex-1 bg-bgSecondary-l dark:bg-bgSecondary-d">
          <h2 className="text-base font-bold text-text-l dark:text-text-d mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h2>

          <div className="flex items-center gap-2 text-card-text-l dark:text-card-text-d mb-2">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="text-xs line-clamp-1">{location}</span>
          </div>

          {/* Details */}
          <div className="flex items-center gap-3 text-xs text-card-text-l dark:text-card-text-d mb-auto">
            {area && (
              <div className="flex items-center gap-1">
                <Home className="w-3 h-3" />
                <span>{area}</span>
              </div>
            )}
            {rooms && (
              <div>
                {rooms} Zimmer
              </div>
            )}
          </div>

          {/* Price and Operation Type */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-l dark:border-border-d">
            <div className="text-sm font-bold text-primary">
              {price}
            </div>
            {operationType && (
              <div className={`px-2 py-1 rounded text-xs font-medium text-white ${operationType === 'kauf' ? 'bg-buy' : 'bg-rent'
                }`}>
                {operationType === 'kauf' ? 'Kaufen' : 'Mieten'}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
