import { POSTS_API } from '@/services/apiEndpoints';
import instance from '@/services/instance';

import { Post } from '@/types/types';

export const PostServices = {
  addComment: async (commentData: { content: string; post_id: string; user_id?: string }): Promise<Post> => {
    const response = await instance.post<Post>(POSTS_API.ADD_COMMENT(), commentData);
    return response.data;
  },

  create: async (postData: { content: string; parent_id?: string; user_id?: string; }): Promise<Post> => {
    const response = await instance.post<Post>(POSTS_API.CREATE(), postData);
    return response.data;
  },

  delete: async (postId: string): Promise<void> => {
    await instance.delete(POSTS_API.DELETE(postId));
    // Return void for delete operations
    return;
  },

  fetchAll: async (): Promise<Post[]> => {
    const endpoint = POSTS_API.GET_ALL();
    
    try {
      const response = await instance.get<Post[]>(endpoint);
      return response.data;
    } catch (error) {
      console.error('[PostServices] fetchAll - Error:', error);
      throw error;
    }
  },

  fetchById: async (postId: string): Promise<Post> => {
    const response = await instance.get<Post>(POSTS_API.GET_BY_ID(postId));
    return response.data;
  },

  fetchByUser: async (userId: string): Promise<Post[]> => {
    const response = await instance.get<Post[]>(POSTS_API.GET_BY_USER(userId));
    return response.data;
  },

  fetchComments: async (postId: string): Promise<Post[]> => {
    const response = await instance.get<Post[]>(POSTS_API.GET_COMMENTS(postId));
    return response.data;
  },

  fetchUserLikes: async (userId: string): Promise<Post[]> => {
    const response = await instance.get<Post[]>(POSTS_API.USER_LIKES(userId));
    return response.data;
  },

  likePost: async (likeData: { post_id: string; user_id?: string }): Promise<Post> => {
    const response = await instance.post<Post>(POSTS_API.LIKE_POST(), likeData);
    return response.data;
  },

  unlikePost: async (postId: string, userId: string): Promise<void> => {
    await instance.delete(POSTS_API.UNLIKE_POST(postId, userId));
    // Return void for unlike operations
    return;
  },

  update: async (postId: string, postData: Partial<{ content: string; parent_id: string }>): Promise<Post> => {
    const response = await instance.patch<Post>(POSTS_API.UPDATE(postId), postData);
    return response.data;
  },
};
export type { Post };

