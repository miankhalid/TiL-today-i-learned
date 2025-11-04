import { storage } from './mmkv';

/**
 * Helper function to get the current access token from storage
 */
export const getAccessToken = (): null | string => {
  // This function is now primarily for consistency,
  // although we get the token directly from Supabase client in the interceptor
  const keys = storage.getAllKeys();
  const accessTokenKey = keys.find(
    (key) => key.includes('access-token') || key.includes('auth-token'),
  );

  if (accessTokenKey) {
    return storage.getString(accessTokenKey) || null;
  }

  return null;
};

/**
 * Helper function to set the access token in storage
 */
export const setAccessToken = (token: string): void => {
  storage.set('sb-access-token', token);
};

/**
 * Helper function to clear the access token from storage
 */
export const clearAccessToken = (): void => {
  storage.delete('sb-access-token');
};
