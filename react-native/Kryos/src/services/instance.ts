import axios from 'axios';

// TODO: Replace with your API base URL from environment variables
const API_URL = 'http://localhost:3000/api';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
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