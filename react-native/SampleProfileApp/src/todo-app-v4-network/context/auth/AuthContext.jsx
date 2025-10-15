import React, { createContext, useEffect, useReducer } from 'react';
import { loadTokenAndGetUser, login as loginUser, logout as logoutUser, signup as signupUser } from './authActions';

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

const initialState = {
  isLoading: true,
  user: null,
  token: null,
  error: null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    loadTokenAndGetUser(dispatch);
  }, []);

  const login = (username, password) => {
    return loginUser(dispatch, username, password);
  };

  const signup = (userData) => {
    return signupUser(dispatch, userData);
  };

  const logout = () => {
    logoutUser(dispatch);
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
