import { useAppQuery } from '@/hooks/useAppQuery';
import { ProfileService } from '@/services/profileService';
import { Profile } from '@/types/types';

export const useUserQuery = (userId: string) => {
  return useAppQuery<Profile>({ 
    queryKey: ['user', userId],
    queryFn: () => ProfileService.fetchProfileById(userId),
    enabled: !!userId,
  });
};
