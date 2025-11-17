import * as z from 'zod';

import { authErrorKeys } from '@/constants/authErrorMessages';

const ATLEAST_ONE_CHAR_LENGTH = 1;
const MIN_PASSWORD_LENGTH = 8;

export const loginSchema = z.object({
  email: z
    .email({ message: authErrorKeys.INVALID_EMAIL_FORMAT })
    .min(ATLEAST_ONE_CHAR_LENGTH, { message: authErrorKeys.EMAIL_REQUIRED }),

  password: z
    .string()
    .min(ATLEAST_ONE_CHAR_LENGTH, { message: authErrorKeys.PASSWORD_REQUIRED })
    .min(MIN_PASSWORD_LENGTH, { message: authErrorKeys.PASSWORD_TOO_SHORT }),
});

export const signupSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(1, { message: authErrorKeys.CONFIRM_PASSWORD_REQUIRED }),
    email: z
      .email({ message: authErrorKeys.INVALID_EMAIL_FORMAT })
      .min(ATLEAST_ONE_CHAR_LENGTH, { message: authErrorKeys.EMAIL_REQUIRED }),
    password: z
      .string()
      .min(ATLEAST_ONE_CHAR_LENGTH, { message: authErrorKeys.PASSWORD_REQUIRED })
      .min(MIN_PASSWORD_LENGTH, { message: authErrorKeys.PASSWORD_TOO_SHORT }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: authErrorKeys.PASSWORDS_DO_NOT_MATCH,
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
