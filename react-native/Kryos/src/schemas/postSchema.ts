import { z } from 'zod';

// Define Zod schema for posts
export const postSchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1).max(280),
  user_id: z.string().uuid(),
  created_at: z.string(), // Accept any string format for datetime, since Supabase may return different formats
  parent_id: z.string().uuid().nullable().optional(),
  parent: z.any().nullable().optional(), // This could be expanded with a recursive reference if needed
  replies: z.array(z.any()).optional(), // This could be expanded with proper reply schema
  user: z.object({
    id: z.string().uuid(),
    username: z.string(),
    name: z.string(),
    image: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
  }).optional(),
});

export const createPostSchema = postSchema.omit({
  id: true,
  created_at: true,
  parent: true,
  replies: true,
  user: true,
}).extend({
  parent_id: z.string().uuid().nullable().optional(),
});

// TypeScript types from Zod schemas
export type Post = z.infer<typeof postSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;

// Validation functions
export const validatePost = (data: unknown): Post => {
  return postSchema.parse(data);
};

export const validateCreatePost = (data: unknown): CreatePostInput => {
  return createPostSchema.parse(data);
};