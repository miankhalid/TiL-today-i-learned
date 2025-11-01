import * as z from 'zod';

import { authErrorKeys } from '@/constants/authErrorMessages';

// Email validation regex for more specific email format checking
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const MIN_PASSWORD_LENGTH = 8;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: authErrorKeys.EMAIL_REQUIRED })
    .regex(emailRegex, { message: authErrorKeys.INVALID_EMAIL_FORMAT }),
  password: z
    .string()
    .min(1, { message: authErrorKeys.PASSWORD_REQUIRED })
    .min(MIN_PASSWORD_LENGTH, { message: authErrorKeys.PASSWORD_TOO_SHORT }),
});

export const signupSchema = z.object({
  confirmPassword: z
    .string()
    .min(1, { message: authErrorKeys.CONFIRM_PASSWORD_REQUIRED }),
  email: z
    .string()
    .min(1, { message: authErrorKeys.EMAIL_REQUIRED })
    .regex(emailRegex, { message: authErrorKeys.INVALID_EMAIL_FORMAT }),
  password: z
    .string()
    .min(1, { message: authErrorKeys.PASSWORD_REQUIRED })
    .min(MIN_PASSWORD_LENGTH, { message: authErrorKeys.PASSWORD_TOO_SHORT })
}).refine((data) => data.password === data.confirmPassword, {
  message: authErrorKeys.PASSWORDS_DO_NOT_MATCH,
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
