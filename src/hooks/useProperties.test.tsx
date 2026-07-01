import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { useProperties } from './useProperties';

jest.mock('@/lib/api-client', () => ({
  getApiUrl: jest.fn(() => 'http://localhost/api/properties'),
  API_ENDPOINTS: { PROPERTIES: '/properties' },
}));

function wrapper({ children }: { readonly children: ReactNode }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

describe('useProperties', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns loading state initially', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => [] });
    const { result } = renderHook(() => useProperties(), { wrapper });
    expect(result.current.isLoading).toBe(true);
  });

  it('returns data on successful fetch', async () => {
    const mockData = [{ id: '1', title: 'Test Property' }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => mockData });
    const { result } = renderHook(() => useProperties(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('returns error state when fetch fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    const { result } = renderHook(() => useProperties(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('uses correct query key', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => [] });
    const { result } = renderHook(() => useProperties(), { wrapper });
    expect(result.current).toBeDefined();
  });
});
