"use client";
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';

type ObjectSlideshowProps = {
  images: string[];
  alt?: string;
  modalMode?: boolean;
};


const defaultImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1467987506553-8f3916508521?auto=format&fit=crop&w=800&q=80',
];

const ObjectSlideshow: React.FC<ObjectSlideshowProps> = ({ images = defaultImages, alt, modalMode }) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);


  const mainSliderClass = modalMode
    ? 'w-full max-w-4xl md:max-w-5xl rounded overflow-hidden mb-6'
    : 'w-full max-w-2xl rounded overflow-hidden mb-4';
  const thumbSliderClass = modalMode
    ? 'w-full max-w-4xl md:max-w-5xl'
    : 'w-full max-w-2xl';
  const thumbImgClass = 'relative w-full aspect-[4/3] h-16 md:h-20 cursor-pointer border border-border-l dark:border-border-d hover:border-primary dark:hover:border-primary-dark rounded overflow-hidden';

  return (
    <div className="w-full flex flex-col items-center min-w-[320px] min-h-[300px]">
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Thumbs, Navigation]}
        className={mainSliderClass}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full aspect-video bg-gray-100 dark:bg-card-secondary-bg-d">
              <Image
                src={src}
                alt={alt || `Immobilienbild ${idx + 1}`}
                fill
                className="object-cover"
                sizes={modalMode ? '(max-width: 1024px) 100vw, 70vw' : '(max-width: 768px) 100vw, 50vw'}
                priority={idx === 0}
                unoptimized={src.startsWith('http') && !src.includes('cloudinary')}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={Math.min(images.length, modalMode ? 8 : 6)}
        watchSlidesProgress
        modules={[Thumbs]}
        className={thumbSliderClass}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className={thumbImgClass}>
              <Image
                src={src}
                alt={alt || `Immobilienbild Thumb ${idx + 1}`}
                fill
                className="object-cover"
                sizes={modalMode ? '96px' : '64px'}
                unoptimized={src.startsWith('http') && !src.includes('cloudinary')}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ObjectSlideshow;
