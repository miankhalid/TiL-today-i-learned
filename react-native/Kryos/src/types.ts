import type { User as SupabaseUser } from '@supabase/supabase-js';

// User type based on dummy data and potential Supabase user structure
export type User = {
  bio?: null | string;
  id: string;
  image?: null | string;
  name: string;
  username: string;
}

// Post type based on dummy data
export type Post = {
  content: string;
  created_at: string;
  id: string;
  parent: null | Post; // For replies, though not fully implemented yet
  parent_id: null | string;
  replies?: Post[]; // Array of replies
  user?: User; // Nested user object for convenience
  user_id: string;
}

// Extend Supabase user type if needed for auth context
export type AppUser = {
  // Add custom user metadata fields here if any
} & SupabaseUser;
