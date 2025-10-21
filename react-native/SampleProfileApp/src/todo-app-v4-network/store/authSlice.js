import { createSlice } from '@reduxjs/toolkit';
import { loadTokenAndGetUser, login, signup, logout } from './authThunks';

const initialState = {
  isLoading: true,
  user: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load token and get user
      .addCase(loadTokenAndGetUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadTokenAndGetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.user) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        } else {
          state.user = null;
          state.token = null;
        }
      })
      .addCase(loadTokenAndGetUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
