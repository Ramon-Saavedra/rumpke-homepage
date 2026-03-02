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
}

export interface TripleSliderProps {
  properties: FeaturedProperty[];
  speed?: number;
}
