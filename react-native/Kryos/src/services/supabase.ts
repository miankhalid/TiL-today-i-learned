import 'react-native-url-polyfill/auto';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@env';
import { createClient } from '@supabase/supabase-js';

// Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // As this is a mobile app, we can't use localStorage. We will use
    // react-native-mmkv as our storage adapter.
    // We will set this up in the next task.
    autoRefreshToken: true,
    detectSessionInUrl: false,
    persistSession: true,
  },
});
