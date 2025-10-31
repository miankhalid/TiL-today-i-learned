import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@env';
import axios from 'axios';

const instance = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apiKey: SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
  },
});

// Here you can add interceptors for requests and responses
// For example, to add an auth token to every request:

/*
instance.interceptors.request.use(
  async config => {
    // const token = await someAsyncTokenStorage.get();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
*/

export default instance;