'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import PropertyCard from './PropertyCard';

import 'swiper/css';
import 'swiper/css/navigation';

interface Property {
  id: string;
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

interface PropertiesGridProps {
  properties: Property[];
}

export default function PropertiesGrid({ properties }: PropertiesGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-card-text-l dark:text-card-text-d">
          Keine Immobilien gefunden.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        spaceBetween={4}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {properties.map((property, index) => (
          <SwiperSlide key={property.id}>
            <PropertyCard
              slug={property.slug}
              title={property.title}
              type={property.type}
              price={property.price}
              location={property.location}
              imageUrl={property.imageUrl}
              area={property.area}
              rooms={property.rooms}
              operationType={property.operationType}
              preload={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
