import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, signup as apiSignup, getUser } from '../api/auth';

// Async thunk for loading token and getting user
export const loadTokenAndGetUser = createAsyncThunk(
  'auth/loadTokenAndGetUser',
  async (_, { dispatch }) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
        console.log('Found token, attempting to log in...');
        // The API client interceptor will add the token from storage
        const response = await getUser();
        return { user: response.data, token };
      } catch (error) {
        console.error('Failed to fetch user with stored token', error);
        await AsyncStorage.removeItem('token');
        throw error;
      }
    }
    return { user: null, token: null };
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      console.log('Attempting login for user:', username);
      const response = await apiLogin(username, password);
      const { accessToken } = response.data;

      if (!accessToken) {
        throw new Error('Access token not found in login response');
      }

      await AsyncStorage.setItem('token', accessToken);
      const userResponse = await getUser();
      console.log('CODE: ', response.status, ' - Login successful for user:', userResponse.data.username);
      return { user: userResponse.data, token: accessToken };
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      return rejectWithValue('Invalid credentials');
    }
  }
);

// Async thunk for signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Attempting signup for user:', userData.firstName);
      const response = await apiSignup(userData);
      console.log('CODE: ', response.status, ' - Signup successful. New user added:', response.data);
      return response.data;
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      return rejectWithValue('Signup failed');
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    console.log(`Logging out...`);
    await AsyncStorage.removeItem('token');
    console.log('User logged out.');
  }
);
