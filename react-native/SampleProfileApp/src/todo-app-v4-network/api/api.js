import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (username, password) => {
  return apiClient.post('/auth/login', {
    username,
    password,
  });
};

export const getUser = (token) => {
  return apiClient.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const signup = (userData) => {
  return apiClient.post('/users/add', userData);
};