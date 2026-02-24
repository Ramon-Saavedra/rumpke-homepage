import { useQuery } from '@tanstack/react-query';
import { getApiUrl, API_ENDPOINTS } from '@/lib/api-client';
import type { PropertyDetails } from '@/types';

export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async (): Promise<PropertyDetails[]> => {
      const res = await fetch(getApiUrl(API_ENDPOINTS.PROPERTIES), { cache: 'no-store' });
      if (!res.ok) throw new Error('Error al cargar propiedades');
      return res.json();
    },
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
}
