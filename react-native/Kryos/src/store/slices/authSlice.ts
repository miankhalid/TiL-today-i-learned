import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  error: null | string;
  isLoading: boolean;
}

const initialState: AuthState = {
  error: null,
  isLoading: false,
};

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setError(state, action: PayloadAction<null | string>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { clearError, setError, setLoading } = authSlice.actions;

export default authSlice.reducer;