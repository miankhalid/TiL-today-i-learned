import type { CreatePostData, Post } from '@/types/types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createPostWithRestAPI, fetchPostsByUserFromRestAPI, fetchPostsFromRestAPI } from '@/services/posts';

/**
 * Custom hook to fetch posts
 */
export const usePosts = () => {
  return useQuery<Post[], Error>({
    queryFn: () => fetchPostsFromRestAPI(),
    queryKey: ['posts'],
  });
};

/**
 * Custom hook to create a post
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData: CreatePostData) => createPostWithRestAPI(postData),
    onSuccess: () => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

/**
 * Custom hook to fetch posts by a specific user
 */
export const usePostsByUser = (userId: string) => {
  return useQuery<Post[], Error>({
    queryFn: () => fetchPostsByUserFromRestAPI(userId),
    queryKey: ['posts', 'user', userId],
  });
};
