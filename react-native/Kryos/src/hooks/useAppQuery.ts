import { useQuery, UseQueryOptions } from '@tanstack/react-query';

// A generic type for the data and error
type AppQueryOptions<TData, TError = Error> = UseQueryOptions<TData, TError>;

export const useAppQuery = <TData, TError = Error>(
  options: AppQueryOptions<TData, TError>,
) => {
  const CACHE_TIME_IN_MS = 1000 * 60 * 10; // 10 minutes
  const REFETCH_TIME_IN_MS = 1000 * 60 * 5; // 5 minutes

  const defaultOptions: AppQueryOptions<TData, TError> = {
    cacheTime: CACHE_TIME_IN_MS,
    refetchOnWindowFocus: false,
    staleTime: REFETCH_TIME_IN_MS,
    // global defaults go here
  };

  return useQuery<TData, TError>({
    ...defaultOptions,
    ...options,
  });
};
