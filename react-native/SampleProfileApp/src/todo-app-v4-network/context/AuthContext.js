import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, getUser, signup as apiSignup } from '../api/api';

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
          const response = await getUser(token);
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user: response.data, token } });
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
      const response = await apiLogin(username, password);
      const { token } = response.data;
      await AsyncStorage.setItem('token', token);
      const userResponse = await getUser(token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: userResponse.data, token } });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
    }
  };

  const signup = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      await apiSignup(userData);
      dispatch({ type: 'SIGNUP_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Signup failed' });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
