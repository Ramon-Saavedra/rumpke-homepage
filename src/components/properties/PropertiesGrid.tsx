
"use client";


import PropertyCard from './PropertyCard';
import { OperationType } from '@/store/ui/ui-store';

interface Property {
  id: string;
  slug: string;
  title: string;
  image: string;
  price?: string;
  operationType: OperationType;
}


interface PropertiesGridProps {
  properties: Property[];
  onSelectProperty?: (property: any) => void;
  category?: string;
  children?: React.ReactNode;
}



const PropertiesGrid: React.FC<PropertiesGridProps> = ({ properties, onSelectProperty, children }) => {
  const title = 'Immobilienangebote';

  return (
    <>
      <div className="">
        <h2 className="text-xl sm:text-xl mb-16 px-2 sm:px-0 xl:text-center">{title}</h2>

      </div>
      <div className="sm:p-1">
        {properties.map((property) => (
          <a
            key={property.id}
            href={`/object/${property.slug}`}
            className="block"
            tabIndex={0}
          >
            <PropertyCard
              property={property}
            />
          </a>
        ))}
        {children}
      </div>

    </>
  );
};

export default PropertiesGrid;
