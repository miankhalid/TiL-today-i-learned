import { supabase } from './supabase';

// Define the profile type based on typical Supabase profile structure
export type Profile = {
  avatar_url: null | string;
  email: string; // Email is typically stored in auth.users
  full_name: null | string;
  id: string;
  updated_at: null | string;
  username: null | string;
  website: null | string;
};

export type UpdateProfileData = Partial<Pick<Profile, 'avatar_url' | 'full_name' | 'username' | 'website'>>;

/**
 * Fetch the current user's profile from Supabase
 */
export const fetchUserProfile = async (): Promise<null | Profile> => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) {
    throw new Error('No authenticated user found');
  }

  // First get the auth user info
  const userId = session.user.id;
  const userEmail = session.user.email ?? '';

  // Then get profile data from the profiles table
  const { data, error } = await supabase
    .from('profiles')
    .select('username, full_name, avatar_url, website, updated_at')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
    console.error('Error fetching profile:', error);
    throw new Error(error.message);
  }

  // If no profile exists, return default profile with just email
  if (!data) {
    return {
      avatar_url: null,
      email: userEmail,
      full_name: null,
      id: userId,
      updated_at: null,
      username: null,
      website: null,
    };
  }

  // Return profile data combined with user email
  return {
    ...data,
    email: userEmail,
    id: userId,
  };
};

/**
 * Update the current user's profile in Supabase
 */
export const updateProfile = async (profileData: UpdateProfileData): Promise<Profile> => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) {
    throw new Error('No authenticated user found');
  }

  const userId = session.user.id;
  const userEmail = session.user.email ?? '';

  // Check if profile exists, if not create it
  const { data: existingProfile, error: fetchError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .single();

  let upsertResult;
  if (fetchError?.code === 'PGRST116') {
    // Profile doesn't exist, insert new profile
    upsertResult = await supabase
      .from('profiles')
      .insert([{ id: userId, ...profileData }])
      .select()
      .single();
  } else {
    // Profile exists, update it
    upsertResult = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single();
  }

  if (upsertResult.error) {
    console.error('Error updating profile:', upsertResult.error);
    throw new Error(upsertResult.error.message);
  }

  // Return updated profile data with email
  return {
    ...upsertResult.data,
    email: userEmail,
  };
};