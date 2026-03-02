'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Parallax } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Link from 'next/link';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/controller';
import 'swiper/css/parallax';

import type { TripleSliderProps } from './TripleSlider.types';

export default function TripleSlider({
  properties,
  speed = 600
}: TripleSliderProps) {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [prevSwiper, setPrevSwiper] = useState<SwiperType | null>(null);
  const [nextSwiper, setNextSwiper] = useState<SwiperType | null>(null);

  const commonParams = {
    modules: [Controller, Parallax],
    speed,
    loop: true,
    parallax: true,
    grabCursor: true,
  };

  return (
    <section className="w-full py-6 sm:py-8 bg-background-l dark:bg-background-d">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-text-l dark:text-text-d">
          Ausgewählte Immobilien
        </h2>

        <div className="triple-slider relative w-full max-w-5xl mx-auto h-[400px] sm:h-[500px]">
          {/* Previous Swiper (Left) */}
          <div className="triple-slider-prev">
            <Swiper
              {...commonParams}
              onSwiper={setPrevSwiper}
              controller={{ control: mainSwiper }}
              allowTouchMove={false}
              onClick={() => mainSwiper?.slidePrev()}
            >
              {properties.map((property) => (
                <SwiperSlide key={`prev-${property.id}`}>
                  <div className="relative h-[400px] sm:h-[500px] rounded overflow-hidden">
                    <Image
                      src={property.imageUrl}
                      alt={property.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Main Swiper (Center) */}
          <div className="triple-slider-main">
            <Swiper
              {...commonParams}
              onSwiper={setMainSwiper}
              controller={{
                control: [prevSwiper, nextSwiper].filter((s): s is SwiperType => s !== null)
              }}
            >
            {properties.map((property) => (
              <SwiperSlide key={`main-${property.id}`}>
                <Link href={`/object/${property.slug}`}>
                  <div className="relative h-[400px] sm:h-[500px] rounded overflow-hidden cursor-pointer group">
                    <Image
                      src={property.imageUrl}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 70vw"
                      priority
                    />

                    <div
                      className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
                      data-swiper-parallax="-30%"
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <div
                          className="mb-2 text-primary"
                          data-swiper-parallax="-100"
                        >
                          <span className="text-sm font-medium uppercase tracking-wide">
                            {property.type}
                          </span>
                        </div>

                        <h3
                          className="text-2xl sm:text-3xl font-bold text-white mb-2"
                          data-swiper-parallax="-200"
                        >
                          {property.title}
                        </h3>

                        <p
                          className="text-white/90 mb-3"
                          data-swiper-parallax="-250"
                        >
                          {property.location}
                        </p>

                        <div
                          className="flex items-center justify-between"
                          data-swiper-parallax="-300"
                        >
                          <span className="text-2xl font-bold text-white">
                            {property.price}
                          </span>

                          {property.area && (
                            <span className="text-white/80">
                              {property.area}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          </div>

          {/* Next Swiper (Right) */}
          <div className="triple-slider-next">
            <Swiper
              {...commonParams}
              onSwiper={setNextSwiper}
              controller={{ control: mainSwiper }}
              allowTouchMove={false}
              onClick={() => mainSwiper?.slideNext()}
            >
            {properties.map((property) => (
              <SwiperSlide key={`next-${property.id}`}>
                <div className="relative h-[400px] sm:h-[500px] rounded overflow-hidden">
                  <Image
                    src={property.imageUrl}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </SwiperSlide>
            ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
