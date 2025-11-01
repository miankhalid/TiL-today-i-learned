// Authentication error message keys for i18n
export const authErrorKeys = {
  // Login errors
  EMAIL_REQUIRED: 'auth.email_required',
  INVALID_EMAIL_FORMAT: 'auth.invalid_email_format',
  PASSWORD_REQUIRED: 'auth.password_required',
  PASSWORD_TOO_SHORT: 'auth.password_too_short',

  // Signup errors
  CONFIRM_PASSWORD_REQUIRED: 'auth.confirm_password_required',
  PASSWORDS_DO_NOT_MATCH: 'auth.passwords_do_not_match',
  WEAK_PASSWORD: 'auth.weak_password',

  // Other auth related errors
  LOGIN_ERROR: 'auth.login_error',
  SIGNUP_ERROR: 'auth.signup_error',
} as const;

// Type for auth error keys
export type AuthErrorKey = keyof typeof authErrorKeys;