import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Profile } from '@/services/profileService';

type ProfileState = {
  error: null | string;
  loading: boolean;
  profile: null | Profile;
}

const initialState: ProfileState = {
  error: null,
  loading: false,
  profile: null,
};

export const profileSlice = createSlice({
  initialState,
  name: 'profile',
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
    setProfile: (state, action: PayloadAction<null | Profile>) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    setProfileError: (state, action: PayloadAction<null | string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  clearProfile,
  setProfile,
  setProfileError,
  setProfileLoading,
  updateProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
} = profileSlice.actions;

export default profileSlice.reducer;