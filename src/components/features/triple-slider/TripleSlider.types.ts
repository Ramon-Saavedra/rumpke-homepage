export interface FeaturedProperty {
  id: string;
  title: string;
  type: string;
  price: string;
  location: string;
  imageUrl: string;
  slug: string;
  area?: string;
  rooms?: number;
  operationType?: 'kauf' | 'miete';
}

export interface TripleSliderProps {
  properties: FeaturedProperty[];
  speed?: number;
}
