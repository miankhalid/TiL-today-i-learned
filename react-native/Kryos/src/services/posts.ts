import type { CreatePostData, Post } from '../types/types';

import { validateCreatePost, validatePost } from '../schemas/postSchema';
import { POSTS_API } from './apiEndpoints';
import instance from './instance';

/**
 * Creates a new post using Supabase REST API via Axios
 */
export const createPostWithRestAPI = async (
  postData: CreatePostData,
): Promise<Post> => {
  // Validate input data
  const validatedData = validateCreatePost({
    content: postData.content,
    parent_id: postData.parentId ?? null,
    user_id: postData.userId,
  });

  try {
    const response = await instance.post<Record<string, unknown>[]>(POSTS_API.CREATE(), validatedData, {
      headers: {
        Prefer: 'return=representation',
      },
    });

    const postDataResult = response.data[0]; // Supabase REST API returns an array

    if (!postDataResult) {
      throw new Error('Failed to create post: No data returned');
    }

    // Validate the response directly from Supabase to match the schema
    return validatePost({
      content: typeof postDataResult.content === 'string' ? postDataResult.content : '',
      created_at: typeof postDataResult.created_at === 'string' ? postDataResult.created_at : new Date().toISOString(),
      id: typeof postDataResult.id === 'string' ? postDataResult.id : '',
      parent: null, // Will be populated if needed
      parent_id: typeof postDataResult.parent_id === 'string' ? postDataResult.parent_id : null,
      replies: [], // Will be populated if needed
      user: postDataResult.profiles as Post['user'] ?? undefined,
      user_id: typeof postDataResult.user_id === 'string' ? postDataResult.user_id : '',
    });
  } catch (error: unknown) {
    console.error('Error creating post via REST API:', error);
    // Note: Importing z would create a circular dependency, so we'll just log the error
    const errorMessage = 
      error instanceof Error && 'response' in error 
        ? (error.response as { data?: { message?: string } })?.data?.message 
        : error instanceof Error 
          ? error.message 
          : 'Failed to create post';
    throw new Error(errorMessage ?? 'Failed to create post');
  }
};

/**
 * Fetches all posts with user information using Supabase REST API
 */
export const fetchPostsFromRestAPI = async (): Promise<Post[]> => {
  try {
    const response = await instance.get<Record<string, unknown>[]>(POSTS_API.GET_ALL(), {
      params: {
        order: 'created_at.desc',
      },
    });

    // Validate each post before returning
    return response.data.map((post) => {
      const validatedPost = validatePost({
        content: typeof post.content === 'string' ? post.content : '',
        created_at: typeof post.created_at === 'string' ? post.created_at : new Date().toISOString(),
        id: typeof post.id === 'string' ? post.id : '',
        parent: post.parent ?? null,
        parent_id: typeof post.parent_id === 'string' ? post.parent_id : null,
        replies: Array.isArray(post.replies) ? post.replies : [],
        user: post.profiles,
        user_id: typeof post.user_id === 'string' ? post.user_id : '',
      });
      return validatedPost;
    });
  } catch (error: unknown) {
    console.error('Error fetching posts via REST API:', error);
    const errorMessage = 
      error instanceof Error && 'response' in error 
        ? (error.response as { data?: { message?: string } })?.data?.message 
        : error instanceof Error 
          ? error.message 
          : 'Failed to fetch posts';
    throw new Error(errorMessage ?? 'Failed to fetch posts');
  }
};

/**
 * Fetches posts by a specific user using Supabase REST API
 */
export const fetchPostsByUserFromRestAPI = async (
  userId: string,
): Promise<Post[]> => {
  try {
    const response = await instance.get<Record<string, unknown>[]>(POSTS_API.GET_BY_USER(userId), {
      params: {
        order: 'created_at.desc',
      },
    });

    // Validate each post before returning
    return response.data.map((post) => {
      const validatedPost = validatePost({
        content: typeof post.content === 'string' ? post.content : '',
        created_at: typeof post.created_at === 'string' ? post.created_at : new Date().toISOString(),
        id: typeof post.id === 'string' ? post.id : '',
        parent: post.parent ?? null,
        parent_id: typeof post.parent_id === 'string' ? post.parent_id : null,
        replies: Array.isArray(post.replies) ? post.replies : [],
        user: post.profiles,
        user_id: typeof post.user_id === 'string' ? post.user_id : '',
      });
      return validatedPost;
    });
  } catch (error: unknown) {
    console.error('Error fetching posts by user via REST API:', error);
    const errorMessage = 
      error instanceof Error && 'response' in error 
        ? (error.response as { data?: { message?: string } })?.data?.message 
        : error instanceof Error 
          ? error.message 
          : 'Failed to fetch posts by user';
    throw new Error(errorMessage ?? 'Failed to fetch posts by user');
  }
};

/**
 * Fetches a single post by ID using Supabase REST API
 */
export const fetchPostByIdFromRestAPI = async (
  postId: string,
): Promise<null | Post> => {
  try {
    const response = await instance.get<Record<string, unknown>[]>(POSTS_API.GET_BY_ID(postId));

    if (response.data.length === 0) {
      return null;
    }

    const post = response.data[0];
    // Validate the post before returning
    return validatePost({
      content: typeof post.content === 'string' ? post.content : '',
      created_at: typeof post.created_at === 'string' ? post.created_at : new Date().toISOString(),
      id: typeof post.id === 'string' ? post.id : '',
      parent: post.parent ?? null,
      parent_id: typeof post.parent_id === 'string' ? post.parent_id : null,
      replies: Array.isArray(post.replies) ? post.replies : [],
      user: post.profiles,
      user_id: typeof post.user_id === 'string' ? post.user_id : '',
    });
  } catch (error: unknown) {
    console.error('Error fetching post by ID via REST API:', error);
    const errorMessage = 
      error instanceof Error && 'response' in error 
        ? (error.response as { data?: { message?: string } })?.data?.message 
        : error instanceof Error 
          ? error.message 
          : 'Failed to fetch post by ID';
    throw new Error(errorMessage ?? 'Failed to fetch post by ID');
  }
};

/**
 * Deletes a post by ID using Supabase REST API
 */
export const deletePostFromRestAPI = async (postId: string): Promise<void> => {
  try {
    await instance.delete(POSTS_API.DELETE(postId));
  } catch (error: unknown) {
    console.error('Error deleting post via REST API:', error);
    const errorMessage = 
      error instanceof Error && 'response' in error 
        ? (error.response as { data?: { message?: string } })?.data?.message 
        : error instanceof Error 
          ? error.message 
          : 'Failed to delete post';
    throw new Error(errorMessage ?? 'Failed to delete post');
  }
};
