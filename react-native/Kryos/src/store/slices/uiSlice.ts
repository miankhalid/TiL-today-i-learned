
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

type UiState = {
  isSystemLoading: boolean;
}

const initialState: UiState = {
  isSystemLoading: true,
};

export const uiSlice = createSlice({
  initialState,
  name: 'ui',
  reducers: {
    setSystemLoading: (state, action: PayloadAction<boolean>) => {
      state.isSystemLoading = action.payload;
    },
  },
});

export const { setSystemLoading } = uiSlice.actions;
