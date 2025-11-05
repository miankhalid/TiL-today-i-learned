import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PostServices } from './postService';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: PostServices.fetchAll,
  });
};

export const usePost = (postId: string) => {
  return useQuery({
    queryKey: ['posts', postId],
    queryFn: () => PostServices.fetchById(postId),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: PostServices.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ postId, postData }: { postId: string; postData: Partial<{ content: string; parent_id: string }> }) => 
      PostServices.update(postId, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: PostServices.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};