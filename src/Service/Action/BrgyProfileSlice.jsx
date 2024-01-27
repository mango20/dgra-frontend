import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  brgyProfile: null,
  loading: false,
  error: false,
};

const brgyProfileSlice = createSlice({
  name: "brgyProfile",
  initialState,
  reducers: {
    setBrgyProfile: (state, action) => {
      state.loading = false;
      state.error = false;
      state.brgyProfile = action.payload;
    },
    errorBrgyProfile: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { setBrgyProfile, errorBrgyProfile } = brgyProfileSlice.actions;

export default brgyProfileSlice.reducer;
