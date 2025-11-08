import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PostServices } from './postService';

export const usePosts = () => {
  return useQuery({
    queryFn: async () => await PostServices.fetchAll(),
    queryKey: ['posts'],
  });
};

export const usePost = (postId: string) => {
  return useQuery({
    queryFn: async () => await PostServices.fetchById(postId),
    queryKey: ['posts', postId],
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData) => await PostServices.create(postData),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postData, postId }: { postData: Partial<{ content: string; parent_id: string }>; postId: string; }) =>
      await PostServices.update(postId, postData),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId) => await PostServices.delete(postId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};