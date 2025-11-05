// Posts API Endpoints
// This file contains all the API endpoint paths for posts-related operations

export const POSTS_API = {
  // Base path for posts
  BASE: '/posts',
  
  // Get all posts
  GET_ALL: () => '/posts?select=*,profiles!inner(*)&order=created_at.desc',
  
  // Get posts by user
  GET_BY_USER: (userId: string) => `/posts?select=*,profiles!inner(*)&user_id=eq.${userId}`,
  
  // Get single post by ID
  GET_BY_ID: (postId: string) => `/posts?select=*,profiles!inner(*)&id=eq.${postId}`,
  
  // Create a new post
  CREATE: () => '/posts',
  
  // Update a post
  UPDATE: (postId: string) => `/posts?id=eq.${postId}`,
  
  // Delete a post
  DELETE: (postId: string) => `/posts?id=eq.${postId}`,
  
  // Get comments for a post
  GET_COMMENTS: (postId: string) => `/comments?post_id=eq.${postId}&select=*,profiles!inner(*)`,
  
  // Add a comment to a post
  ADD_COMMENT: () => '/comments',
  
  // Like a post
  LIKE_POST: () => '/post_likes',
  
  // Unlike a post
  UNLIKE_POST: (postId: string, userId: string) => `/post_likes?post_id=eq.${postId}&user_id=eq.${userId}`,
  
  // Get user likes
  USER_LIKES: (userId: string) => `/post_likes?user_id=eq.${userId}`,
} as const;

// Type for the API endpoints
export type PostsAPIEndpoint = typeof POSTS_API;
