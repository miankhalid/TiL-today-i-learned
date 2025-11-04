import { z } from 'zod';

const MAX_CONTENT_CHARS = 280;
// Define Zod schema for posts
export const postSchema = z.object({
  content: z.string().min(1).max(MAX_CONTENT_CHARS),
  created_at: z.string(), // Accept any string format for datetime, since Supabase may return different formats
  id: z.string().uuid(),
  parent: z.any().nullable().optional(), // This could be expanded with a recursive reference if needed
  parent_id: z.string().uuid().nullable().optional(),
  replies: z.array(z.any()).optional(), // This could be expanded with proper reply schema
  user: z
    .object({
      bio: z.string().nullable().optional(),
      id: z.string().uuid(),
      image: z.string().nullable().optional(),
      name: z.string(),
      username: z.string(),
    })
    .optional(),
  user_id: z.string().uuid(),
});

export const createPostSchema = postSchema
  .omit({
    created_at: true,
    id: true,
    parent: true,
    replies: true,
    user: true,
  })
  .extend({
    parent_id: z.string().uuid().nullable().optional(),
  });

// TypeScript types from Zod schemas
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type Post = z.infer<typeof postSchema>;

// Validation functions
export const validatePost = (data: unknown): Post => {
  return postSchema.parse(data);
};

export const validateCreatePost = (data: unknown): CreatePostInput => {
  return createPostSchema.parse(data);
};
