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
  operationType
}: PropertyCardProps) {
  return (
    <Link href={`/object/${slug}`}>
      <article className="group relative bg-background-l dark:bg-background-d border border-border-l dark:border-border-d rounded overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Type Badge */}
          <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded text-sm font-medium">
            {type}
          </div>

          {/* Operation Type Badge */}
          {operationType && (
            <div className={`absolute top-3 right-3 px-3 py-1 rounded text-sm font-medium text-white ${operationType === 'kauf' ? 'bg-buy' : 'bg-rent'
              }`}>
              {operationType === 'kauf' ? 'Kaufen' : 'Mieten'}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-xl font-bold text-text-l dark:text-text-d mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-2 text-card-text-l dark:text-card-text-d mb-3">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>

          {/* Details */}
          <div className="flex items-center gap-4 text-sm text-card-text-l dark:text-card-text-d mb-4">
            {area && (
              <div className="flex items-center gap-1">
                <Home className="w-4 h-4" />
                <span>{area}</span>
              </div>
            )}
            {rooms && (
              <div>
                {rooms} Zimmer
              </div>
            )}
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-primary">
            {price}
          </div>
        </div>
      </article>
    </Link>
  );
}
