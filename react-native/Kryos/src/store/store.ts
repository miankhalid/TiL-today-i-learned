import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './slices/authSlice';
import { uiSlice } from './slices/uiSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [uiSlice.name]: uiSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
