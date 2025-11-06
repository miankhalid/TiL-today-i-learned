import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@env';
import axios, { type AxiosInstance } from 'axios';

import { supabase } from './supabase';

const HTTP_STATUS_UNAUTHORIZED = 401; // Unauthorized

const instance: AxiosInstance = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apiKey: SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
instance.interceptors.request.use(
  async (config) => {
    // Get the session from the Supabase client to ensure we have the latest token
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const accessToken = session?.access_token;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle auth token updates
instance.interceptors.response.use(
  (response) => {
    // Check if there are updated tokens in the response
    // and update them in storage if needed
    return response;
  },
  (error: unknown) => {
    // Handle specific error cases
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === HTTP_STATUS_UNAUTHORIZED) {
        // Unauthorized - possibly token expired
        console.warn('Unauthorized request - token may have expired');
      }
    }
    const errorToReturn = error instanceof Error ? error : new Error('An error occurred');
    return Promise.reject(errorToReturn);
  },
);

export default instance;
