import {apiClient} from './client'

export const login = (username, password) => {
  return apiClient.post('/auth/login', {
    username,
    password,
  });
};

export const getUser = (token) => {
  return apiClient.get('/auth/me');
};

export const signup = (userData) => {
  return apiClient.post('/users/add', userData);
};
