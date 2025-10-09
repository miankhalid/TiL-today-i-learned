import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, getUser, signup as apiSignup } from '../api/auth';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, isLoading: false, user: action.payload.user, token: action.payload.token };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, token: null };
    case 'SIGNUP_SUCCESS':
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    user: null,
    token: null,
    error: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          console.log('Found token, attempting to log in...');
          const response = await getUser(token);
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

    loadToken();
  }, []);

  const login = async (username, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      console.log('Attempting login for user:', username);
      const response = await apiLogin(username, password);
      const { accessToken } = response.data;

      if (!accessToken) {
        throw new Error('Access token not found in login response');
      }

      await AsyncStorage.setItem('token', accessToken);
      const userResponse = await getUser(accessToken);
      console.log('CODE: ', response.status, ' - Login successful for user:', userResponse.data.username);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: userResponse.data, token: accessToken } });
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
    }
  };

  const signup = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      console.log('Attempting signup for user:', userData.firstName);
      const response = await apiSignup(userData);
      console.log('CODE: ', response.status, ' - Signup successful. New user added:', response.data);
      dispatch({ type: 'SIGNUP_SUCCESS' });
      return response;
      // Here you might want to automatically log the user in, or prompt them to go to the login page.
      // For now, we just signify success.
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Signup failed' });
      return error.response;
    }
  };

  const logout = async () => {
    const username = state.user?.username;
    console.log(`Logging out user: ${username || ''}...`);
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    console.log('User logged out.');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
