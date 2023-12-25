import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  brgyProfile: null,
  loading: false,
  error: false,
  isAuthenticated: false,
};

const brgyProfileSlice = createSlice({
  name: "brgyProfile",
  initialState,
  reducers: {
    setBrgyProfile: (state, action) => {
      state.loading = false;
      state.error = false;
      state.brgyProfile = action.payload;
      state.isAuthenticated = true;
    },
    errorBrgyProfile: (state) => {
      state.loading = false;
      state.error = true;
      state.isAuthenticated = false;
    },
  },
});

export const { setBrgyProfile, errorBrgyProfile } = brgyProfileSlice.actions;

export default brgyProfileSlice.reducer;
