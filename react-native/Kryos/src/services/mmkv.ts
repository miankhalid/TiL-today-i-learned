import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// Custom storage adapter for Supabase
export const supabaseStorageAdapter = {
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ?? undefined;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
};
