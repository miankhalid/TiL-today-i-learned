import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@env';
import axios, { type AxiosInstance } from 'axios';

import { supabase } from './supabase';

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
  (error) => {
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - possibly token expired
      console.log('Unauthorized request - token may have expired');
    }
    return Promise.reject(error);
  },
);

export default instance;
