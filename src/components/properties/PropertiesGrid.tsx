"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import PropertyCard from "./PropertyCard";
import type { PropertyCardDto } from "@/types/property-api";

import "swiper/css";
import "swiper/css/navigation";

interface PropertiesGridProps {
  readonly properties: readonly PropertyCardDto[];
}

export default function PropertiesGrid({ properties }: PropertiesGridProps) {
  if (properties.length === 0) return null;

  return (
    <div className="relative border border-border-l dark:border-border-d p-2 rounded">
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
            <PropertyCard property={property} preload={index === 0} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
