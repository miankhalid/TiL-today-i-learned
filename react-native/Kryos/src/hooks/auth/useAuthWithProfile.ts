import { useEffect } from 'react';

import { fetchUserProfile } from '@/services/profileService';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearProfile, setProfile, setProfileError, setProfileLoading } from '@/store/slices/profileSlice';

import { useAuth } from './useAuth';

export const useAuthWithProfile = () => {
  const { loading: authLoading, session } = useAuth();
  const dispatch = useAppDispatch();
  const { loading: profileLoading, profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    const loadProfile = async () => {
      if (session?.user) {
        try {
          dispatch(setProfileLoading(true));
          const profileData = await fetchUserProfile();
          dispatch(setProfile(profileData));
        } catch (error) {
          console.error('Error loading profile:', error);
          dispatch(setProfileError(error instanceof Error ? error.message : 'Failed to load profile'));
        }
      } else {
        // Clear profile when no session
        dispatch(clearProfile());
      }
    };

    void loadProfile();
  }, [session, dispatch]);

  return {
    loading: authLoading || profileLoading,
    profile,
    session,
  };
};