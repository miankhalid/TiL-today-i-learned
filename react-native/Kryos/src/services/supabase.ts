import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@env';
import { createClient } from '@supabase/supabase-js';

import { supabaseStorageAdapter } from './mmkv';

// Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: false,
    persistSession: true,
    storage: supabaseStorageAdapter,
  },
});
