import React from 'react';
import ObjectSlideshow from './ObjectSlideshow';

type PropertyDetailsProps = {
  title?: string;
  price?: string;
  city?: string;
  postal_code?: string;
  description?: string;
  images?: string[];
  rooms?: number;
  built_area_m2?: string | number | null;
  plot_area_m2?: string | number | null;
};


const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  title = 'Beispiel Immobilie',
  price = '€ 350.000',
  city = 'Berlin',
  postal_code = '10115',
  description = 'Beispielimmobilie mit allen modernen Annehmlichkeiten und ausgezeichneter Lage.',
  images,
  rooms = 4,
  built_area_m2 = 120,
  plot_area_m2 = 300,
}) => {
  return (
    <div className="w-full  mx-auto rounded shadow p-4">
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2 text-primary">{title}</h2>
        <div className="text-lg font-semibold text-error mb-2">{price}</div>
        <div className="text-sm text-card-text-l dark:text-card-text-d mb-2">
          {city}, {postal_code}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-card-text-l dark:text-card-text-d mb-2">
          <span>Zimmer: <b>{rooms}</b></span>
          <span>Wohnfläche: <b>{built_area_m2} m²</b></span>
          <span>Grundstück: <b>{plot_area_m2} m²</b></span>
        </div>
        <p className="text-base text-card-text-l dark:text-card-text-d mt-2">{description}</p>
      </div>
    </div>
  );
};

export default PropertyDetails;
