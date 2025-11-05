import { POSTS_API } from '@/services/apiEndpoints';
import instance from '@/services/instance';

export const PostServices = {
  addComment: async (commentData: { content: string; post_id: string; user_id?: string }) => {
    const response = await instance.post(POSTS_API.ADD_COMMENT(), commentData);
    return response.data;
  },

  create: async (postData: { content: string; parent_id?: string; user_id?: string; }) => {
    const response = await instance.post(POSTS_API.CREATE(), postData);
    return response.data;
  },

  delete: async (postId: string) => {
    const response = await instance.delete(POSTS_API.DELETE(postId));
    return response.data;
  },

  fetchAll: async () => {
    const response = await instance.get(POSTS_API.GET_ALL());
    return response.data;
  },

  fetchById: async (postId: string) => {
    const response = await instance.get(POSTS_API.GET_BY_ID(postId));
    return response.data;
  },

  fetchByUser: async (userId: string) => {
    const response = await instance.get(POSTS_API.GET_BY_USER(userId));
    return response.data;
  },

  fetchComments: async (postId: string) => {
    const response = await instance.get(POSTS_API.GET_COMMENTS(postId));
    return response.data;
  },

  fetchUserLikes: async (userId: string) => {
    const response = await instance.get(POSTS_API.USER_LIKES(userId));
    return response.data;
  },

  likePost: async (likeData: { post_id: string; user_id?: string }) => {
    const response = await instance.post(POSTS_API.LIKE_POST(), likeData);
    return response.data;
  },

  unlikePost: async (postId: string, userId: string) => {
    const response = await instance.delete(POSTS_API.UNLIKE_POST(postId, userId));
    return response.data;
  },

  update: async (postId: string, postData: Partial<{ content: string; parent_id: string }>) => {
    const response = await instance.patch(POSTS_API.UPDATE(postId), postData);
    return response.data;
  },
};
