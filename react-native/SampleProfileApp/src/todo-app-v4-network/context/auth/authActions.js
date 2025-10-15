import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, signup as apiSignup, getUser } from '../../api/auth';

export const loadTokenAndGetUser = async (dispatch) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    try {
      console.log('Found token, attempting to log in...');
      // The API client interceptor will add the token from storage
      const response = await getUser();
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: response.data, token } });
      console.log('Auto-login successful for user:', response.data.username);
    } catch (error) {
      console.error('Failed to fetch user with stored token', error);
      await AsyncStorage.removeItem('token');
      dispatch({ type: 'SET_IS_LOADING', payload: false });
    }
  } else {
    dispatch({ type: 'SET_IS_LOADING', payload: false });
  }
};

export const login = async (dispatch, username, password) => {
  dispatch({ type: 'LOGIN_START' });
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
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user: userResponse.data, token: accessToken } });
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
  }
};

export const signup = async (dispatch, userData) => {
  dispatch({ type: 'LOGIN_START' }); // Using LOGIN_START for loading state is okay here
  try {
    console.log('Attempting signup for user:', userData.firstName);
    const response = await apiSignup(userData);
    console.log('CODE: ', response.status, ' - Signup successful. New user added:', response.data);
    dispatch({ type: 'SIGNUP_SUCCESS' });
    return response;
  } catch (error) {
    console.error('Signup failed:', error.response ? error.response.data : error.message);
    dispatch({ type: 'LOGIN_FAILURE', payload: 'Signup failed' }); // Re-using for simplicity
    return error.response;
  }
};

export const logout = async (dispatch) => {
  console.log(`Logging out...`);
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
  console.log('User logged out.');
};
