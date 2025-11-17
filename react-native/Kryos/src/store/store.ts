import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './slices/authSlice';
import { profileSlice } from './slices/profileSlice';
import { uiSlice } from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [profileSlice.name]: profileSlice.reducer,
    [uiSlice.name]: uiSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
