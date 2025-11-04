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
    parent_id: postData.parentId || null,
    user_id: postData.userId,
  });

  try {
    const response = await instance.post(POSTS_API.CREATE(), validatedData, {
      headers: {
        Prefer: 'return=representation',
      },
    });

    const postDataResult = response.data[0]; // Supabase REST API returns an array

    // Validate the response directly from Supabase to match the schema
    return validatePost({
      content: postDataResult.content,
      created_at: postDataResult.created_at,
      id: postDataResult.id,
      parent: null, // Will be populated if needed
      parent_id: postDataResult.parent_id,
      replies: [], // Will be populated if needed
      user: postDataResult.profiles || undefined,
      user_id: postDataResult.user_id,
    });
  } catch (error: any) {
    console.error('Error creating post via REST API:', error);
    // Note: Importing z would create a circular dependency, so we'll just log the error
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * Fetches all posts with user information using Supabase REST API
 */
export const fetchPostsFromRestAPI = async (): Promise<Post[]> => {
  try {
    const response = await instance.get(POSTS_API.GET_ALL(), {
      params: {
        order: 'created_at.desc',
      },
    });

    // Validate each post before returning
    return response.data.map((post: any) =>
      validatePost({
        ...post,
        parent: post.parent || null,
        replies: post.replies || [],
        user: post.profiles,
      }),
    );
  } catch (error: any) {
    console.error('Error fetching posts via REST API:', error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * Fetches posts by a specific user using Supabase REST API
 */
export const fetchPostsByUserFromRestAPI = async (
  userId: string,
): Promise<Post[]> => {
  try {
    const response = await instance.get(POSTS_API.GET_BY_USER(userId), {
      params: {
        order: 'created_at.desc',
      },
    });

    // Validate each post before returning
    return response.data.map((post: any) =>
      validatePost({
        ...post,
        parent: post.parent || null,
        replies: post.replies || [],
        user: post.profiles,
      }),
    );
  } catch (error: any) {
    console.error('Error fetching posts by user via REST API:', error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * Fetches a single post by ID using Supabase REST API
 */
export const fetchPostByIdFromRestAPI = async (
  postId: string,
): Promise<null | Post> => {
  try {
    const response = await instance.get(POSTS_API.GET_BY_ID(postId));

    if (response.data.length === 0) {
      return null;
    }

    const post = response.data[0];
    // Validate the post before returning
    return validatePost({
      ...post,
      parent: post.parent || null,
      replies: post.replies || [],
      user: post.profiles,
    });
  } catch (error: any) {
    console.error('Error fetching post by ID via REST API:', error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * Deletes a post by ID using Supabase REST API
 */
export const deletePostFromRestAPI = async (postId: string): Promise<void> => {
  try {
    await instance.delete(POSTS_API.DELETE(postId));
  } catch (error: any) {
    console.error('Error deleting post via REST API:', error);
    throw new Error(error.response?.data?.message || error.message);
  }
};
