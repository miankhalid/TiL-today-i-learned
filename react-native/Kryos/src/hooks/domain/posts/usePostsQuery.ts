import { useAppQuery } from '@/hooks/useAppQuery';
import { PostServices } from '@/hooks/domain/posts/postService';
import { Post } from '@/types/types';

export const usePostsQuery = () => {
  return useAppQuery<Post[]>({ 
    queryKey: ['posts'],
    queryFn: PostServices.fetchAll,
  });
};
